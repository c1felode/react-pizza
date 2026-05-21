import { useState, useEffect } from "react";

const API_URL = "https://69ef40f0112e1b968e2443fa.mockapi.io/items";

const CATEGORIES = { 1: "Meat", 2: "Margherita", 3: "Chicken", 4: "Special" };
const TYPES = { 0: "Traditional", 1: "Thin" };
const ALL_SIZES = [20, 25, 30, 35];

const EMPTY_FORM = {
  title: "",
  price: "",
  imageUrl: "",
  category: 1,
  rating: 5,
  types: [0, 1],
  sizes: [25, 30],
};

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16, padding: "2rem",
          width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Badge({ label, color }) {
  const colors = {
    meat: { bg: "#FEF3C7", text: "#92400E" },
    margherita: { bg: "#DCFCE7", text: "#166534" },
    chicken: { bg: "#DBEAFE", text: "#1E40AF" },
    special: { bg: "#F3E8FF", text: "#6B21A8" },
    default: { bg: "#F3F4F6", text: "#374151" },
  };
  const c = colors[color] || colors.default;
  return (
    <span style={{
      background: c.bg, color: c.text, fontSize: 11, fontWeight: 600,
      padding: "2px 8px", borderRadius: 20, letterSpacing: "0.03em", textTransform: "uppercase",
    }}>{label}</span>
  );
}

const categoryBadgeColor = (cat) => ({ 1: "meat", 2: "margherita", 3: "chicken", 4: "special" }[cat] || "default");

