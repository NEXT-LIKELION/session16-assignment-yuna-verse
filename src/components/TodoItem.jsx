"use client";

import "./TodoItem.css";

function TodoItem({ task, onToggle, onDelete, onEdit }) {
    return (
        <div className="todo-item">
            <div className="todo-item-left">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    id={`task-${task.id}`}
                />
                <label
                    htmlFor={`task-${task.id}`}
                    className={task.completed ? "completed" : ""}
                    onClick={() => onEdit(task)}
                >
                    {task.text}
                </label>
            </div>
            <div className="todo-item-right">
                <button className="edit-button" onClick={() => onEdit(task)}>
                    ✏️
                </button>
                <button
                    className="delete-button"
                    onClick={() => onDelete(task.id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
