import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import HomeLayout from './Home/HomeLayout';
import AddShopForm from './Add/AddShopForm';
import ShopSearch from './Shops/ShopSearch';

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
    if (this.state.shopsFound) {
      return <Redirect to="/shops" />;
    }

    return (
      <div className="container">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomeLayout
                zipcode={this.state.zipcode}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            )}
          />
          <Route path="/add" component={AddShopForm} />
          <Route
            path="/shops"
            render={() => <ShopSearch shops={this.state.shops} />}
          />
        </Switch>
      </div>
    );
  }
}

export default MainLayout;
