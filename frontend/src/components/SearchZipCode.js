import React from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';

class SearchZipCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      shops: [],
    };
    this.getZip = this.getZip.bind(this);
  }

  // componentDidMount() {
  //   axios
  //     .get('http://localhost:3001/')
  //     .then((response) => {
  //       this.setState({ shops: response.data });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  handleChange = (event) => {
    this.setState({ zip: event.target.value });
  };

  getZip(event) {
    this.setState({
      zip: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    axios
      .get('http://localhost:3001/')
      .then((response) => {
        this.setState({ shops: response, zip: '' });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <SearchBar zip={this.state.zip} handleChange={this.handleChange} />;
  }
}

export default SearchZipCode;
