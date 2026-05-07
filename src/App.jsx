import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/index.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import EmptyCart from './pages/EmptyCart.jsx';
import { useSelector } from 'react-redux';

function App() {
  const items = useSelector((state) => state.cart.items);
  return (
    <>
      <div className='container'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            {items.length > 0 ? (
              <Route path='/cart' element={<Cart />} />
            ) : (
              <Route path='/cart' element={<EmptyCart />} />
            )}
            <Route path='/not-found' element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
