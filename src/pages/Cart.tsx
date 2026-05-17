import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem/index.tsx';

import { clearCart } from '../redux/slices/cartSlice.ts';
import { IRootState } from '../types/redux.ts';
import { TCartItem } from '../types/types.ts';

const Cart = () => {
  const dispatch = useDispatch();
  const items: TCartItem[] = useSelector((state: IRootState) => state.cart.items);
  const handleClearCart = (): void => {
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
        {items?.map((item: TCartItem) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <button className='cart__submit'>Заказать</button>
    </div>
  );
};

export default Cart;
