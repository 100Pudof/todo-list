import React from 'react';
import axios from 'axios';

import './Tasks.scss';
import AddTasks from './AddTasks/AddTasks';
import Task from './Task';
import { Link } from 'react-router-dom';

import editSvg from '../../assets/edit.svg';



export default function Tasks({ list, onEditTitle, onCompleteTask, onAddTask, withoutEmpty, onEdit, onRemoveTask }) {
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios
                .patch(' /lists/' + list.id, {
                    name: newTitle
                })
                .catch(() => {
                    alert('Не удалось обновить название списка')
                });
        }
    };

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className="tasks__title">
                    {list.name}
                    <img onClick={editTitle} src={editSvg} alt="edit Svg" />
                </h2>
            </Link>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Task onCompleteTask={onCompleteTask} key={task.id} list={list} task={task} onRemove={onRemoveTask} onEdit={onEdit} />
                ))}

            </div>
            <AddTasks key={list.id} list={list} onAddTask={onAddTask} />



        </div>
    )
}
