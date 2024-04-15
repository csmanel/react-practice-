import { useState, useEffect } from 'react';

const Counter = () => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (num > 0) {
        setNum(num - 1);
      } else {
        clearInterval(interval);
        const newNum = prompt('enter a new number');
        setNum(parseInt(newNum) || 0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [num]);

  return (
    <div>
      <h1>Countdown: {num}</h1>
    </div>
  );
};

export default Counter;
