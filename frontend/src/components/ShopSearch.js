import React from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';

class ShopSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      shops: [],
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
        this.setState({ shops: response.data, zipcode: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
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
