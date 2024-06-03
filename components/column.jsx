import React from 'react';
import Task from './task';

const Column = ({ status, tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <div className={`column ${status.toLowerCase()}`}>
      <h2>{status}</h2>
      {tasks.filter(task => task.status === status).map(task => (
        <Task key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  );
};

export default Column;
