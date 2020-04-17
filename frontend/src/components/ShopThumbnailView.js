import React from 'react';

const shopThumbnailView = (props) => {
  return (
    <div className="shopthumbnailview container border rounded-lg p-3">
      <h4>{props.name}</h4>
      <ul>
        <li>Address: {props.address1}</li>
        <li>Apt: {props.address2}</li>
        <li>Zip: {props.zipcode}</li>
        <li>City: {props.city}</li>
        <li>State: {props.state}</li>
      </ul>
    </div>
  );
};

export default shopThumbnailView;
