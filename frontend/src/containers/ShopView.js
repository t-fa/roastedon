import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import Card from '../styles/Card';
import Button from '../styles/Button';
import * as colors from '../styles/Colors';

const ShopView = (props) => {
  const [shop, setShop] = useState([]);

  let favoriteMessage;

  const addFavorite = () => {
    axios
      .post(`/users/favorites/${props.userId}/${props.match.params.id}`, {
        userId: props.userId,
        shopId: props.match.params.id,
      })
      .then((favoriteMessage = 'Success!'))
      .catch((error) => {
        console.log(error);
      });
  };

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
        {props.token ? (
          <>
            <Button color={colors.secondary} onClick={addFavorite}>
              Add to Favorites <FontAwesomeIcon icon={['far', 'heart']} />
            </Button>
            <span>{favoriteMessage}</span>
          </>
        ) : null}
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(ShopView);
