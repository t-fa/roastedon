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

const Container = styled.div`
  margin: 0 auto;
  max-width: 95%;
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
    return (
      <Container>
        <p>
          Your search didn't return any shops with the zipcode: {zipcode}. Would
          you like to <Link to="/add">add</Link> one?
        </p>
      </Container>
    );
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
