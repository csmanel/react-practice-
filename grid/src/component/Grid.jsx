import { useState } from 'react';

const Grid = ({ numRows, numCols }) => {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => 0)
    )
  );

  const updateVal = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = 1;
      return newGrid;
    });
  };

  return (
    <div>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((val, colIdx) => (
            <div
              key={colIdx}
              className={`val ${val === 1 ? 'active' : ''}`}
              onClick={() => updateVal(rowIdx, colIdx)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
