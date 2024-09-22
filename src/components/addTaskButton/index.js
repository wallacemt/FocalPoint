'use client';
import { useState } from 'react';
import styles from './addTaskButton.module.scss';
import Modal from './Modal';

export default function AddTaskButton({ onAddTask }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.addTaskContainer}>
      <button onClick={handleOpenModal} className={styles.addTaskButton}>
        + Nova Tarefa
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} onAddTask={onAddTask} />}
    </div>
  );
}
