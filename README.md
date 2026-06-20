# 🍕 React Pizza

A simple and elegant pizzeria prototype built with React. Browse through a selection of delicious pizzas, filter by category, customize by size and type, and manage your cart with ease.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Code Explanations](#code-explanations)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🍕 Browse a curated list of pizzas
- 🏷️ Filter pizzas by category
- 📏 Choose pizza size and type
- 🛒 Add/remove items from your shopping cart
- 💾 Persistent cart using localStorage
- 🎨 Clean and modern UI
- 📱 Responsive design (in progress)
- 📊 Redux state management for cart operations

## 🛠️ Tech Stack

### Frontend
- **React** (v19.2.5) - UI library for building interactive components
- **TypeScript** (70.2%) - Type-safe JavaScript for better code reliability
- **CSS** (25%) - Custom styling with CSS modules
- **Vite** (v8.0.10) - Modern bundler for fast development

### State Management & Routing
- **Redux Toolkit** (v2.11.2) - Simplified Redux state management
- **React Redux** (v9.2.0) - React bindings for Redux
- **React Router** (v6.30.3) - Client-side routing for navigation

### Utilities & APIs
- **Axios** (v1.16.0) - HTTP client for API requests
- **Supabase** (v2.106.1) - Backend-as-a-Service for database operations
- **React Content Loader** (v7.1.2) - Skeleton loading components
- **Vercel Analytics** (v2.0.1) - Analytics tracking

### Development Tools
- **Vite** - Fast module bundler with HMR (Hot Module Replacement)
- **ESLint** (v10.2.1) - Code quality and linting
- **React Router DOM** (v6.30.3) - DOM-specific routing utilities

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/c1felode/react-pizza.git
cd react-pizza
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Variables** (if needed)
Create a `.env` file in the root directory for any API keys or configuration:
```env
VITE_API_URL=your_api_url_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

## 🚀 Running the Project

### Development Server
Start the development server with hot module replacement:
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:5173`

### Build for Production
Create an optimized production build:
```bash
npm run build
# or
yarn build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

### Linting
Check code quality with ESLint:
```bash
npm run lint
# or
yarn lint
```

## 📂 Project Structure

```
react-pizza/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── CartItem/        # Individual cart item component
│   │   ├── Header/          # Application header
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Main pizzeria page
│   │   ├── Cart.tsx         # Shopping cart page
│   │   └── EmptyCart.tsx    # Empty cart message
│   ├── redux/               # Redux store and slices
│   │   ├── slices/          # Redux action creators
│   │   │   └── cartSlice.ts # Cart state management
│   │   └── store.ts         # Redux store configuration
│   ├── types/               # TypeScript type definitions
│   │   ├── types.ts         # General types
│   │   └── redux.ts         # Redux state types
│   ├── App.tsx              # Root application component
│   ├── App.css              # Global styles
│   ├── index.css            # Root styles
│   └── main.tsx             # React DOM render entry point
├── index.html               # HTML template
├── package.json             # Project dependencies
├── vite.config.ts           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── tsconfig.json            # TypeScript configuration
```

## 💡 Code Explanations

### 1. **App.tsx** - Application Router
The main component sets up routing and conditional rendering for the cart:
```typescript
// Routes between Home and Cart pages
// Shows EmptyCart component when cart has no items
// Shows Cart component when items are in cart
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/cart' element={items.length > 0 ? <Cart /> : <EmptyCart />} />
</Routes>
```

### 2. **Redux Store** - State Management
Redux manages global state for:
- **Pizza Items**: List of available pizzas with loading states
- **Filters**: Category and sort preferences
- **Cart**: Items, total price, and item count

**Benefits**: Centralized state management, easy debugging, predictable state updates

### 3. **cartSlice.ts** - Cart Logic
Handles all cart operations:
- **addItem**: Adds pizza to cart or increments count if already present
- **minusItem**: Decreases pizza quantity (won't go below 1)
- **removeItem**: Removes pizza completely from cart
- **clearCart**: Empties entire cart
- **localStorage Integration**: Persists cart data across browser sessions

```typescript
const updateCartStorage = (state: ICartState) => {
    state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
    state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0);
    localStorage.setItem('cart', JSON.stringify(state.items));
};
```

### 4. **CartItem Component**
Individual item in cart with controls:
- Displays pizza image, title, size, and type
- Plus/minus buttons to adjust quantity
- Delete button to remove item
- Dispatches Redux actions for state updates

### 5. **React Router Integration**
Uses React Router v6 for:
- Page navigation without page reloads
- URL-based state management
- Link components for navigation

### 6. **TypeScript Types**
Type safety throughout the app:
- `TCartItem`: Defines pizza cart item structure
- `IPizzaState`: Redux pizza state interface
- `ICartState`: Redux cart state interface
- `IRootState`: Complete Redux state shape

## 🔄 State Flow Diagram

```
User Action (Click Add/Remove)
    ↓
Component dispatches Redux Action
    ↓
Reducer updates state
    ↓
Component receives updated state via useSelector
    ↓
Component re-renders with new data
    ↓
localStorage is synced automatically
```

## 🚧 Future Improvements

- [ ] Responsive mobile design
- [ ] Advanced styling and animations
- [ ] More features and enhancements
- [ ] Payment integration
- [ ] Order tracking
- [ ] User authentication
- [ ] Admin dashboard

## 📝 License

ISC

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📞 Support

For issues and questions, please open an issue on [GitHub Issues](https://github.com/c1felode/react-pizza/issues)

---

**Happy coding! 🚀 Enjoy building your pizzeria!**
