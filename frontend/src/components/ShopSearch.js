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
    let renderShops = null;

    if (this.state.shopsFound) {
      renderShops = this.state.shops.map((shop) => {
        return <ShopThumbnailView {...shop} key={shop.id} />;
      });
    }
    return (
      <>
        <SearchBar
          zipcode={this.state.zipcode}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {renderShops}
      </>
      // <Switch>
      //   <Route
      //     exact
      //     path="/"
      //     render={() => (
      //       <SearchBar
      //         zipcode={this.state.zipcode}
      //         handleChange={this.handleChange}
      //         handleSubmit={this.handleSubmit}
      //       />
      //     )}
      //   />
      //   {renderShops}
      // </Switch>
    );
  }
}

export default ShopSearch;
