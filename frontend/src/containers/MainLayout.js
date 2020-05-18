import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from '../components/Header';
import HomeLayout from '../components/Home/HomeLayout';
import AddShopForm from './AddShopForm';
import ShopsContainer from './ShopsContainer';
import Shop from './Shop';
import Auth from './Auth';

class MainLayout extends Component {
  state = {
    zipcode: '',
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/shops',
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomeLayout
                zipcode={this.state.zipcode}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            )}
          />
          <Route path="/add" component={AddShopForm} />
          <Route path="/auth" component={Auth} />
          <Route
            exact
            path="/shops"
            render={() => <ShopsContainer zipcode={this.state.zipcode} />}
          />
          <Route path="/shops/:id" component={Shop} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainLayout);
