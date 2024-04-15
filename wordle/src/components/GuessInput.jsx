import React, { useState } from 'react';

const GuessInput = ({ onSubmit }) => {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(guess);
    setGuess('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Take a guess!
        <input
          type="text"
          value={guess}
          onChange={handleChange}
          maxLength={5}
          minLength={5}
          pattern="[A-za-z]{5}"
          required
        />
      </label>
      <button type="submit">Guess</button>
    </form>
  );
};

export default GuessInput;
