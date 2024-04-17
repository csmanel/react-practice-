import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import UndoPoint from './UndoPoint';

const Coordinate = () => {
  const [points, setPoints] = useState([]);

  function handlePlacePoint(e) {
    const { pageX, pageY } = e;
    setPoints([...points, { x: pageX, y: pageY }]);
  }

  return (
    <>
      <UndoPoint points={points} setPoints={setPoints} />
      <div className="coordinate" onClick={handlePlacePoint}>
        {points.map((point) => {
          return (
            <div
              key={point.id}
              className="point"
              style={{
                left: point.x + 'px',
                top: point.y + 'px',
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default Coordinate;
