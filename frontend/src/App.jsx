// ====================================================================
// File: Movie_Review_System/frontend/src/App.jsx
// ====================================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import About from './pages/About';
import Quotes from './pages/Quotes';
import './index.css'; // Import the styles

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/about" element={<About />} />
        <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
