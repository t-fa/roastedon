import React from 'react';
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
import ResetPass from '../components/Account/ResetPass';
import Error404 from '../components/Errors/404';

const MainLayout = (props) => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <HomeLayout />} />
        <Route path="/add" component={AddShopForm} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/shops" render={() => <ShopsContainer />} />
        <Route path="/logout" component={Logout} />
        <Route path="/shops/:id" component={ShopView} />
        <Route path="/account" component={Settings} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/reset" component={ResetPass} />
        <Route component={Error404} />
      </Switch>
    </>
  );
};

export default withRouter(MainLayout);
