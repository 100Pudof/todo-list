import React from 'react';
import classNames from 'classnames';
import './List.scss';
import Badge from '../Badge/Badge';
import removeIcon from '../../assets/remove.svg';
import axios from 'axios';

export default function List({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) {
  const removeList = (item) => {
    if(window.confirm('Вы действительно ходите удалить ' + item.name + '?')) {
      axios.delete(' /lists/' + item.id).then(() => {
        onRemove(item.id);
      })
    }
  }
  
  return (
    <ul onClick={onClick} className="list">
      {
        items.map((item, index) => (
          <li onClick={onClickItem ? () => onClickItem(item) : null} key={index}
            className={classNames(item.className, {
               'active': item.active 
               ? item.active
               : activeItem && activeItem.id === item.id })}>
            <i>
              {item.icon ? item.icon : (
                <Badge color={item.color.name}/>
              )}
            </i>
            <span>{item.name}{item.tasks  && ` (${item.tasks.length})`}</span>
            {isRemovable && <img 
            onClick={() => removeList(item)}
            className="list__remove-icon" 
            src={removeIcon} 
            alt="remove icon" /> }
          </li>
        ))
      }
    </ul>
  )
}