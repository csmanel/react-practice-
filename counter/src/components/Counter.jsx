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

  //set timeout, not using prompt
  //if prompted, don't display countdown: num
  //use tailwind to style a bit

  return (
    <div>
      <h1>Countdown: {num}</h1>
    </div>
  );
};

export default Counter;
