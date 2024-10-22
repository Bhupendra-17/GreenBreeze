
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/temp';
import Container from './components/Container/temp';
import Home from './Home'
import Knowledge from './Knowledge';

function App() {
  return (
    <Router>
      <div className='overflow-x-hidden'>
      <Navbar />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/home" element={<Home/> }></Route>
          <Route path='/knowledge' element={<Knowledge/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
