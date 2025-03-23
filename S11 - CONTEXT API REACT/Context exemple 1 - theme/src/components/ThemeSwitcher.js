import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';  // Assure-toi de bien importer le contexte

function ThemeSwitcher() {
    const { theme, setTheme } = useContext(ThemeContext);

    // Définir la couleur de fond selon le thème
    const backgroundColor = theme === 'light' ? '#fff' : '#333';
    const color = theme === 'light' ? '#000' : '#fff';

    return (
        <div style={{ backgroundColor, color, minHeight: '100vh', padding: '20px' }}>
            <p>Le thème actuel est : {theme}</p>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Changer le thème
            </button>
        </div>
    );
}

export default ThemeSwitcher;
