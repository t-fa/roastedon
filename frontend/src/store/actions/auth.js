import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, verified) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    verified: verified,
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
      .get('/users/logout', {}, { withCredentials: true })
      .then((response) => {
        dispatch(logoutStart());
      })
      .catch((err) => console.log(err));
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    axios
      .get('/users/login', {}, { withCredentials: true })
      .then((response) => {
        dispatch(
          authSuccess(
            response.data.token,
            response.data.id,
            response.data.verified
          )
        );
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
      .post('/users/login', authData, { withCredentials: true })
      .then((response) => {
        dispatch(
          authSuccess(
            response.data.token,
            response.data.id,
            response.data.verified
          )
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
