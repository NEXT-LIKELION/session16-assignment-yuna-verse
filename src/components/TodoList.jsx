"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";
import EditModal from "./EditModal";
import "./TodoList.css";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editedText, setEditedText] = useState("");

    const addTask = () => {
        if (newTask.trim() === "") return;

        const task = {
            id: Date.now(),
            text: newTask,
            completed: false,
        };

        setTasks([...tasks, task]);
        setNewTask("");
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setEditedText(task.text);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const saveEditedTask = () => {
        if (editingTask && editedText.trim() !== "") {
            setTasks(
                tasks.map((task) =>
                    task.id === editingTask.id
                        ? { ...task, text: editedText }
                        : task
                )
            );
            setIsEditModalOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    return (
        <div className="todo-container">
            <div className="todo-card">
                <div className="todo-header">
                    <h1>할 일 목록</h1>
                </div>
                <div className="todo-content">
                    <div className="todo-input-container">
                        <input
                            type="text"
                            className="todo-input"
                            placeholder="새로운 할 일 추가하기"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="add-button" onClick={addTask}>
                            추가
                        </button>
                    </div>

                    <div className="todo-list">
                        {tasks.length === 0 ? (
                            <p className="empty-message">
                                할 일이 없습니다. 새로운 할 일을 추가해보세요!
                            </p>
                        ) : (
                            tasks.map((task) => (
                                <TodoItem
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTask}
                                    onDelete={deleteTask}
                                    onEdit={openEditModal}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditModal
                    editedText={editedText}
                    setEditedText={setEditedText}
                    onSave={saveEditedTask}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
}

export default TodoList;
