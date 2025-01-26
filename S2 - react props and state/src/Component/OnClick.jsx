import React, { useState } from 'react';

const ButtonComponent = () => {
  const [message, setMessage] = useState(''); // État pour stocker le message

  const handleClick = () => {
    setMessage('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p>{message}</p>
    </div>
  );
};

export default ButtonComponent;
