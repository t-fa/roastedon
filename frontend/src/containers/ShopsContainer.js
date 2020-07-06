import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/shops';

import Shops from '../components/Shops/Shops';

const ShopsContainer = (props) => {
  const { zipcode, onAddedShops } = props;

  useEffect(() => {
    onAddedShops(zipcode);
  }, [zipcode, onAddedShops]);

  return <Shops shops={props.shops} />;
};

const mapStateToProps = (state) => {
  return {
    shops: state.shops,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddedShops: (zipcode) => dispatch(actionTypes.addShops(zipcode)),
    onClearShops: () => dispatch({ type: actionTypes.clearShops() }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopsContainer);
