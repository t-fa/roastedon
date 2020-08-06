import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logoutStart = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const logout = () => {
  return (dispatch) => {
    axios
      .get('/users/logout')
      .then((response) => {
        dispatch(logoutStart());
      })
      .catch((err) => console.log(err));
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    axios
      .get('/users/login')
      .then((response) => {
        dispatch(authSuccess(response.data.token, response.data.id));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const auth = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username: username,
      password: password,
    };
    axios
      .post('/users/login', authData)
      .then((response) => {
        dispatch(authSuccess(response.data.token, response.data.id));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
