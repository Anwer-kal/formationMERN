import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  primary: "blue",
  secondary: "green",
  text: "white"
};

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.text};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h2>Thème Global avec Styled Components</h2>
        <Button>Bouton Thématisé</Button>
      </Container>
    </ThemeProvider>
  );
};

export default App;
