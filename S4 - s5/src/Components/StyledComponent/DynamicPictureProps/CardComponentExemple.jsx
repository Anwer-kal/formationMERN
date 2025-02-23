import React from 'react';
import { Card } from './CardStylesPicture.js';

const CardComponentExemple = ({ image, text }) => {
  return <Card bgImage={image}><span>{text}</span></Card>;
};

export default CardComponentExemple;
