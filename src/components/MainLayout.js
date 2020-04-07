import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Add from './Add';

function MainLayout() {
  return (
    <div class="container">
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/add" component={Add} />
      </Switch>
    </div>
  );
}

export default MainLayout;
