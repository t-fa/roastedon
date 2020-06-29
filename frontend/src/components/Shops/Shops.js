import React from 'react';
import { Link, Route, withRouter, Switch } from 'react-router-dom';

import ShopThumbnail from './ShopThumbnail';
import Shop from '../../containers/Shop';

const shops = (props) => {
  if (props.shops.shops.length > 0) {
    return props.shops.shops.map((shop) => {
      return (
        <Switch>
          <Route
            path={props.match.url + '/:id'}
            render={() => <Shop {...shop} />}
          />
          <Link to={props.match.url + '/' + shop.id}>
            <ShopThumbnail {...shop} key={shop.id} />
          </Link>
        </Switch>
      );
    });
  } else {
    return <p>Not found</p>;
  }
};

export default withRouter(shops);
