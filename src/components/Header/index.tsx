import { Link } from 'react-router-dom';

import CartBtn from '../CartBtn/index.tsx';

import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles?.headerContainer}>
      <Link to='/' className={styles?.headerTitle}>
        React Pizza
      </Link>
      <CartBtn />
    </header>
  );
}
