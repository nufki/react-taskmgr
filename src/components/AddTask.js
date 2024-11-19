import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTask() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Post the new task to the API
        axios.post('http://localhost:5001/tasks', { name, description })
            .then(() => {
                alert("Task added successfully!");
                navigate('/');
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">Name:</label>
                    <input
                        id="taskName"
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">Description:</label>
                    <textarea
                        id="taskDescription"
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;
