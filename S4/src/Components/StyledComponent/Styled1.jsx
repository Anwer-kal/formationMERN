import styled from 'styled-components';

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: yellow;
  }
`;

const Title = styled.h1`
  color: red;


  &:hover {
    background-color: yellow;
  }
`;

const styled1 = () => (

<>
<Button>Click me</Button>
<Title>fff</Title>

</>
);

export default styled1;
