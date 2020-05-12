import url from '../url';
import axios from 'axios';

export const ADD_SHOPS = 'ADD_SHOPS';
export const CLEAR_SHOPS = 'CLEAR_SHOPS';

export const saveShops = (response) => {
  return {
    type: ADD_SHOPS,
    shops: response,
  };
};

export const addShops = (zipcode) => {
  return (dispatch) => {
    axios
      .get(`${url}shops?zipcode=${zipcode}`)
      .then((response) => {
        dispatch(saveShops(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const clearShops = () => {
  return {
    type: CLEAR_SHOPS,
  };
};
