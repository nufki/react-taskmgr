import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Task Manager</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Task List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add-task">Add Task</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/add-task" element={<AddTask />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
