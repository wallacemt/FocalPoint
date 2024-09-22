'use client';
import { useEffect, useState } from 'react';
import styles from './taskList.module.scss';
import AddTaskButton from '../addTaskButton';
import DeleteTaskModal from '../deleteTaskModal';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Recuperar tarefas do localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);
  
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleDeleteTask = (taskText) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(task => task.text !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
      return updatedTasks;
    });
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const toggleTaskCompletion = (taskToToggle) => {
    const updatedTasks = tasks.map(task => 
      task.text === taskToToggle.text ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = (newTask) => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
    }
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
              <button onClick={() => openDeleteModal(task)} className='trash'>
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
              <button onClick={() => openDeleteModal(task)}>
                <img src='/trash.svg' className={styles.icon} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AddTaskButton onAddTask={handleAddTask} />
      {isDeleteModalOpen && (
        <DeleteTaskModal 
          onClose={closeDeleteModal} 
          onDeleteTask={handleDeleteTask} 
          taskText={taskToDelete?.text} 
        />
      )}
    </div>
  );
}
