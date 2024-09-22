'use client';
import { useState } from 'react';
import styles from './modal.module.scss';

export default function Modal({ onClose, onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask('');
      onClose(); // Fecha o modal após adicionar a tarefa
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Nova Tarefa</h2>
        <label htmlFor="taskTitle">Título</label>
        <input
          type="text"
          id="taskTitle"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Digite o nome da tarefa"
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
