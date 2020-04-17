import React from 'react';

import ShopThumbnail from './ShopThumbnail';

const shopSearch = (props) => {
  let renderShops = null;

  renderShops = props.shops.map((shop) => {
    return <ShopThumbnail {...shop} key={shop.id} />;
  });

  return <div>{renderShops}</div>;
};

export default shopSearch;
