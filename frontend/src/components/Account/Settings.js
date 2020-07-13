import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ChangeEmail from './ChangeEmail';
import ChangePass from './ChangePass';

const Settings = (props) => {
  if (!props.token) {
    return (
      <p>
        You must be <Link to="/login">logged in</Link> to view this page. Don't
        have an account? Click <Link to="/register">here</Link> to sign up.
      </p>
    );
  } else {
    return (
      <div>
        <ChangePass />
        <ChangeEmail />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Settings);
