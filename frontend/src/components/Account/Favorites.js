import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../../styles/Card';

const Text = styled.h1`
  text-align: center;
`;

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);

  let favoriteShopsArr;

  useEffect(() => {
    axios
      .get(`/users/favorites/${props.userId}`)
      .then((response) => {
        let shopId = [];
        response.data.forEach((shop) => shopId.push(shop.shopId));
        for (let i = 0; i < shopId.length; i++) {
          axios
            .get(`/shops/${shopId[i]}`)
            .then((response) => {
              setFavorites((oldFavorites) => [
                ...oldFavorites,
                response.data[0],
              ]);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }, [props.userId]);

  favoriteShopsArr = favorites.map((favorite) => (
    <Link to={`/shops/${favorite.id}`}>
      <Card nohover key={favorite.id}>
        {favorite.name}
      </Card>
    </Link>
  ));

  if (favorites.length > 0) {
    return (
      <Card nohover>
        <Text>Favorite Shops</Text>
        {favoriteShopsArr}
      </Card>
    );
  } else {
    return (
      <Card>
        <Text>You have no favorite shops :(</Text>
      </Card>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(Favorites);
