"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

export default function TodoList() {
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

    const handleEditKeyDown = (e) => {
        if (e.key === "Enter") {
            saveEditedTask();
        }
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        할 일 목록
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                        <Input
                            placeholder="새로운 할 일 추가하기"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button onClick={addTask}>
                            <Plus className="h-4 w-4 mr-1" />
                            추가
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {tasks.length === 0 ? (
                            <p className="text-center text-muted-foreground py-4">
                                할 일이 없습니다. 새로운 할 일을 추가해보세요!
                            </p>
                        ) : (
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={task.completed}
                                            onCheckedChange={() =>
                                                toggleTask(task.id)
                                            }
                                            id={`task-${task.id}`}
                                        />
                                        <label
                                            htmlFor={`task-${task.id}`}
                                            className={`${
                                                task.completed
                                                    ? "line-through text-muted-foreground"
                                                    : ""
                                            } cursor-pointer`}
                                            onClick={() => openEditModal(task)}
                                        >
                                            {task.text}
                                        </label>
                                    </div>
                                    <div className="flex space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEditModal(task)}
                                            aria-label="할 일 편집"
                                        >
                                            <Pencil className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteTask(task.id)}
                                            aria-label="할 일 삭제"
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>할 일 편집하기</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                            autoFocus
                        />
                    </div>
                    <DialogFooter className="flex justify-between sm:justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                취소
                            </Button>
                        </DialogClose>
                        <Button type="button" onClick={saveEditedTask}>
                            저장
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
