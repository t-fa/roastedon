import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authCheckState } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { Input, Label, Span } from '../../styles/Input';
import Button from '../../styles/Button';
import * as colors from '../../styles/Colors';
import Modal from '../UI/Modal';

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
  const { register, handleSubmit, errors } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [usernameAvail, setUsernameAvail] = useState(true);

  const onSubmit = (data) => {
    axios
      .post('/users/checkusername', { username: data.username })
      .then((response) => {
        if (response.data) {
          axios
            .post('/users/register', {
              username: data.username,
              email: data.email,
              password: data.password,
            })
            .then(() => {
              setShowModal(true);
            })
            .catch((error) => console.log(error));
        } else {
          setUsernameAvail(false);
        }
      })
      .catch((error) => console.log(error));
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text>Sign Up</Text>
        <Label>
          Email
          <Input
            type="email"
            placeholder="Email"
            name="email"
            ref={register({ required: true })}
          />
        </Label>
        {errors.email && <Span>This field is required.</Span>}
        <Label>
          Username
          <Input
            placeholder="Username"
            name="username"
            ref={register({ required: true })}
          />
        </Label>
        {!usernameAvail && <Span>Sorry! That username is taken :(</Span>}
        {errors.username && <Span>This field is required.</Span>}
        <Label>
          Password
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            ref={register({ required: true })}
          />
        </Label>
        {errors.password && <Span>This field is required.</Span>}
        <Button type="submit">One of us! One of us!</Button>
      </form>
      {showModal && (
        <Modal
          text="Welcome to the club! Check your email to confirm your email address. After you click the button below, you'll be redirected to the homepage."
          click={props.onTryAutoSignup}
        />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
