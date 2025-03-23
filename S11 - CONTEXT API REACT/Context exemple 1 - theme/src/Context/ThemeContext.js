// ThemeContext.js (ou dans ton fichier principal)
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();  // Définir le contexte

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
