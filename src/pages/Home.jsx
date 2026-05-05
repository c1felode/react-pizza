import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    axios
      .get(
        `https://69ef40f0112e1b968e2443fa.mockapi.io/items?category=${!categoryId ? '' : categoryId}`,
      )
      .then((res) => {
        setIsLoading(false);
        setItems(res.data);
      });
  }, [categoryId]);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className='pizzas'>
      <div className='filter-container'>
        <Categories />
      </div>

      <div className='pizzas-container'>
        {isLoading ? skeletons : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
