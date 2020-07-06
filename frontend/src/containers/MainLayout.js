import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Navbar from '../components/Navbar';
import HomeLayout from '../components/Home/HomeLayout';
import AddShopForm from './AddShop';
import ShopsContainer from './ShopsContainer';
import Shop from './Shop';
import Login from './Login';
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
    <Container>
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
        <Route path="/auth" component={Login} />
        <Route
          exact
          path="/shops"
          render={() => <ShopsContainer zipcode={zipCode} />}
        />
        <Route path="/logout" component={Logout} />
        <Route path="/shops/:id" component={Shop} />
      </Switch>
    </Container>
  );
};

export default withRouter(MainLayout);
