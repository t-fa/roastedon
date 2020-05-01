import React, { Component } from 'react';
import axios from 'axios';

import Input from '../UI/Input';

class AddShopForm extends Component {
  state = {
    addForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Coffee Shop Name',
        },
        value: '',
      },
      address1: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '1234 Main St',
        },
        value: '',
      },
      address2: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Apartment, studio, or floor',
        },
        value: '',
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City',
        },
        value: '',
      },
      state: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'New York', displayValue: 'New York' },
            { value: 'Virginia', displayValue: 'Virginia' },
          ],
        },
        value: '',
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip',
        },
        value: '',
      },
    },
  };

  handleChange = (event, inputIdentifier) => {
    // this will not create a deep copy of the nested objects
    const updatedAddForm = {
      ...this.state.addForm,
    };
    // copies nested objects - works because we don't need to modify elementConfig
    const updatedAddFormElement = {
      ...updatedAddForm[inputIdentifier],
    };
    updatedAddFormElement.value = event.target.value;
    updatedAddForm[inputIdentifier] = updatedAddFormElement;
    this.setState({
      addForm: updatedAddForm,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const name = this.state.addForm.name.value;
    const address1 = this.state.addForm.address1.value;
    const address2 = this.state.addForm.address2.value;
    const city = this.state.addForm.city.value;
    const state = this.state.addForm.state.value;
    const zipcode = this.state.addForm.zipcode.value;

    axios
      .post('http://localhost:3001/shops', {
        name,
        address1,
        address2,
        city,
        state,
        zipcode,
      })
      .then((response) => {
        console.log(response);

        this.setState({
          name: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          zipcode: '',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.addForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addForm[key],
      });
    }
    let form = (
      <form onSubmit={this.handleSubmit}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            changed={(event) => this.handleChange(event, formElement.id)}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );

    return (
      <div>
        <h2>Add a new coffee shop</h2>

        {form}
      </div>
    );
  }
}

export default AddShopForm;
