import React, { Component } from 'react';
import axios from 'axios';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address1: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '1234 Main St',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address2: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Apartment, studio, or floor',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
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
        validation: {
          required: false,
        },
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

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
    updatedAddFormElement.valid = this.checkValidity(
      updatedAddFormElement.value,
      updatedAddFormElement.validation
    );
    updatedAddFormElement.touched = true;
    updatedAddForm[inputIdentifier] = updatedAddFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedAddForm) {
      formIsValid = updatedAddForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      addForm: updatedAddForm,
      formIsValid: formIsValid,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // copy state value data into single object
    const formData = {};
    for (let formElement in this.state.addForm) {
      formData[formElement] = this.state.addForm[formElement].value;
    }

    const updatedAddForm = { ...this.state.addForm };

    axios
      .post('http://localhost:3001/shops', formData)
      .then((response) => {
        console.log(response);

        // clear updatedAddForm
        for (let formElement in updatedAddForm) {
          updatedAddForm[formElement].value = '';
        }

        this.setState({
          addForm: updatedAddForm,
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
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation.required}
            touched={formElement.config.touched}
            value={formElement.config.value}
          />
        ))}
        <Button disabled={!this.state.formIsValid}>Submit</Button>
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
