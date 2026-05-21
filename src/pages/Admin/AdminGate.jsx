// src/pages/Admin/AdminGate.jsx
import { useState } from "react";
import PizzaAdmin from "./PizzaAdmin.jsx";

const SECRET = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminGate() {
  const [input, setInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);

  function handleLogin() {
    if (input === SECRET) {
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  if (authed) return <PizzaAdmin />;

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "#F8F7F4",
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "2.5rem",
        width: 320, boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🔒 Admin</h2>
        <p style={{ margin: 0, color: "#6B7280", fontSize: 14 }}>
          Введи пароль для доступа
        </p>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Пароль"
          style={{
            border: error ? "1px solid #EF4444" : "1px solid #E5E7EB",
            borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none",
          }}
        />
        {error && (
          <p style={{ margin: 0, color: "#EF4444", fontSize: 13 }}>
            Неверный пароль
          </p>
        )}
        <button
          onClick={handleLogin}
          style={{
            background: "#FF5733", color: "#fff", border: "none",
            borderRadius: 10, padding: "10px", fontWeight: 600,
            fontSize: 14, cursor: "pointer",
          }}
        >
          Войти
        </button>
      </div>
    </div>
  );
}