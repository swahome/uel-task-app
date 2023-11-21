import React from 'react';

const Task = ({ task, onCheckboxChange, onDelete, userName })  => {
  const { title, deadlineDate, description, status } = task;
  const deadlineDateObj = new Date(deadlineDate);

  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Deadline: {deadlineDateObj.getDate()} {deadlineDateObj.getMonth()} {deadlineDateObj.getFullYear()} </p>
      <p>Status: {status}</p>
      <p>Assigned to: {userName}</p>

      <div className="task-actions">
        <label>
          Completed
          <input
            type="checkbox"
            checked={status === 'completed'}
            onChange={() => onCheckboxChange(task)}
          />
        </label>

        <button onClick={() => onDelete(task)}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
