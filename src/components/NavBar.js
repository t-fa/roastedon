import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// components
import Add from './Add';
import ZipCode from './ZipCode';
import Info from './Info';

function NavBar() {
  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/add">
                Add A Coffee Shop
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/">
          <ZipCode />
          <Info />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
      </Switch>
    </Router>
  );
}

export default NavBar;
