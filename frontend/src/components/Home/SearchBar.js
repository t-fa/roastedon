import React from 'react';
import Button from '../../styles/Button';
import { Input, Label } from '../../styles/Input';

const searchBar = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>Find a premium coffee shop near you</h2>
      <Label>
        Zip Code
        <Input
          placeholder={'Zip Code'}
          name={'zipcode'}
          value={props.zipcode}
          onChange={props.onChange}
        />
      </Label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default searchBar;
