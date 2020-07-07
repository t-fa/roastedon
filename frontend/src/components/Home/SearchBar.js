import React from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';

const searchBar = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>Find a premium coffee shop near you</h2>
      <Input
        label={'Zip Code'}
        placeholder={'Zip Code'}
        name={'zipcode'}
        value={props.zipcode}
        onChange={props.onChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default searchBar;
