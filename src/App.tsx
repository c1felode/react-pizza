import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/index.tsx';
import Home from './pages/Home.tsx';
import Cart from './pages/Cart.tsx';

function App() {
  return (
    <>
      <div className='container'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/not-found' element={<h1>Not Found</h1>} />

          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
