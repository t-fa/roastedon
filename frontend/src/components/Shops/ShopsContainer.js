import React, { Component } from 'react';

import ShopThumbnail from './ShopThumbnail';

class ShopsContainer extends Component {
  state = {
    shops: []
  }
  if (props.shops.length > 0) {
    props.shops.map((shop) => {
      return <ShopThumbnail {...shop} key={shop.id} />;
    });
  } else {
    return <p>Not found</p>;
  }
};

export default ShopsContainer;
