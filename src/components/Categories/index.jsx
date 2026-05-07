import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../../redux/slices/filterSlice.js';

import styles from './categories.module.css';

const Categories = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  console.log('redux state ', categoryId);

  const categories = ['Все', 'Мясное', 'Вегетарианское', 'Грибное', 'Другое'];
  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };
  return (
    <ul className={styles.categories}>
      {categories.map((category, i) => (
        <li
          onClick={() => onClickCategory(i)}
          key={i}
          className={`${styles.categoriesItem} ${categoryId === i ? styles.active : ''}`}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
