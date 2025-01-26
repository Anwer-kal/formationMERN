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

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

    </div>
  );
};

export default Counter;
