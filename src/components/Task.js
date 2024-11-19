import React from 'react';
import { Link } from 'react-router-dom';

function Task({ task, index }) {
    return (
        <div>
            <h4>{task.name}</h4>
            <p>{task.description}</p>
            <Link to={`/tasks/${index}`}>View Details</Link>
        </div>
    );
}

export default Task;
