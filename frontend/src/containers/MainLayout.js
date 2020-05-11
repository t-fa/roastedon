import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from '../components/Header';
import HomeLayout from '../components/Home/HomeLayout';
import AddShopForm from './AddShopForm';
import ShopsContainer from './ShopsContainer';
import Shop from './Shop';

class MainLayout extends Component {
  state = {
    zipcode: '',
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ zipcode: '' });
    this.props.history.push({
      pathname: '/shops',
      search: `?zipcode=${this.state.zipcode}`,
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
          <Route exact path="/shops" component={ShopsContainer} />
          <Route path="/shops/:id" component={Shop} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainLayout);
