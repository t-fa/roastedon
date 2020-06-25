import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/actions/auth';
import { Redirect } from 'react-router-dom';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

class Auth extends Component {
  state = {
    controls: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'type',
          placeholder: 'Username',
        },
        value: '',
        validation: {
          required: true,
          isEmail: false,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
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
    const updatedAuthForm = {
      ...this.state.controls,
    };
    // copies nested objects - works because we don't need to modify elementConfig
    const updatedAuthFormElement = {
      ...updatedAuthForm[inputIdentifier],
    };
    updatedAuthFormElement.value = event.target.value;
    updatedAuthFormElement.valid = this.checkValidity(
      updatedAuthFormElement.value,
      updatedAuthFormElement.validation
    );
    updatedAuthFormElement.touched = true;
    updatedAuthForm[inputIdentifier] = updatedAuthFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedAuthForm) {
      formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      controls: updatedAuthForm,
      formIsValid: formIsValid,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.username.value,
      this.state.controls.password.value
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
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
    ));

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      return (authRedirect = <Redirect to="/" />);
    }

    return (
      <div>
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button disabled={!this.state.formIsValid}>Log In</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(auth(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
