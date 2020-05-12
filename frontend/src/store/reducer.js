import * as actionTypes from './actions';

const initialState = {
  shops: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SHOPS:
      return {
        ...state,
        shops: [],
      };
    case actionTypes.CLEAR_SHOPS:
      return {
        ...state,
        shops: [],
      };
    default:
      return state;
  }
};

export default reducer;
