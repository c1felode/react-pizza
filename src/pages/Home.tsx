import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton/index.tsx';
import { fetchPizzas } from '../redux/slices/pizzaSlice.ts';
import { TPizzaBlockProps } from '../types/types.ts';
import { IRootState } from '../types/redux.ts';

const Home = () => {
  const dispatch: any = useDispatch();

  const categoryId: number | null = useSelector((state: IRootState) => state.filter.categoryId);
  const { status: pizzaStatus, items: pizzaItems }: { status: string; items: TPizzaBlockProps[] } = useSelector((state: IRootState) => state.pizza);

  useEffect(() => {
    const getPizzas = () => {
      dispatch(fetchPizzas(categoryId));
    };
    getPizzas();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
