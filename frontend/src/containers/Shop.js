import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shop = (props) => {
  const [shop, setShop] = useState([]);

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
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{shop[0].name} Name</h1>
          <p>{shop[0].address1} Shop View!</p>
        </div>
      </div>
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

export default Shop;
