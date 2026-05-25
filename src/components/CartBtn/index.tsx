import { Link } from 'react-router-dom';
import styles from './cart.module.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../../types/redux';
import { selectorCart } from '../../redux/slices/cartSlice';

const CartBtn = () => {
  const { totalPrice }: { totalPrice: number } = useSelector(selectorCart);
  const totalCount = useSelector((state: IRootState) =>
    state.cart.items.reduce((sum: number, obj: any) => {
      return obj.count + sum;
    }, 0),
  );
  return (
    <Link to='/cart'>
      <button className={styles.cart_btn}>
        <div className={styles.cart_btn__content}>
          <div className={styles.cart_btn__title}>Корзина</div>
          <span className={styles.cart_btn__line}></span>
          <div className={styles.cart_btn__count}>{totalPrice && `${totalPrice} 000`}</div>
          <span className={styles.cart_btn__line}></span>
          <div className={styles.cart_btn__count}>{totalCount}</div>
        </div>
      </button>
    </Link>
  );
};

export default CartBtn;
