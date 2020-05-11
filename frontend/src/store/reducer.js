import * as actionTypes from './actions';

const initialState = {
  zipcode: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_INPUT:
      return {
        ...state,
        zipcode: action.zipcode,
      };
  }
  return state;
};

export default reducer;
