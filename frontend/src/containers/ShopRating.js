import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import axios from 'axios';

const starStyle = {
  color: 'gold',
  stroke: 'darkgoldenrod',
  strokeWidth: '10',
  padding: '0 4px',
};

const Caption = styled.p`
  color: gray;
  font-size: 0.75rem;
`;

const ShopRating = (props) => {
  const [avgRating, setAvgRating] = useState('');

  // get avg rating
  useEffect(() => {
    axios
      .get(`/users/ratings/${props.id}`)
      .then((response) => {
        setAvgRating(response.data[0]['AVG(rating)']);
      })
      .catch((error) => console.log(error));
  }, [props.rating, props.id]);

  let avgNumStars = [];
  for (let i = 0; i < 5; i++) {
    if (i < avgRating) {
      avgNumStars.push(
        <FontAwesomeIcon
          key={i}
          icon={['fas', 'star']}
          size="lg"
          style={starStyle}
        />
      );
    } else {
      avgNumStars.push(
        <FontAwesomeIcon
          key={i}
          icon={['far', 'star']}
          size="lg"
          style={starStyle}
        />
      );
    }
  }

  return (
    <div>
      {avgNumStars}
      {avgRating ? (
        <Caption>({avgRating} out of 5 stars)</Caption>
      ) : (
        <Caption>No reviews</Caption>
      )}
    </div>
  );
};

export default ShopRating;
