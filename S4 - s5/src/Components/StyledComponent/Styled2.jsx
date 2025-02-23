import React from 'react';
import { Card, Title, Text } from './SeparateStyle/CardStyles'; // Import styled components

const CardComponent = () => {
  return (
    <Card>
      <Title>Styled Components Card</Title>
      <Text>This card is styled using a separate file.</Text>
    </Card>
  );
};

export default CardComponent;
