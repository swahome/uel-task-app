// CompletedTasksPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task'; // Import your Task component
import { getAllTasks } from './db';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import the styles

const CompletedTasksPage = () => {

    const navigate = useNavigate();

    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        // Fetch completed tasks from the 'tasks' object store
        const fetchCompletedTasks = async () => {

            const completedTasks = await getAllTasks();

            // Filter tasks to get only completed tasks
            const completedTasksFiltered = completedTasks.filter((task) => task.status === 'completed');

            setCompletedTasks(completedTasksFiltered);
        };

        fetchCompletedTasks();
    }, []); // Run this effect only once when the component mounts

    //add username
    //check login
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    if (!userId) {
        // Redirect to the login page or any other desired page
        // You can use React Router or any other method for redirection
        navigate('/login');
    }

    return (
        <div className='container'>
            <div className="logo-container ">
                <img alt="logo" src="/tasks.png" width="120px" className='logo' />
            </div>
            <div className="welcome">
                <h2>Welcome {userName}</h2>
            </div>
            <h2>Completed Tasks</h2>
            <div className="center">
                <Link to="/dashboard">Go to Dashboard</Link>
            </div>
            {/* Render your completed Task components here */}
            {completedTasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};

export default CompletedTasksPage;
