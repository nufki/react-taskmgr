import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Task Manager</h1>
            <nav>
                <Link to="/tasks">View Tasks</Link> | <Link to="/add-task">Add Task</Link>
            </nav>
        </div>
    );
}

export default Home;
