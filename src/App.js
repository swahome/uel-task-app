import React, { useState, useEffect } from 'react';
import Task from './Task';
import { addTask, getAllTasks } from './db';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const allTasks = await getAllTasks();
    setTasks(allTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      const task = { title: newTask };
      await addTask(task);
      setNewTask('');
      fetchTasks();
    }
  };

  return (
    <div>
      <h1>Task App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default App;
