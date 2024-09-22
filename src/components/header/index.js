'use client';  
import { useEffect, useState } from 'react';
import styles from './header.module.scss';

export default function Header() {
  const [currentDate, setCurrentDate] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('pt-BR', options));
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    
    if (storedName) {
      setUserName(storedName);
    } else {
      const name = prompt("Por favor, insira seu nome:");
      if (name) {
        setUserName(name);
        localStorage.setItem('userName', name); 
      }
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logomark.svg" alt="Logo" className={styles.logomark} />
        <img className={styles.logotype} src='/logotype.svg' alt="Logotipo" />
      </div>
      <div className={styles.greeting}>
        Bem-vindo de volta, {userName}
      </div>
      <div className={styles.date}>
        {currentDate}
      </div>
    </header>
  );
}
