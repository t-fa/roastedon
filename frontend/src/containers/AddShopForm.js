import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const AddShop = (props) => {
    <Input></Input>
  <Button type="submit">Submit</Button>;
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(AddShop);
