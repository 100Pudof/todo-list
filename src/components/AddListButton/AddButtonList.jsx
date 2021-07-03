import React from 'react'
import List from '../List/List';
import './AddListButton.scss';
import Badge from '../Badge/Badge';
import closeSvg from '../../assets/close.svg';
import axios from 'axios';

export default function AddButtonList({ colors, onAdd }) {
  const [isClick, setIsClick] = React.useState(false);
  const [selectColor, setSelectColor] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [loadingAdd, setLoadingAdd] = React.useState(true);

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors[0].id)
    }
  }, [colors]);
  const onClose = () => {
    setIsClick(false);
    setInputValue('');
    setSelectColor(colors[0].id);
  }
  const addList = () => {
    if (!inputValue) {
      alert('Пустое поле');
      return
    }
    setLoadingAdd(false);
    axios.post(' /lists', { name: inputValue, colorId: selectColor })
      .then(({ data }) => {
        const color = colors.filter(c => c.id === selectColor)[0];
        const listObj = { ...data, color };
        onAdd(listObj);
        onClose();
      }).finally(() => {
        setLoadingAdd(true);
      })

  }

  return (
    <React.Fragment>
      <List
        onClick={() => setIsClick(true)}
        items={[
          {
            name: 'Добавить Список',
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>)
          }
        ]}
        isRemovable
      />
      {isClick &&
        <div className="list__add-popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="close SVG"
            className="list__add-close-btn"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
            autoFocus
          />
          <div className="list__add-popup-colors">

            {
              colors.map((item, index) => (
                <Badge
                  className={selectColor === item.id && 'active'}
                  onClick={() => setSelectColor(item.id)}
                  key={index}
                  color={item.name} />
              ))
            }

          </div>
          <button disabled={!loadingAdd} onClick={addList} className='button'>
            Добавить
          </button>
        </div>}
    </React.Fragment>
  )
}
