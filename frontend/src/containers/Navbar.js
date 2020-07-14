import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserMenu from '../components/Navbar/UserMenu';
import HamburgerMenu from '../components/Navbar/HamburgerMenu';

const Container = styled.div`
  @media screen and (max-width: 576px) {
    display: none;
  }
`;

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
  display: ${(props) => (props.hamburger ? 'none' : 'inline-block')};
  ${(props) =>
    props.hamburger &&
    `@media screen and (max-width: 576px) {
    display: inline-block;
  }`}
`;

const userIconStyle = {
  color: 'white',
  padding: '0.25em',
};

const Navbar = (props) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const togglerHamburgerMenu = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  let loggedIn;
  props.token && props.userId ? (loggedIn = true) : (loggedIn = false);
  return (
    <nav>
      <Ul>
        <Li brand>
          <a href="/">Roasted On</a>
        </Li>
        <Container>
          <Li>
            <Link to="/">Home</Link>
          </Li>
          <Li>
            <Link to="/add">Add A Coffee Shop</Link>
          </Li>
        </Container>
        <Li right>
          <Button onClick={togglerHamburgerMenu} hamburger>
            <FontAwesomeIcon
              icon={['fas', 'bars']}
              style={userIconStyle}
              size="2x"
            />
          </Button>
        </Li>
        <Li right>
          {loggedIn ? (
            <Button onClick={toggleUserMenu}>
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
      {showUserMenu && loggedIn ? <UserMenu /> : null}
      {showHamburgerMenu ? <HamburgerMenu /> : null}
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
