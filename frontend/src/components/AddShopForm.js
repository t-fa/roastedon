import React from 'react';
import axios from 'axios';
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
      <form>
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
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control" name="state">
              <option selected>Choose...</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
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
