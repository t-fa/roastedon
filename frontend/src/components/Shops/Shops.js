import React from 'react';
import { Link } from 'react-router-dom';

import ShopThumbnail from './ShopThumbnail';

const shops = (props) => {
  if (props.shops.length > 0) {
    return props.shops.map((shop) => {
      return (
        <Link to={'/shops/' + shop.id}>
          <ShopThumbnail {...shop} key={shop.id} />
        </Link>
      );
    });
  } else {
    return <p>Not found</p>;
  }
};

export default shops;
