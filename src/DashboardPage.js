import React, { useEffect, useState } from 'react';
import Logout from './Logout'; // Adjust the import path based on your project structure
import Task from './Task';
import { getAllTasks, updateTask, deleteTask, addTask } from './db';
import AddTaskForm from './AddTaskForm';
import { useNavigate } from 'react-router-dom';




const DashboardPage = () => {
    //{ tasks, onCheckboxChange, onDelete }
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        // Fetch tasks from the 'tasks' object store
        const fetchTasks = async () => {
            const tasks = await getAllTasks();
            setTasks(tasks);
        };

        fetchTasks();
    }, []); // Run this effect only once when the component mounts

    const onCheckboxChange = async (task) => {
        // Update the task in the 'tasks' object store
        await updateTask({ ...task, status: task.status === 'completed' ? 'active' : 'completed' });

        // Fetch tasks from the 'tasks' object store
        const tasks = await getAllTasks();

        setTasks(tasks);
    };

    const onDelete = async (task) => {
        // Delete the task from the 'tasks' object store
        await deleteTask(task.id);

        // Fetch tasks from the 'tasks' object store
        const tasks = await getAllTasks();

        setTasks(tasks);
    }

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
                <h2>Welcome {userName} <Logout /></h2>
            </div>
            <h2>Dashboard</h2>
            {/* link to completed tasks */}
            <div className='center'>
                <a href="/completed-tasks">Go to Completed Tasks</a>
            </div>
            {/* AddTaskForm */}

            <AddTaskForm onAddTask={async (task) => {
                // Add the task to the 'tasks' object store
                await addTask(task);

                // Fetch tasks from the 'tasks' object store
                const tasks = await getAllTasks();

                setTasks(tasks);
            }} />

            <h2>Tasks</h2>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onCheckboxChange={onCheckboxChange} onDelete={onDelete} userName={userName} />
            ))}
            {/* Other dashboard content goes here */}

        </div>
    );
};

export default DashboardPage;
