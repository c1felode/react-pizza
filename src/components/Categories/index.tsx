import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../../redux/slices/filterSlice.ts';

import styles from './categories.module.css';
import { IRootState } from '../../types/redux.ts';

const Categories = () => {
  const categoryId: number = useSelector((state: IRootState) => state.filter.categoryId);
  const dispatch = useDispatch();

  const categories: string[] = ['Все', 'Мясное', 'Вегетарианское', 'Грибное', 'Другое'];
  const onClickCategory = (id: number): void => {
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
