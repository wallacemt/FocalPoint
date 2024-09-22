'use client';
import { useState } from 'react';
import styles from './modal.module.scss';

export default function Modal({ onClose, onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask('');
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Nova Tarefa</h2>
        <label htmlFor="taskTitle">Título</label>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Digite"
        />
        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={handleAddTask} className={styles.addButton}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
