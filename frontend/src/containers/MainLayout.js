import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Navbar';
import HomeLayout from '../components/Home/HomeLayout';
import AddShopForm from './AddShopForm';
import ShopsContainer from './ShopsContainer';
import Shop from './Shop';
import Login from '../components/Auth/Login';
import Logout from '../components/Auth/Logout';
import Register from '../components/Auth/Register';
import Settings from '../components/Account/Settings';

const Container = styled.div`
  margin: 0 auto;
  max-width: 95%;
`;

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
      <Container>
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
          <Route path="/shops/:id" component={Shop} />
          <Route exact path="/account/:id" component={Settings} />
        </Switch>
      </Container>
    </>
  );
};

export default withRouter(MainLayout);
