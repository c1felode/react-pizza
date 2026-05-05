import styles from './cart.module.css';
import { useSelector } from 'react-redux';

const CartBtn = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  return (
    <button className={styles.cart_btn}>
      <div className={styles.cart_btn__content}>
        <div className={styles.cart_btn__title}>Корзина</div>
        <span className={styles.cart_btn__line}></span>
        <div className={styles.cart_btn__count}>{totalPrice && `${totalPrice} 000`}</div>
        <span className={styles.cart_btn__line}></span>
        <div className={styles.cart_btn__count}>{items.length}</div>
      </div>
    </button>
  );
};

export default CartBtn;
