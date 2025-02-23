import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme.js';
import { GlobalStyle } from './GlobalStyles.js';
import { Button } from './ButtonStyles.js';

const GlobalStyleIndex = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <h1>Mode {isDarkMode ? "Sombre" : "Clair"}</h1>
      <Button onClick={() => setIsDarkMode(!isDarkMode)}>
        Basculer Mode {isDarkMode ? "Clair" : "Sombre"}
      </Button>
    </ThemeProvider>
  );
};

export default GlobalStyleIndex;
