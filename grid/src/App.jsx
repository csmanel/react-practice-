import './App.css';
import Grid from './component/Grid';
import { useState } from 'react';

function App() {
  const [numRows, setNumRows] = useState(10);
  const [numCols, setNumCols] = useState(10);

  return (
    <div>
      <Grid numCols={numCols} numRows={numRows} />
    </div>
  );
}

export default App;
