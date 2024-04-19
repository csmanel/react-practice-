import { useState, useEffect } from 'react';

export default function Feature() {
  const fileName = 'my-file-name';
  const endpoint = 'http://endpoint.com';
  const [times, setTimes] = useState(0);
  const [buttonClick, setButtonClick] = useState(false);

  const apiFetch = async () => {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('error fetching data');
    }
  };

  useEffect(() => {
    // I wrote greater than 5 rather than less than 5
    // we also check to see if the buttonClick has been clicked
    if (times < 5 && buttonClick) {
      const intervId = setInterval(() => {
        apiFetch();
        setTimes(times + 1);
      }, 3000);
      // realized the interval that is setup needs to be cleared
      return () => clearInterval(intervId);
    } else if (times === 5) {
      setTimes(0);
      setButtonClick(false);
    }
    // need times in dependency so that it returns to conditional on line 20, otherwise it will infinitely loop setTimes(times + 1)
  }, [times, buttonClick]);

  // I did need a function to handle the on click
  const handleButtonClick = () => {
    setButtonClick(true);
  };

  return (
    <div>
      <h1>Feature</h1>
      {/* I added a disabled function to the button so if the button has been clicked it cannot be clicked again until the interval has been cleared */}
      <button onClick={handleButtonClick} disabled={buttonClick}>
        Start Sending Info
      </button>
    </div>
  );
}
