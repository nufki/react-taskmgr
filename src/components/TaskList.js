import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../config";


function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch tasks from the API
        axios.get(`${config.apiUrl}/tasks`)
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            });
    }, []);

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
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info text-center">No tasks available. Add some tasks to get started!</div>
            )}
        </div>
    );
}

export default TaskList;
