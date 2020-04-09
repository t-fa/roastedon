import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="jumbotron">
      <h1>Roasted On</h1>
      <p className="lead">Connecting coffee lovers to premium coffee shops</p>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Add A Coffee Shop
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
