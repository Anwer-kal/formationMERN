import React, { useState, useCallback } from 'react';

const Button = React.memo(({ onClick }) => {
  console.log("🔘 Button rendered");
  return <button onClick={onClick}>Click</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Alice");

  const handleClick = useCallback(() => {
    console.log("Clicked count");
  }, []); // <- dépendance vide pour éviter les rerenders

  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Hello {name}</p>
      <Button onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
