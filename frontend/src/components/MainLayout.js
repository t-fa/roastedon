import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import AddShopForm from './AddShopForm';
import ShopThumbnailView from './ShopThumbnailView';

class MainLayout extends Component {
  state = {
    zipcode: '',
    shops: [],
    shopsFound: false,
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:3001/?zipcode=${this.state.zipcode}`)
      .then((response) => {
        this.setState({ shops: response.data, zipcode: '', shopsFound: true });
      })
      .catch((error) => {
        console.log(error);
      });
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
