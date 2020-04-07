import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div class="jumbotron">
      <h1>Roasted On</h1>
      <p class="lead">Connecting coffee lovers to premium coffee shops</p>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/add">
                Add A Coffee Shop
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
