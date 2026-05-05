import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/index.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <>
      <div className='container'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<h1>Cart</h1>} />
            <Route path='/not-found' element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
