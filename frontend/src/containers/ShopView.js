import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import Card from '../styles/Card';
import Button from '../styles/Button';
import * as colors from '../styles/Colors';

const ShopView = (props) => {
  const [shop, setShop] = useState([]);
  const [displayFavBtn, setDisplayFavBtn] = useState([true]);

  const addFavorite = () => {
    axios
      .post(`/users/favorites/${props.userId}/${props.match.params.id}`, {
        userId: props.userId,
        shopId: props.match.params.id,
      })
      .then(setDisplayFavBtn(false))
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteFavorite = () => {
    axios
      .delete(`/users/favorites/${props.userId}/${props.match.params.id}`)
      .then(setDisplayFavBtn(true))
      .catch((error) => {
        console.log(error);
      });
  };

  // display shop info
  useEffect(() => {
    axios
      .get(`/shops/${props.match.params.id}`)
      .then((response) => {
        setShop(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

  // display favorite shop info
  useEffect(() => {
    if (props.userId) {
      setDisplayFavBtn(true);
      axios
        .get(`/users/favorites/${props.userId}/${props.match.params.id}`)
        .then((response) => {
          // shopId is a number props.match.params.id is a string
          if (response.data[0]) {
            if (response.data[0].shopId.toString() === props.match.params.id) {
              setDisplayFavBtn(false);
            }
          }
        })
        .catch((error) => console.log(error));
    }
  }, [props.userId, props.match.params.id]);

  if (shop.length > 0) {
    return (
      <Card nohover>
        <h1>{shop[0].name}</h1>
        <p>{shop[0].address1}</p>
        {displayFavBtn ? (
          <Button color={colors.secondary} onClick={addFavorite}>
            Add to Favorites <FontAwesomeIcon icon={['far', 'heart']} />
          </Button>
        ) : (
          <Button color={colors.success} onClick={deleteFavorite}>
            Favorited <FontAwesomeIcon icon={['fas', 'heart']} color="pink" />
          </Button>
        )}
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
