// src/components/TaskList.js
'use client';
import { useEffect, useState } from 'react';
import styles from './taskList.module.scss';
import AddTaskButton from '../addTaskButton'

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Recuperar tarefas do localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    if (storedTasks.length === 0) {
      // Adiciona 3 tarefas de exemplo
      const initialTasks = [
        { text: 'Lavar as mãos', completed: false },
        { text: 'Fazer um bolo', completed: true }, 
        { text: 'Lavar a louça', completed: false }
      ];
      setTasks(initialTasks);
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    } else {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task.text !== taskToDelete.text));
  };

  const toggleTaskCompletion = (taskToToggle) => {
    setTasks(tasks.map(task => 
      task.text === taskToToggle.text ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, { text: newTask, completed: false }];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <div className={styles.taskList}>
        <h2 className={styles.taskListTitle}>Suas tarefas de hoje</h2>
        <ul className={styles.taskListItems}>
          {tasks.filter(task => !task.completed).map((task, index) => (
            <li key={index} className={task.completed ? styles.completed : styles.incomplete}>
              <div className={styles.teskContent}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task)}
                    className='checkbox'
                    />
                  <span>{task.text}</span>
              </div>
              <button onClick={() => handleDeleteTask(task)} className='trash'>
                <img src={'/trash.svg'} className={styles.icon} />
              </button>
            </li>
          ))}
        </ul>
        <h2 className={styles.taskListTitle}>Tarefas concluídas</h2>
        <ul className={styles.taskListItems}>
          {tasks.filter(task => task.completed).map((task, index) => (
            <li key={index} className={styles.completed}>
               <div className={styles.teskContent}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task)}
                    className='checkbox'
                    />
                  <span>{task.text}</span>
              </div>
              <button onClick={() => handleDeleteTask(task)}>
                <img src='/trash.svg' className={styles.icon} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AddTaskButton onAddTask={handleAddTask} />
    </div>
  );
}
