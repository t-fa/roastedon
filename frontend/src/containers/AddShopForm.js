import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import AddShopConfirm from '../components/Add/AddShopConfirm';

const Text = styled.h1`
  text-align: center;
`;

const AddShopForm = (props) => {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [confirm, setConfirm] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setConfirm(true);
  };

  const setConfirmFalse = () => {
    setConfirm(false);
  };

  if (!props.token) {
    return 'You must be logged in to view this page.';
  } else if (!confirm) {
    return (
      <form onSubmit={submitHandler}>
        <Text>Add a new coffee shop</Text>
        {confirm}
        <Input
          label={'Coffee Shop Name'}
          placeholder={'Coffee Shop Name'}
          name={'name'}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          label={'Address Line 1'}
          placeholder={'1234 Main St'}
          name={'address1'}
          value={address1}
          onChange={(event) => setAddress1(event.target.value)}
        />
        <Input
          label={'Address Line 2'}
          placeholder={'Apartment, studio, or floor'}
          name={'address2'}
          value={address2}
          onChange={(event) => setAddress2(event.target.value)}
        />
        <Input
          label={'City'}
          placeholder={'City'}
          name={'city'}
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <Input
          label={'State or Province'}
          placeholder={'State or Province'}
          name={'state'}
          value={province}
          onChange={(event) => setProvince(event.target.value)}
        />
        <Input
          label={'Zip Code'}
          placeholder={'Zip'}
          name={'zipcode'}
          value={zipcode}
          onChange={(event) => setZipCode(event.target.value)}
        />
        {/* <Input
          label={'Country'}
          placeholder={'Country'}
          name={'country'}
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    );
  } else {
    return (
      <AddShopConfirm
        name={name}
        address1={address1}
        address2={address2}
        city={city}
        province={province}
        zipcode={zipcode}
        setConfirmFalse={setConfirmFalse}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(AddShopForm);
