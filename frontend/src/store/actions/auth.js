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
        console.log(response);
        dispatch(authSuccess(response.data.token, response.data.id));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
