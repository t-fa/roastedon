import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
  return (
    <>
      <div className="jumbotron">
        <h1>Roasted On</h1>
        <p className="lead">Connecting coffee lovers to premium coffee shops</p>
      </div>

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
            <li className="nav-item">
              <Link className="nav-link" to="/auth">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default header;
