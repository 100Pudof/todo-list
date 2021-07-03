import React from 'react';
import axios from 'axios';

export default function AddTasks({ list, onAddTask }) {
    const [toggleVisible, setToggleVisible] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const toggleFormVisible = () => {
        setToggleVisible(!toggleVisible);
        setInputValue('')
    }
    const addTask = () => {
        if(!inputValue) {
            alert('введите название таск');
            return;
        }
  
        setIsLoading(true);
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        axios
            .post('http://localhost:8000/tasks', obj )
            .then(({ data }) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch(() => {
                alert('задача не добавилась')
            })
            .finally(() => {
                setIsLoading(false);
            });
    } 
    return (
        <div className="tasks__form">
            {!toggleVisible
                ? <div onClick={toggleFormVisible} className="tasks__form-new">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span> Новая задача</span>
                </div>
                :
                <div className="tasks__form-block">
                    <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className="field"
                        type="text"
                        placeholder="Текст Задачи"
                        autoFocus
                    />
                    <button onClick={addTask} disabled={isLoading} className='button'>{isLoading ? 'Добавление...' : 'Добавить задачу'}</button>
                    <button onClick={toggleFormVisible} className='button button--grey'>Отмена</button>
                </div>
            }


        </div>
    )
}
