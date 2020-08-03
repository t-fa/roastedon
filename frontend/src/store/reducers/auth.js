import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      // I have no idea why I had to put these here and it wouldn't work in the auth action
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default reducer;