export default function PizzaAdmin() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => { fetchPizzas() }, []);

  async function fetchPizzas() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      setPizzas(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function openAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(pizza) {
    setEditTarget(pizza);
    setForm({
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      category: pizza.category,
      rating: pizza.rating,
      types: [...pizza.types],
      sizes: [...pizza.sizes],
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim() || !form.price) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
      };
      if (editTarget) {
        const res = await fetch(`${API_URL}/${editTarget.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setPizzas((p) => p.map((x) => (x.id === editTarget.id ? updated : x)));
        showToast("Pizza updated!");
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setPizzas((p) => [...p, created]);
        showToast("Pizza added!");
      }
      setModalOpen(false);
    } catch {
      showToast("Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(pizza) {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/${pizza.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPizzas((p) => p.filter((x) => x.id !== pizza.id));
      showToast("Pizza deleted.");
    } catch {
      showToast("Delete failed.", "error");
    } finally {
      setSaving(false);
      setDeleteModal(null);
    }
  }

  function toggleCheck(arr, setArr, val) {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  }

  const filtered = pizzas.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 0 || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const stars = (r) => "★".repeat(Math.min(Math.round(r / 2), 5)) + "☆".repeat(5 - Math.min(Math.round(r / 2), 5));

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#F8F7F4", color: "#1a1a1a" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 2000,
          background: toast.type === "error" ? "#FEE2E2" : "#D1FAE5",
          color: toast.type === "error" ? "#991B1B" : "#065F46",
          borderRadius: 10, padding: "12px 20px", fontWeight: 500, fontSize: 14,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🍕</span>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Pizza Admin</span>
          </div>
          <button onClick={openAdd} style={{
            background: "#FF5733", color: "#fff", border: "none", borderRadius: 10,
            padding: "8px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add pizza
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pizzas..."
            style={{
              border: "1px solid #E5E7EB", borderRadius: 10, padding: "8px 14px",
              fontSize: 14, outline: "none", width: 220, background: "#fff",
            }}
          />
          <div style={{ display: "flex", gap: 6 }}>
            {[{ id: 0, label: "All" }, ...Object.entries(CATEGORIES).map(([id, label]) => ({ id: Number(id), label }))].map((c) => (
              <button
                key={c.id}
                onClick={() => setFilterCat(c.id)}
                style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer",
                  border: filterCat === c.id ? "none" : "1px solid #E5E7EB",
                  background: filterCat === c.id ? "#FF5733" : "#fff",
                  color: filterCat === c.id ? "#fff" : "#374151",
                  transition: "all 0.15s",
                }}
              >{c.label}</button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", fontSize: 13, color: "#6B7280", alignSelf: "center" }}>
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
          {[
            { label: "Total pizzas", value: pizzas.length },
            { label: "Avg price", value: pizzas.length ? `$${(pizzas.reduce((s, p) => s + p.price, 0) / pizzas.length).toFixed(0)}` : "—" },
            { label: "Categories", value: Object.keys(CATEGORIES).length },
            { label: "Top rated", value: pizzas.length ? pizzas.reduce((a, b) => a.rating > b.rating ? a : b).title : "—" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px" }}>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#9CA3AF" }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#EF4444" }}>Error: {error}</div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                  {["Pizza", "Category", "Price", "Rating", "Sizes", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((pizza, i) => (
                  <tr key={pizza.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={pizza.imageUrl} alt={pizza.title} style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", background: "#F3F4F6" }} onError={(e) => { e.target.style.display = "none"; }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{pizza.title}</div>
                          <div style={{ fontSize: 12, color: "#9CA3AF" }}>ID: {pizza.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Badge label={CATEGORIES[pizza.category] || "Unknown"} color={categoryBadgeColor(pizza.category)} />
                    </td>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>${pizza.price}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontSize: 13, color: "#F59E0B", letterSpacing: 2 }}>{stars(pizza.rating)}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{pizza.rating}/10</div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {pizza.sizes.map((s) => (
                          <span key={s} style={{ fontSize: 11, background: "#F3F4F6", borderRadius: 6, padding: "2px 6px", color: "#374151" }}>{s}cm</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => openEdit(pizza)} style={{
                          padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
                          border: "1px solid #E5E7EB", background: "#fff", color: "#374151",
                        }}>Edit</button>
                        <button onClick={() => setDeleteModal(pizza)} style={{
                          padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
                          border: "1px solid #FEE2E2", background: "#FEF2F2", color: "#DC2626",
                        }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#9CA3AF" }}>No pizzas found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: 20, fontWeight: 700 }}>
          {editTarget ? "Edit pizza" : "Add new pizza"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={labelStyle}>
            Name
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} placeholder="e.g. Pepperoni Supreme" />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={labelStyle}>
              Price ($)
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} placeholder="49" />
            </label>
            <label style={labelStyle}>
              Rating (1–10)
              <input type="number" min={1} max={10} value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} style={inputStyle} />
            </label>
          </div>
          <label style={labelStyle}>
            Image URL
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} style={inputStyle} placeholder="https://..." />
          </label>
          <label style={labelStyle}>
            Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: Number(e.target.value) })} style={inputStyle}>
              {Object.entries(CATEGORIES).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Crust types</div>
            <div style={{ display: "flex", gap: 10 }}>
              {Object.entries(TYPES).map(([id, name]) => (
                <label key={id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.types.includes(Number(id))} onChange={() => toggleCheck(form.types, (v) => setForm({ ...form, types: v }), Number(id))} />
                  {name}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Available sizes (cm)</div>
            <div style={{ display: "flex", gap: 10 }}>
              {ALL_SIZES.map((s) => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.sizes.includes(s)} onChange={() => toggleCheck(form.sizes, (v) => setForm({ ...form, sizes: v }), s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: "1.5rem", justifyContent: "flex-end" }}>
          <button onClick={() => setModalOpen(false)} style={{ ...btnBase, border: "1px solid #E5E7EB", background: "#fff", color: "#374151" }}>Cancel</button>
          <button onClick={handleSave} disabled={saving || !form.title || !form.price} style={{ ...btnBase, background: "#FF5733", color: "#fff", border: "none", opacity: saving || !form.title || !form.price ? 0.6 : 1 }}>
            {saving ? "Saving…" : editTarget ? "Save changes" : "Add pizza"}
          </button>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)}>
        <h2 style={{ margin: "0 0 0.5rem", fontSize: 20, fontWeight: 700 }}>Delete pizza?</h2>
        <p style={{ color: "#6B7280", margin: "0 0 1.5rem" }}>
          Are you sure you want to delete <strong>{deleteModal?.title}</strong>? This can't be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={() => setDeleteModal(null)} style={{ ...btnBase, border: "1px solid #E5E7EB", background: "#fff", color: "#374151" }}>Cancel</button>
          <button onClick={() => handleDelete(deleteModal)} disabled={saving} style={{ ...btnBase, background: "#DC2626", color: "#fff", border: "none" }}>
            {saving ? "Deleting…" : "Yes, delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

const labelStyle = { display: "flex", flexDirection: "column", gap: 5, fontSize: 13, fontWeight: 500, color: "#374151" };
const inputStyle = { border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 12px", fontSize: 14, outline: "none", marginTop: 2 };
const btnBase = { padding: "9px 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" };
