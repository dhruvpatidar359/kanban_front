import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      alert('Please fill in all fields');
      return;
    }
    const task = {
      id: uuidv4(), 
      title,
      description,
      date,
      status,
    };
    onAddTask(task);
    setTitle('');
    setDescription('');
    setDate('');
    setStatus('To Do');
  };

  return (
    <form className='m-5'  onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
