import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-left">
          <h1>Monitoring Dashboard</h1>
        </div>

        <div className={`navbar-right ${isMenuOpen ? 'open' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive || location.pathname === "/" ? 'navbar-btn active' : 'navbar-btn'
            }
          >
            Overall Trend
          </NavLink>
          <NavLink 
            to="/query" 
            className={({ isActive }) => 
              isActive ? 'navbar-btn active' : 'navbar-btn'
            }
          >
            Specific Query
          </NavLink>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
