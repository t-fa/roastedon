import React, { Component } from 'react';

import SearchBar from './Home/SearchBar';
import ShopThumbnailView from './ShopThumbnailView';

class ShopSearch extends Component {
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
