import React, { Component } from 'react';
import axios from 'axios';

class Shop extends Component {
  state = {
    shops: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3001/shops/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ shops: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.shops.name}</h1>
        <p>{this.state.shops.address1} Shop View!</p>
      </div>
    );
  }
}

export default Shop;
