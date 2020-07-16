import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #333;
`;

const Li = styled.li`
  & a {
    display: block;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
  }

  & a:hover {
    background-color: #111;
    color: white;
  }
`;

const Container = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
`;

const userMenu = (props) => {
  return (
    <Container>
      <Ul>
        <Li>
          <Link to="/favorites">Favorites</Link>
        </Li>
        <Li>
          <Link to="/account">Settings</Link>
        </Li>
        <Li>
          <Link to="/logout">Log Out</Link>
        </Li>
      </Ul>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(userMenu);
