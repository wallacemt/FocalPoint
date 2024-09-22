'use client';
import styles from './modal.module.scss';

export default function DeleteTaskModal({ onClose, onDeleteTask, taskText }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Deletar Tarefa</h2>
        <p>Tem certeza que você deseja deletar essa tarefa?</p>
        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={() => {
            onDeleteTask(taskText);
            onClose();
          }} className={styles.deleteButton}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
