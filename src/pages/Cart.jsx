import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';

import { clearCart } from '../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className='cart'>
      <div className='cart__titles'>
        <div className='cart__title'>Корзина</div>
        <button onClick={handleClearCart} className='cart__clear'>
          Очистить корзину
        </button>
      </div>
      <div className='cart__content'>
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <button className='cart__submit'>Заказать</button>
    </div>
  );
};

export default Cart;
