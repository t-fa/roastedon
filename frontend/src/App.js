import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

// components
import MainLayout from './containers/MainLayout';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainLayout />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
