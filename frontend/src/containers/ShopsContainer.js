import React, { Component } from 'react';
import axios from 'axios';

import Shops from '../components/Shops/Shops';

class ShopsContainer extends Component {
  state = {
    shops: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3001/shops?zipcode=${this.props.zipcode}`)
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
