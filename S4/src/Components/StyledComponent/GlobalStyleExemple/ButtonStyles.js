import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.background};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px;
  transition: background 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
