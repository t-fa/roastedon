import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Navbar from './Navbar';
import HomeLayout from '../components/Home/HomeLayout';
import AddShopForm from './AddShopForm';
import ShopsContainer from './ShopsContainer';
import ShopView from './ShopView';
import Login from '../components/Auth/Login';
import Logout from '../components/Auth/Logout';
import Register from '../components/Auth/Register';
import Settings from '../components/Account/Settings';
import Favorites from './Favorites';
import Error404 from '../components/Errors/404';

const MainLayout = (props) => {
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.history.push({
      pathname: '/shops',
    });
  };

  return (
    <>
      <Navbar />
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
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          exact
          path="/shops"
          render={() => <ShopsContainer zipcode={zipCode} />}
        />
        <Route path="/logout" component={Logout} />
        <Route path="/shops/:id" component={ShopView} />
        <Route exact path="/account" component={Settings} />
        <Route exact path="/favorites" component={Favorites} />
        <Route component={Error404} />
      </Switch>
    </>
  );
};

export default withRouter(MainLayout);
