import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/shops';
import styled from 'styled-components';

import ShopThumbnail from '../components/Shops/ShopThumbnail';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ShopsContainer = (props) => {
  const { zipcode, onAddedShops } = props;

  useEffect(() => {
    onAddedShops(zipcode);
  }, [zipcode, onAddedShops]);

  if (props.shops.shops.length > 0) {
    return props.shops.shops.map((shop) => {
      return (
        <StyledLink key={shop.id} to={props.match.url + '/' + shop.id}>
          <ShopThumbnail {...shop} />
        </StyledLink>
      );
    });
  } else {
    return <p>Not found</p>;
  }
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShopsContainer)
);
