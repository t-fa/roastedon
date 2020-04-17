import React from 'react';

import ShopThumbnailView from './ShopThumbnail';

const shopSearch = () => {
  let renderShops = null;

  if (this.state.shopsFound) {
    renderShops = this.state.shops.map((shop) => {
      return <ShopThumbnailView {...shop} key={shop.id} />;
    });
  }
  return { renderShops };
};

export default shopSearch;
