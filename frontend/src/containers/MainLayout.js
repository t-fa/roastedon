import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from '../components/Header';
import HomeLayout from '../components/Home/HomeLayout';
import AddShopForm from './AddShopForm';
import ShopsContainer from './ShopsContainer';
import Shop from './Shop';
import Auth from './Auth';
import Logout from '../components/Auth/Logout';

const MainLayout = (props) => {
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.history.push({
      pathname: '/shops',
    });
  };

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomeLayout
              zipcode={zipCode}
              onChange={(event) => setZipCode(event.target.value)}
              handleSubmit={handleSubmit}
            />
          )}
        />
        <Route path="/add" component={AddShopForm} />
        <Route path="/auth" component={Auth} />
        <Route
          exact
          path="/shops"
          render={() => <ShopsContainer zipcode={zipCode} />}
        />
        <Route path="/logout" component={Logout} />
        <Route path="/shops/:id" component={Shop} />
      </Switch>
    </div>
  );
};

export default withRouter(MainLayout);
