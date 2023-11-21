// AddTaskForm.js
import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    // Perform validation if needed

    // Create a new task object
    const newTask = {
      title,
      deadlineDate: new Date(deadlineDate),
      description,
      status: 'pending', // Set the default status to 'pending'
      assignedTo: localStorage.getItem('userId'), // Assign the task to the logged-in user
    };

    // Pass the new task to the parent component for adding to the IndexedDB
    onAddTask(newTask);

    // Clear the form fields
    setTitle('');
    setDeadlineDate('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Deadline Date:</label>
        <input type="date" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
