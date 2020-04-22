import React, { Component } from 'react';
import axios from 'axios';

import Shops from './Shops';

class ShopsContainer extends Component {
  state = {
    shops: [],
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const zipcode = params.get('zipcode');

    axios
      .get(`http://localhost:3001/shops?zipcode=${zipcode}`)
      .then((response) => {
        this.setState({ shops: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <Shops shops={this.state.shops} />;
  }
}

export default ShopsContainer;
