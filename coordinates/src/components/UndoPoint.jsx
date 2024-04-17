import React, { useState } from 'react';
import '../App.css';

const UndoPoint = ({ points, setPoints }) => {
  const [pointHistory, setPointHistory] = useState([]);

  //TODO, remove last point from array of points z
  function handleUndo() {
    if (points.length === 0) return;

    const lastPoint = points[points.length - 1];
    setPointHistory([...pointHistory, lastPoint]);
    setPoints(points.slice(0, -1));
  }

  //TODO, take point from undo point array and return it?
  function handleRedo() {
    if (pointHistory.length === 0) return;

    const lastPoppedPoint = pointHistory[pointHistory.length - 1];
    setPoints([...points, lastPoppedPoint]);
    setPointHistory(pointHistory.slice(0, -1));
  }

  return (
    <div className="buttons">
      <button onClick={handleUndo} disabled={points.length === 0}>
        undo
      </button>
      <button onClick={handleRedo} disabled={pointHistory.length === 0}>
        redo
      </button>
    </div>
  );
};

export default UndoPoint;
