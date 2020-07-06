import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const navbar = (props) => {
  let loggedIn;
  props.token && props.userId ? (loggedIn = true) : (loggedIn = false);
  return (
    <Box mb={10}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Roasted On
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          {loggedIn && (
            <Button color="inherit" href="/add">
              Add A Shop
            </Button>
          )}
          {loggedIn ? (
            <Button color="inherit" href="/logout">
              Log Out
            </Button>
          ) : (
            <Button color="inherit" href="/auth">
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(navbar);
