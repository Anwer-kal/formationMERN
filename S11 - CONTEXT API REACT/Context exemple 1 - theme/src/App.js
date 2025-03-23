import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header'
import ThemeSwitcher from './components/ThemeSwitcher'
import { ThemeProvider } from './Context/ThemeContext';  // Importer le provider

function App() {
    return (
        <ThemeProvider>
            <div>
            <Header />
            <ThemeSwitcher />
            </div>
        </ThemeProvider>
    );
}

export default App;