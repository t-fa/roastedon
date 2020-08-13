import React from 'react';
import styled from 'styled-components';

import Button from '../../styles/Button';
import { Input, Label } from '../../styles/Input';

const Div = styled.div`
  padding-top: 25px;
  height: 200px;
  margin: 0 auto;
  max-width: 95%;
`;

const searchBar = (props) => {
  return (
    <Div>
      <form onSubmit={props.handleSubmit}>
        <Label>
          <Input
            placeholder={'Zip Code'}
            name={'zipcode'}
            value={props.zipcode}
            onChange={props.onChange}
          />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    </Div>
  );
};

export default searchBar;
