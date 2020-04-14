import React from 'react';
import axios from 'axios';

import StateDropDown from './StateDropDown.js';
import TextInput from './TextInput';

class AddShopForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state);
    const name = this.state.name;
    const address = this.state.address;
    const address2 = this.state.address2;
    const city = this.state.city;
    const state = this.state.state;
    const zip = this.state.zip;

    axios
      .post('http://localhost:3001/shops', {
        name,
        address,
        address2,
        city,
        state,
        zip,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          name: '',
          address: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add a new coffee shop</h2>
        <TextInput
          name="name"
          label="inputname"
          labeltext="Coffee Shop Name"
          id="shopname"
          placeholder="Coffee Shop Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <TextInput
          name="address"
          label="inputaddress"
          labeltext="Address"
          id="shopaddress"
          placeholder="1234 Main St"
          value={this.state.address}
          onChange={this.handleChange}
        />
        <TextInput
          name="address2"
          label="inputaddress2"
          labeltext="Address 2"
          id="shopaddress2"
          placeholder="Apartment, studio, or floor"
          value={this.state.address2}
          onChange={this.handleChange}
        />
        <div className="form-row">
          <TextInput
            divclass="col-md-6"
            name="city"
            label="inputcity"
            labeltext="City"
            id="shopcity"
            placeholder="Pleasantville"
            value={this.state.city}
            onChange={this.handleChange}
          />
          <StateDropDown
            value={this.state.state}
            onChange={this.handleChange}
          />
          state: {this.state.state}
          <TextInput
            divclass="col-md-2"
            name="zip"
            label="inputzip"
            labeltext="Zip"
            id="shopzip"
            placeholder="Zip"
            value={this.state.zip}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default AddShopForm;
