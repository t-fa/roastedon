import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authCheckState } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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
  const [emailAvail, setEmailAvail] = useState(true);
  const [usernameAvail, setUsernameAvail] = useState(true);

  const onSubmit = (data) => {
    setEmailAvail(true);
    setUsernameAvail(true);
    axios.post('/users/checkemail', { email: data.email }).then((response) => {
      if (response.data) {
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
      } else {
        setEmailAvail(false);
      }
    });
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
        {!emailAvail && (
          <Span>
            That email address is already in use. Did you want to{' '}
            <Link to="/reset">reset</Link> your password?
          </Span>
        )}
        {errors.email && <Span>This field is required.</Span>}
        <Label>
          Username
          <Input
            placeholder="Username"
            name="username"
            ref={register({
              required: {
                value: true,
                message: <Span>This field is required.</Span>,
              },
              minLength: {
                value: 5,
                message: (
                  <Span>Your username should be at least 5 characters.</Span>
                ),
              },
              maxLength: {
                value: 36,
                message: (
                  <Span>
                    Your username should be no more than 36 characters.
                  </Span>
                ),
              },
              pattern: {
                value: /^[a-zA-Z0-9_]*$/,
                message: (
                  <Span>
                    Your username can only contain letters, numbers, and
                    underscores. Sorry about that :(
                  </Span>
                ),
              },
            })}
          />
        </Label>
        {!usernameAvail && <Span>Sorry! That username is taken :(</Span>}
        {errors?.username?.message}
        <Label>
          Password
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            ref={register({
              required: {
                value: true,
                message: <Span>This field is required.</Span>,
              },
              minLength: {
                value: 8,
                message: (
                  <Span>Your password should be at least 8 characters.</Span>
                ),
              },
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message: (
                  <Span>
                    Sorry to be such a bother, but your password should include
                    at least one uppercase letter, one lowercase letter, one
                    number, and one special character. Help me help you {'<'}3.
                  </Span>
                ),
              },
            })}
          />
        </Label>
        {errors?.password?.message}
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
