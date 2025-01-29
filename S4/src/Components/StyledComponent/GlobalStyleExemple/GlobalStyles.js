import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: Arial, sans-serif;
    transition: all 0.3s ease-in-out;
    text-align: center;
    padding: 20px;
  }
`;
