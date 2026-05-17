import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div>
      <h2>Корзина пустая</h2>
      <Link to='/'>Вернуться на главную страницу</Link>
    </div>
  );
};

export default EmptyCart;
