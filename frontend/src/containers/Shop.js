import React, { Component } from 'react';
import axios from 'axios';

class Shop extends Component {
  state = {
    shop: [],
  };

  componentDidMount() {
    axios
      .get(`/shops/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ shop: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.shop.length > 0) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">{this.state.shop[0].name} Name</h1>
            <p>{this.state.shop[0].address1} Shop View!</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card">
          <div className="card-body">
            <p>An error occurred.</p>
          </div>
        </div>
      );
    }
  }
}

export default Shop;
