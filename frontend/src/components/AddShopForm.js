import React from 'react';
import axios from 'axios';

import StateDropDown from './StateDropDown.js';
import TextInput from './TextInput';

class AddShopForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        name: {
          value: '',
        },
        address: {
          value: '',
        },
        address2: {
          value: '',
        },
        city: {
          value: '',
        },
        state: {
          value: '',
        },
        zip: {
          value: '',
        },
      },
      shopAdded: false,
    };
    // this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // changeHandler = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   this.setState({
  //     formControls: {
  //       [name]: value,
  //     },
  //   });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  componentDidMount() {
    axios
      .post('http://localhost:3001/shops')
      .then((response) => {
        this.setState({ shopAdded: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
          // value={this.state.formControls.name.value}
          // onChange={this.changeHandler}
        />
        <TextInput
          name="address"
          label="inputaddress"
          labeltext="Address"
          id="shopaddress"
          placeholder="1234 Main St"
          // value={this.state.formControls.address.value}
        />
        <TextInput
          name="address2"
          label="inputaddress2"
          labeltext="Address 2"
          id="shopaddress2"
          placeholder="Apartment, studio, or floor"
          // value={this.state.formControls.address2.value}
        />
        <div className="form-row">
          <TextInput
            divclass="col-md-6"
            name="city"
            label="inputcity"
            labeltext="City"
            id="shopcity"
            placeholder="Pleasantville"
            // value={this.state.formControls.city.value}
          />
          <StateDropDown />
          <TextInput
            divclass="col-md-2"
            name="zip"
            label="inputzip"
            labeltext="Zip"
            id="shopzip"
            placeholder="Zip"
            // value={this.state.formControls.zip.value}
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
