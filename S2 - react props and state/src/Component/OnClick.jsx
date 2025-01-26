import React, { useState } from 'react';

const ButtonComponent = () => {
  const [message, setMessage] = useState(true); 

  const handleClick = () => {
    setMessage(!message);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p style={{color: {message} ?  '#00FF00' : 'red', fontWeight:'bold'}}>{message === true ? 'True' : 'False'}</p>
    </div>
  );
};

export default ButtonComponent;
