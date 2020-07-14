import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Card from '../styles/Card';
import Button from '../styles/Button';
import * as colors from '../styles/Colors';

const Shadow = styled(Button)`
  &:hover: {
    text-decoration: underline;
    box-shadow: 0 0 5px grey;
  }
`;

const ShopView = (props) => {
  const [shop, setShop] = useState([]);

  const addFavorite = () => {};

  useEffect(() => {
    axios
      .get(`/shops/${props.match.params.id}`)
      .then((response) => {
        setShop(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shop, props.match.params.id]);

  if (shop.length > 0) {
    return (
      <Card nohover>
        <h1>{shop[0].name}</h1>
        <p>{shop[0].address1}</p>
        <Shadow color={colors.warning}>
          Add to Favorites <FontAwesomeIcon icon={['far', 'heart']} />
        </Shadow>
      </Card>
    );
  } else {
    return (
      <div className="card">
        <div className="card-body">
          <p>An error occurred.</p>
        </div>
      </div>
    );
  }
};

export default ShopView;
