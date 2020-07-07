import React from 'react';
import Card from '../UI/Card';

const shopThumbnail = (props) => {
  return (
    <Card>
      <h3>{props.name}</h3>
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
