import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from './Header';
import HomeLayout from './Home/HomeLayout';
import AddShopForm from './Add/AddShopForm';
import ShopsContainer from './Shops/ShopsContainer';

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
          <Route path="/shops" component={ShopsContainer} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainLayout);
