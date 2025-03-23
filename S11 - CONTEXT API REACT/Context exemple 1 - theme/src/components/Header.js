import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';  // Assure-toi de bien importer le contexte

function Header() {
    const { theme, setTheme } = useContext(ThemeContext);

    // Définir la couleur de fond selon le thème
    const backgroundColor = theme === 'light' ? '#fff' : '#333';
    const color = theme === 'light' ? '#000' : '#fff';

    return (
        <div style={{ backgroundColor, color, minHeight: '3vh', padding: '20px' }}>
              Header
        </div>
    );
}

export default Header;
