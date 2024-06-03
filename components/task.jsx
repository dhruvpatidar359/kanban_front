import React from 'react';

const Task = ({ task, onUpdateTask, onDeleteTask }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{new Date(task.date).toLocaleString()}</p>
      <p>Status: {task.status}</p>
      <button  onClick={() => onUpdateTask(task.id, { ...task, status: 'In Progress' })}>Move to In Progress</button>
      <button onClick={() => onUpdateTask(task.id, { ...task, status: 'Completed' })}>Move to Completed</button>
      <button onClick={() => onUpdateTask(task.id, { ...task, status: 'To Do' })}>Move to To-Do</button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
