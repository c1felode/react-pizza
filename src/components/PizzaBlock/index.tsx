import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice.ts';
import { TPizzaBlockProps, TCartItem } from '../../types/types.ts';
import { IRootState } from '../../types/redux.ts';
const typeNames = ['Тонкое', 'Традиционное'];


const PizzaBlock = ({ id, imageUrl, title, sizes, price, types }: TPizzaBlockProps) => {
  const cartItem: TCartItem | undefined = useSelector((state: IRootState) => state.cart.items.find((obj: TCartItem) => obj.id === id));

  const addedCount = cartItem ? cartItem.count : 0;
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  const handleAddItem = () => {
    const item: TCartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 1
    };
    dispatch(addItem(item));
  };

  return (
    <div key={id} className='pizza-block'>
      <div className='pizza-block__img-box'>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
      </div>
      <h4 className='pizza-block__title'>{title}</h4>
      <div className='pizza-block__select'>
        <ul className='pizza-block__select-list pizza-type'>
          {types?.map((type: number, i: number) => {
            return (
              <li
                onClick={() => setActiveType(i)}
                key={i}
                className={`pizza-block__select-item ${activeType === i ? 'active' : ''}`}
              >
                {typeNames[type]}
              </li>
            );
          })}
        </ul>
        <ul className='pizza-block__select-list pizza-size'>
          {sizes?.map((size: number, i: number) => {
            return (
              <li
                onClick={() => setActiveSize(i)}
                key={i}
                className={`pizza-block__select-item  ${activeSize === i ? 'active' : ''}`}
              >
                {size} см
              </li>
            );
          })}
        </ul>
      </div>
      <div className='pizza-block__footer'>
        <div className='pizza-block__price'>{price} 000 сум</div>
        <button
          onClick={handleAddItem}
          className='button button--outline button--add pizza-block__button'
        >
          <span>Добавить</span>
          <span className='pizza-block__button-line'></span>
          <span>{addedCount}</span>
        </button>
      </div>
    </div>
  );
};
export default PizzaBlock;
