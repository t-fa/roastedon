import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Input, Label } from '../styles/Input';
import Button from '../styles/Button';
import AddShopConfirm from '../components/Add/AddShopConfirm';

const Text = styled.h1`
  text-align: center;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 95%;
`;

const AddShopForm = (props) => {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [confirm, setConfirm] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setConfirm(true);
  };

  const setConfirmFalse = () => {
    setConfirm(false);
  };

  if (!props.token) {
    return (
      <Container>
        <p>
          You must be <Link to="/login">logged in</Link> to view this page.
          Don't have an account? Click <Link to="/register">here</Link> to sign
          up.
        </p>
      </Container>
    );
  } else if (!confirm) {
    return (
      <Container>
        <form onSubmit={submitHandler}>
          <Text>Add a new coffee shop</Text>
          {confirm}
          <Label>
            Coffee Shop Name
            <Input
              placeholder={'Coffee Shop Name'}
              name={'name'}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Label>
          <Label>
            Address Line 1
            <Input
              placeholder={'1234 Main St'}
              name={'address1'}
              value={address1}
              onChange={(event) => setAddress1(event.target.value)}
            />
          </Label>
          <Label>
            Address Line 2
            <Input
              placeholder={'Apartment, studio, or floor'}
              name={'address2'}
              value={address2}
              onChange={(event) => setAddress2(event.target.value)}
            />
          </Label>
          <Label>
            City
            <Input
              placeholder={'City'}
              name={'city'}
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </Label>
          <Label>
            State or Province
            <Input
              placeholder={'State or Province'}
              name={'state'}
              value={province}
              onChange={(event) => setProvince(event.target.value)}
            />
          </Label>
          <Label>
            Zip Code
            <Input
              placeholder={'Zip'}
              name={'zipcode'}
              value={zipcode}
              onChange={(event) => setZipCode(event.target.value)}
            />
          </Label>
          <Label>
            Country
            <Input
              placeholder={'Country'}
              name={'country'}
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </Label>
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    );
  } else {
    return (
      <Container>
        <AddShopConfirm
          name={name}
          address1={address1}
          address2={address2}
          city={city}
          province={province}
          zipcode={zipcode}
          country={country}
          setConfirmFalse={setConfirmFalse}
        />
      </Container>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(AddShopForm);
