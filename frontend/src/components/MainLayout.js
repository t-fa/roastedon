import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import AddShopForm from './AddShopForm';
import ShopThumbnailView from './ShopThumbnailView';

class MainLayout extends Component {
  state = {
    shops: [],
  };
  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={AddShopForm} />
          <Route path="/shops" component={ShopThumbnailView} />
        </Switch>
      </div>
    );
  }
}

export default MainLayout;
