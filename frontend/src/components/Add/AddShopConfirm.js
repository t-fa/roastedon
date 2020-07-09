import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
`;

const Button = styled.button`
  background: ${(props) => (props.danger ? '#FFD791' : '#cdd1de')};
  border-radius: 3px;
  border: 2px solid ${(props) => (props.danger ? '#FFD791' : '#cdd1de')};
  color: black;
  margin: 0.5em 0.5em 0.5em;
  padding: 0.25em 1em;
`;

const Card = styled.div`
  border: 1px solid gainsboro;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
`;

const addShopConfirm = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        '/shops',
        props.name,
        props.address1,
        props.address2,
        props.city,
        props.province,
        props.zipcode
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <H1>Add a new coffee shop</H1>
      <Card>
        <H2>{props.name}</H2>
        {props.address1}
        {props.address2}
        {props.city}, {props.province} {props.zipcode}
        <p>Does this look correct?</p>
        <Button onClick={confirmHandler}>Yes, Submit</Button>
        <Button danger onClick={props.setConfirmFalse}>
          No, Go Back
        </Button>
      </Card>
    </div>
  );
};

export default addShopConfirm;
