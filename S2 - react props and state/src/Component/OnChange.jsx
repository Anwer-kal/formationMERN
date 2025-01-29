import React, { useState } from 'react';

const InputComponent = () => {
  const [value, setValue] = useState(''); 

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={value} 
        onChange={handleChange} // Met à jour l'état à chaque changement
      />
      <p>Current value: {value}</p>
    </div>
  );
};

export default InputComponent;
