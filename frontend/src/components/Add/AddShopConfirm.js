import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from '../../styles/Button';
import Card from '../../styles/Card';
import * as colors from '../../styles/Colors';

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
`;

const addShopConfirm = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
    axios
      .post('/shops', {
        name: props.name,
        address1: props.address1,
        address2: props.address2,
        city: props.city,
        state: props.province,
        zipcode: props.zipcode,
        country: props.country,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <H1>Add a new coffee shop</H1>
      <Card nohover>
        <H2>{props.name}</H2>
        {props.address1}
        {props.address2}
        {props.city}, {props.province} {props.zipcode}
        <p>Does this look correct?</p>
        <Button onClick={confirmHandler}>Yes, Submit</Button>
        <Button color={colors.danger} onClick={props.setConfirmFalse}>
          No, Go Back
        </Button>
      </Card>
    </div>
  );
};

export default addShopConfirm;
