'use client';

import { useState, useEffect } from "react";
import styles from '..css/navbar.module.css';


export default function ThemeToggleButton() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
        setTheme(savedTheme);
        } else if (prefersDark) {
        setTheme('dark');
        } else {
        setTheme('light');
        }
    }, []);
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <button onClick={toggleTheme} className={styles.themeToggleButton}>
        {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}