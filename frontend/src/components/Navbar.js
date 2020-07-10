import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
  background-color: #333;
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
`;

const Li = styled.li`
  float: ${(props) => (props.right ? 'right' : 'left')};

  & a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    ${(props) => props.brand && 'font-weight: 700'};
  }

  & a:hover {
    background-color: #111;
  }
`;

const navbar = (props) => {
  let loggedIn;
  props.token && props.userId ? (loggedIn = true) : (loggedIn = false);
  return (
    <nav>
      <Ul>
        <Li brand>
          <a href="/">Roasted On</a>
        </Li>
        <Li>
          <Link to="/">Home</Link>
        </Li>
        <Li>
          <Link to="/add">Add A Coffee Shop</Link>
        </Li>
        <Li right>
          {loggedIn ? (
            <Link to="/logout">Log Out</Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </Li>
      </Ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(navbar);
