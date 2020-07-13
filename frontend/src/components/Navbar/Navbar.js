import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserMenu from './UserMenu';

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

const Button = styled.button`
  background-color: inherit;
  border: none;
`;

const userIconStyle = {
  color: 'white',
  padding: '0.25em',
};

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
            <Button onClick={toggleMenu}>
              <FontAwesomeIcon
                icon={['fas', 'user-circle']}
                style={userIconStyle}
                size="2x"
              />
            </Button>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </Li>
      </Ul>
      {showMenu ? <UserMenu /> : null}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(Navbar);
