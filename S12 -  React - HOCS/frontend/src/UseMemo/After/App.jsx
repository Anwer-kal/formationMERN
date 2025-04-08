
import React, { useState, useMemo } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const expensiveCalc = () => {
    console.log("Calculating...");
    let result = 0;
    for (let i = 0; i < 1e7; i++) result += i;
    return result;
  };

  const value = useMemo(() => expensiveCalc(), []);

  return (
    <>
      <p>Result: {value}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  );
}
