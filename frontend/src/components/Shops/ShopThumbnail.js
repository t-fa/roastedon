import React from 'react';
import Card from '../../styles/Card';
import ShopRating from '../../containers/ShopRating';

const shopThumbnail = (props) => {
  return (
    <Card hover>
      <h3>{props.name}</h3>
      <ShopRating id={props.id} />
      <p>
        {props.address1} {props.address2}
      </p>
      <p>
        {props.city}, {props.state} {props.zipcode}
      </p>
      <p>{props.phone}</p>
    </Card>
  );
};

export default shopThumbnail;
