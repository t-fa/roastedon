import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import SearchBar from './SearchBar';

class ShopSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      shops: [],
      shopsFound: false,
    };
  }

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
      <>
        <SearchBar
          zipcode={this.state.zipcode}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {console.log(this.state.shops)}
      </>
    );
  }
}

export default ShopSearch;
