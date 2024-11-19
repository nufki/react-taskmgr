import React from 'react';
import { useParams } from 'react-router-dom';

function TaskDetails({ tasks }) {
    const { id } = useParams();
    const task = tasks[id];

    if (!task) {
        return <p>Task not found!</p>;
    }

    return (
        <div>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
        </div>
    );
}

export default TaskDetails;

