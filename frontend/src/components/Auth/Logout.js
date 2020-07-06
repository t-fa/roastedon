import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

const Logout = (props) => {
  const { logout } = props;

  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: actionTypes.AUTH_LOGOUT }),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
