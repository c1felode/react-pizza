import { useSelector } from 'react-redux';
import { selectFilterCategory, setCategory } from '../../redux/slices/filterSlice.ts';

import styles from './categories.module.css';
import { useAppDispatch } from '../../redux/store.ts';

const Categories = () => {
  const categoryId: number = useSelector(selectFilterCategory);
  const dispatch = useAppDispatch();

  const categories: string[] = ['Все', 'Мясное', 'Вегетарианское', 'Грибное', 'Другое'];
  const onClickCategory = (id: number) => {
    dispatch(setCategory(id));
  };
  return (
    <ul className={styles.categories}>
      {categories.map((category: string, i: number) => (
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
