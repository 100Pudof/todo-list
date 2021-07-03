import React from 'react'
import './Task.scss'

import pens from '../../assets/edit.svg';
import close from '../../assets/close.svg';

export default function Task({ task, onEdit, list, onRemove, onCompleteTask }) {
    
const onChangeCheckbox = (e) => {
    onCompleteTask(list.id, task.id, e.target.checked);
}

    return (
        <div key={task.id} className="task__items-row">
            <div  className="checkbox">
                <input onChange={onChangeCheckbox} id={`task-${task.id}`} checked={task.completed} type="checkbox" />
                <label htmlFor={`task-${task.id}`}><svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                        stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg></label>
                <p>{task.text}</p>
                <div className="icon">
                    <div onClick={() => onEdit(list.id, { text: task.text, id: task.id})} className="pens">
                        <img src={pens} alt="pensil" />
                    </div>
                    <div onClick={() =>  onRemove(list.id, task.id)} className="close">
                        <img src={close} alt="close" />
                    </div>
                </div>
            </div>
        </div>
    )
}
