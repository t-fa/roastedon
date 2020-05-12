import url from '../url';
import axios from 'axios';

export const ADD_SHOPS = 'ADD_SHOPS';
export const CLEAR_SHOPS = 'CLEAR_SHOPS';

export const saveShops = (zipcode) => {
  return {
    type: ADD_SHOPS,
  };
};

export const addShops = (zipcode) => {
  return (dispatch) => {
    axios
      .get(`${url}shops?zipcode=${zipcode}`)
      .then((response) => {
        dispatch(saveShops(zipcode));
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
