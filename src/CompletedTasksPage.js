// CompletedTasksPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task'; // Import your Task component
import { getAllTasks } from './db';

const CompletedTasksPage = () => {
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
    const userName = localStorage.getItem('userName');

  return (
    <div className='container'>
        <div className="logo-container ">
            <img alt="logo" src="/tasks.png" width="120px" className='logo' />
        </div>
        <div className="welcome">
            <h2>Welcome {userName}</h2>
        </div>
      <h2>Completed Tasks</h2>
      <Link to="/dashboard">Go to Dashboard</Link>

      {/* Render your completed Task components here */}
      {completedTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default CompletedTasksPage;
