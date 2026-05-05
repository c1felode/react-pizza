import CartBtn from '../CartBtn/index.jsx';

import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <h1>React Pizza</h1>
      <CartBtn />
    </header>
  );
}
