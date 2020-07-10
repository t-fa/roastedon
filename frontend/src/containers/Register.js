import React, { useState } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/actions/auth';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Input from '../components/UI/Input';
import Button from '../styles/Button';
import * as colors from '../styles/Colors';

const lockStyle = {
  display: 'inline-block',
  color: 'white',
  width: 'inherit',
  height: 'inherit',
  textAlign: 'center',
  verticalAlign: 'bottom',
};

const Container = styled.div`
  width: 65%;
  margin: 0 auto;
`;

const Circle = styled.div`
  background: ${colors.secondary};
  border-radius: 50%;
  margin: 1.5rem auto;
  height: 1.5rem;
  width: 1.5rem;
  padding: 1rem;
`;

const Text = styled.h1`
  text-align: center;
`;

const Auth = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(username, password);
  };

  let authRedirect = null;
  if (props.isAuthenticated) {
    return (authRedirect = <Redirect to="/" />);
  }

  return (
    <Container>
      {authRedirect}
      <Circle>
        <FontAwesomeIcon icon={['fas', 'lock']} style={lockStyle} />
      </Circle>

      <form onSubmit={submitHandler}>
        <Text>Sign In</Text>
        <Input
          label={'Username'}
          placeholder={'Username'}
          name={'username'}
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
        <Input
          type={'password'}
          label={'Password'}
          placeholder={'Password'}
          name={'password'}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Button type={'submit'}>Submit</Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(auth(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
