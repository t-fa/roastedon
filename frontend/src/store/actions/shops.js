import url from '../../url';
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const saveShops = (response) => {
  return {
    type: actionTypes.ADD_SHOPS,
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
    type: actionTypes.CLEAR_SHOPS,
  };
};
