import React, { useState } from 'react';

const ButtonComponent = () => {
  const [message, setMessage] = useState(true); // État pour stocker le message

  const handleClick = () => {
    setMessage(!message);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p style={{ color: {message} ? "green" : "red" }}>
        {message ? 'True':'False'}</p>
    </div>
  );
};

export default ButtonComponent;
