import styles from './cart.module.css';
import { useSelector } from 'react-redux';

const CartBtn = () => {
  const { totalPrice } = useSelector((state) => state.cart);
  const totalCount = useSelector((state) =>
    state.cart.items.reduce((sum, obj) => {
      return obj.count + sum;
    }, 0),
  );
  return (
    <button className={styles.cart_btn}>
      <div className={styles.cart_btn__content}>
        <div className={styles.cart_btn__title}>Корзина</div>
        <span className={styles.cart_btn__line}></span>
        <div className={styles.cart_btn__count}>{totalPrice && `${totalPrice} 000`}</div>
        <span className={styles.cart_btn__line}></span>
        <div className={styles.cart_btn__count}>{totalCount}</div>
      </div>
    </button>
  );
};

export default CartBtn;
