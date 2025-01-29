import React, { useState } from 'react';

const Counter = () => {
  // Déclaration de l'état avec useState
  const [count, setCount] = useState(0);

  // Fonction pour incrémenter le compteur
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  const xcrement = () => {
    setCount(count *10);
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={xcrement}>Xcrement</button>
    </div>
  );
};

export default Counter;
