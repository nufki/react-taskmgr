import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        setLoading(true);
        axios.get(`${config.apiUrl}/tasks`)
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            });
    };

    const deleteTask = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            axios.delete(`${config.apiUrl}/tasks/${taskId}`)
                .then(() => {
                    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
                })
                .catch((error) => {
                    console.error("Error deleting task:", error);
                });
        }
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setTaskName(task.name);
        setTaskDescription(task.description);
        setIsEditing(true);
    };

    const handleSave = () => {
        const updatedTask = {
            ...selectedTask,
            name: taskName,
            description: taskDescription,
        };

        axios.put(`${config.apiUrl}/tasks/${updatedTask.id}`, updatedTask)
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === updatedTask.id ? updatedTask : task
                    )
                );
                setIsEditing(false);
                setSelectedTask(null);
                setTaskName('');
                setTaskDescription('');
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Task List</h2>
            {tasks.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(task)}>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteTask(task.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info text-center">No tasks available. Add some tasks to get started!</div>
            )}

            {isEditing && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Task</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsEditing(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="taskName" className="form-label">Task Name</label>
                                    <input
                                        type="text"
                                        id="taskName"
                                        className="form-control"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="taskDescription" className="form-label">Task Description</label>
                                    <textarea
                                        id="taskDescription"
                                        className="form-control"
                                        rows="3"
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsEditing(false)}>
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSave}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskList;
