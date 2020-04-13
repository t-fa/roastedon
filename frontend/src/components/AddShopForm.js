import React from 'react';
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
    };
  }
  render() {
    return (
      <form>
        <h2>Add a new coffee shop</h2>
        <TextInput
          name="name"
          label="inputname"
          labeltext="Coffee Shop Name"
          id="shopname"
          placeholder="Coffee Shop Name"
        />
        <TextInput
          name="address"
          label="inputaddress"
          labeltext="Address"
          id="shopaddress"
          placeholder="1234 Main St"
        />
        <TextInput
          name="address2"
          label="inputaddress2"
          labeltext="Address 2"
          id="shopaddress2"
          placeholder="Apartment, studio, or floor"
        />
        <div className="form-row">
          <TextInput
            divclass="col-md-6"
            name="city"
            label="inputcity"
            labeltext="City"
            id="shopcity"
            placeholder="Pleasantville"
          />
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <TextInput
            divclass="col-md-2"
            name="zip"
            label="inputzip"
            labeltext="Zip"
            id="shopzip"
            placeholder="Zip"
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
