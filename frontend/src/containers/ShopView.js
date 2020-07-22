import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ShopRating from './ShopRating.js';
import Card from '../styles/Card';
import Button from '../styles/Button';
import * as colors from '../styles/Colors';
import ShopCommentForm from '../components/Shops/ShopCommentForm';

const Star = styled.button`
  background-color: inherit;
  border: none;
  padding: 0;
`;

const starStyle = {
  color: 'gold',
  stroke: 'darkgoldenrod',
  strokeWidth: '10',
  padding: '0 4px',
};

const ShopView = (props) => {
  const [shop, setShop] = useState([]);
  const [displayFavBtn, setDisplayFavBtn] = useState([true]);
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState([]);
  const [showCommentForm, setSetShowCommentForm] = useState([true]);

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

  const sendRating = (rating) => {
    axios
      .post(`/users/ratings/${props.match.params.id}/${props.userId}`, {
        rating: rating,
      })
      .then(() => {
        setRating(rating);
      })
      .catch((error) => console.log(error));
  };

  const updateRating = (rating) => {
    axios
      .put(`/users/ratings/${props.match.params.id}/${props.userId}`, {
        rating: rating,
      })
      .then(() => {
        setRating(rating);
      })
      .catch((error) => console.log(error));
  };

  // show comments
  useEffect(() => {
    axios
      .get(`/users/comments/${props.match.params.id}`)
      .then((response) => {
        if (response.data.length > 0) {
          let commentsArray = [];
          response.data.forEach((comment) => {
            commentsArray.push(comment);
            axios
              .get(`/users/${comment.userId}`)
              .then((response) => {
                commentsArray[comment.id - 1]['username'] =
                  response.data[0].username;

                setComments((oldComments) => [
                  ...oldComments,
                  commentsArray[comment.id - 1],
                ]);
              })
              .catch((error) => console.log(error));
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id, showCommentForm]);

  let commentCards;
  if (comments.length > 0) {
    commentCards = comments.map((comment) => {
      return (
        <Card key={comment.id} nohover>
          <p>{comment.username}</p>
          <p>{comment.comment}</p>
        </Card>
      );
    });
  }

  const hideCommentForm = () => {
    setSetShowCommentForm(false);
  };

  // get user rating
  useEffect(() => {
    axios
      .get(`/users/ratings/${props.match.params.id}/${props.userId}`)
      .then((response) => {
        if (response.data[0]) {
          setRating(response.data[0].rating);
        }
      })
      .catch((error) => console.log(error));
  }, [props.match.params.id, props.userId]);

  let userRating = [];
  userRating.push(<p key={'p'}>Your rating</p>);
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      if (rating) {
        userRating.push(
          <Star key={i} onClick={() => updateRating(i + 1)}>
            <FontAwesomeIcon
              icon={['fas', 'star']}
              size="lg"
              style={starStyle}
            />
          </Star>
        );
      } else {
        userRating.push(
          <Star key={i} onClick={() => sendRating(i + 1)}>
            <FontAwesomeIcon
              icon={['fas', 'star']}
              size="lg"
              style={starStyle}
            />
          </Star>
        );
      }
    } else {
      if (rating) {
        userRating.push(
          <Star key={i} onClick={() => updateRating(i + 1)}>
            <FontAwesomeIcon
              icon={['far', 'star']}
              size="lg"
              style={starStyle}
            />
          </Star>
        );
      } else {
        userRating.push(
          <Star key={i} onClick={() => sendRating(i + 1)}>
            <FontAwesomeIcon
              icon={['far', 'star']}
              size="lg"
              style={starStyle}
            />
          </Star>
        );
      }
    }
  }

  if (shop.length > 0) {
    return (
      <Card nohover>
        <h1>{shop[0].name}</h1>
        <ShopRating rating={rating} id={props.match.params.id} />
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
        {commentCards}
        {props.userId ? userRating : null}
        {showCommentForm ? (
          <ShopCommentForm id={props.match.params.id} show={hideCommentForm} />
        ) : (
          <p>Thanks for your thoughts.</p>
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
