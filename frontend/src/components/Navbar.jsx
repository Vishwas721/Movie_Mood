// ====================================================================
// File: Movie_Review_System/frontend/src/components/Navbar.jsx
// ====================================================================

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">🎬 CineScope AI</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/analyze">Analyze</Link>
        <Link to="/about">About</Link>
        <Link to="/quotes">Quotes</Link>
      </div>
    </nav>
  );
}
export default Navbar;
