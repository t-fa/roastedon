import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router-dom';

import SearchBar from './SearchBar';
import ShopThumbnailView from './ShopThumbnailView';

class ShopSearch extends Component {
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
    if (this.state.shopsFound === true) {
      return <Redirect to="/shops" />;
    }
    return (
      <p>Please delete me</p>
      // <Switch>
      //   <Route
      //     exact
      //     path="/"
      //     render={(props) => (
      //       <SearchBar
      //         zipcode={this.state.zipcode}
      //         handleChange={this.handleChange}
      //         handleSubmit={this.handleSubmit}
      //       />
      //     )}
      //   />
      //   <Route path="/shops" render={(props) => (ShopThumbnailView
      //   this.state.shops.map(shop => <ShopThumbnailView shopName={shop.name}/>)
      //     )} />
      // </Switch>
      // <SearchBar
      //   zipcode={this.state.zipcode}
      //   handleChange={this.handleChange}
      //   handleSubmit={this.handleSubmit}
      // />
    );
  }
}

export default ShopSearch;
