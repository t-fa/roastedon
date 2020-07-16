import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';

import Card from '../../styles/Card';

const Text = styled.h1`
  text-align: center;
`;

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/favorites/${props.userId}`)
      .then((response) => {
        console.log(response.data);
        setFavorites(response.data);
      })
      .catch((error) => console.log(error));
  }, [props.userId]);

  return (
    <Card nohover>
      <Text>Favorite Shops</Text>
      <Card nohover>{favorites.length > 0 && favorites[0].shopId}</Card>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(Favorites);
