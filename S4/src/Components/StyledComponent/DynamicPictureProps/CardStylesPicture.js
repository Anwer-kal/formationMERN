import styled from 'styled-components';

export const Card = styled.div`
  width: 350px;
  height: 200px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  /* Ajout d'un overlay pour améliorer la lisibilité du texte */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); /* Overlay sombre */
  }

  /* Contenu textuel */
  span {
    position: relative;
    z-index: 2;
  }
`;
