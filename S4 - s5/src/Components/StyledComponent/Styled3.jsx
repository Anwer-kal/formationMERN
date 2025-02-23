import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.color || 'gray'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.hoverColor || 'black'};
  }
`;

const Exemple3 = () => {
  return (
    <div>
      <h2>Boutons avec couleurs dynamiques</h2>
      <Button color="green" hoverColor="darkgreen">Bouton Vert</Button>
      <Button color="red" hoverColor="darkred">Bouton Rouge</Button>
      <Button>Bouton Gris (par défaut)</Button>
    </div>
  );
};

export default Exemple3;
