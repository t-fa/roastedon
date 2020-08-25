import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';
import { NavLink, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

import { Input, Label, Span } from '../../styles/Input';
import Button from '../../styles/Button';
import * as colors from '../../styles/Colors';

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
  background: ${colors.warning};
  border-radius: 50%;
  margin: 1.5rem auto;
  height: 1.5rem;
  width: 1.5rem;
  padding: 1rem;
`;

const Text = styled.h1`
  text-align: center;
`;

const Caption = styled(NavLink)`
  text-align: center;
  text-decoration: none;
  color: ${colors.warning};
  float: ${(props) => (props.right ? 'right' : 'left')};
`;

const Auth = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    props.onAuth(data.username, data.password);
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
        <Text>Sign In</Text>
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
        {errors?.username?.message}
        <Label>
          Password
          <Input
            type="password"
            placeholder="Password"
            name={'password'}
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
        <Button type="submit">Submit</Button>
      </form>
      <Caption to="/reset">Forgot password?</Caption>
      <Caption right="true" to="/register">
        Don't have an account? Sign up.
      </Caption>
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
    onAuth: (username, password) => dispatch(auth(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
