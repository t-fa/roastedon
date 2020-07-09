import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/UI/Card';

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
      <Card hover>
        <h1>{shop[0].name}</h1>
        <p>{shop[0].address1}</p>
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

export default Shop;
