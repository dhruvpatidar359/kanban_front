
"use client";

import React, { useState, useEffect } from 'react';

import Column from './column';
import TaskForm from './taskForm';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [guard,setGaurd] = useState(0);

  useEffect(() => {
    if(guard !== 1) {
      fetchTasks();
      setGaurd(1);
    }


   
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    console.log(id);
    
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setTasks(tasks.map(task => (task.id === id ? data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
      // console.error('Response text:', await response.text());
    }
  };
  

  const deleteTask = async (id) => {
    console.log(id);
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };



  return (
    
      <div className="kanban-board">
        <Column status="To Do" tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        <Column status="In Progress" tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        <Column status="Completed" tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        <TaskForm onAddTask={addTask} />
      </div>
  
  );
};

export default KanbanBoard;
