import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const typeNames = ['Тонкое', 'Традиционное'];

const PizzaBlock = ({ id, imageUrl, title, sizes, price, types }) => {
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id == id));

  const addedCount = cartItem ? cartItem.count : 0;
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const handleAddItem = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
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
          {types.map((type, i) => {
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
          {sizes.map((size, i) => {
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
