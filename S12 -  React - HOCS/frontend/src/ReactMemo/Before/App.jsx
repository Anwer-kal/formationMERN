import React, { useState } from 'react';

const Child = ({ name }) => {
  console.log("👶 Child rendered");
  return <p>{name}</p>;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Alice");

  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <Child name={name} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
