import React from 'react';

const Task = ({ task }) => {
  return (
    <div>
      <span>{task.title}</span>
    </div>
  );
};

export default Task;
