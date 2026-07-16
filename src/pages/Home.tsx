import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton/index.tsx';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice.ts';
import { TPizzaBlockProps } from '../types/types.ts';
import { useAppDispatch } from '../redux/store.ts';
import { selectFilterCategory } from '../redux/slices/filterSlice.ts';

const Home = () => {
  const dispatch = useAppDispatch();

  const categoryId: number = useSelector(selectFilterCategory);
  const { status: pizzaStatus, items: pizzaItems }: { status: string; items: TPizzaBlockProps[] } = useSelector(selectPizza);

  useEffect(() => {
    const getPizzas = () => {
      dispatch(fetchPizzas(Number(categoryId)));
    };
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId]);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className='pizzas'>
      <div className='filter-container'>
        <Categories />
      </div>

      <div className='pizzas-container'>
        {pizzaStatus === 'loading'
          ? skeletons
          : pizzaItems.map((item: TPizzaBlockProps) => <PizzaBlock key={item.id} {...item} />)}
        {pizzaStatus === 'error' && (
          <div className='pizzas-error-container'>
            <h2 className='pizzas-error'>Произошла ошибка при загрузке пицц 😔</h2>
            <p>Пожалуйста, попробуйте позже</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
