import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/post" element={<Post />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
