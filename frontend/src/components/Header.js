import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../store/actions/actionTypes';

const header = (props) => {
  let loggedIn;
  props.token && props.userId ? (loggedIn = true) : (loggedIn = false);
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
              {loggedIn ? (
                <Link className="nav-link" to="/auth" onClick={props.logout}>
                  Log Out
                </Link>
              ) : (
                <Link className="nav-link" to="/auth">
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: actionTypes.AUTH_LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(header);
