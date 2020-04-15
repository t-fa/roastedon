import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import AddShopForm from './AddShopForm';
import ShopThumbnailView from './ShopThumbnailView';

function MainLayout() {
  return (
    <div className="container">
      <Header />
      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddShopForm} />
      </Switch> */}
      <ShopThumbnailView shopname="Lamplighter" />
    </div>
  );
}

export default MainLayout;
