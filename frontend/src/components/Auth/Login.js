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

  console.log(props.isAuthenticated);

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
            ref={register({ required: true })}
          />
        </Label>
        {errors.username && <Span>This field is required.</Span>}
        <Label>
          Password
          <Input
            type="password"
            placeholder="Password"
            name={'password'}
            ref={register({ required: true })}
          />
        </Label>
        {errors.password && <Span>This field is required.</Span>}
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
  console.log(state.auth.token);
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
