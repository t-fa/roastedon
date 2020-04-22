import React from 'react';

import ShopThumbnail from './ShopThumbnail';

const shops = (props) => {
  if (props.shops.length > 0) {
    return props.shops.map((shop) => {
      return <ShopThumbnail {...shop} key={shop.id} />;
    });
  } else {
    return <p>Not found</p>;
  }
};

export default shops;
