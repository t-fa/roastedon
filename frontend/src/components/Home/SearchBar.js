import React from 'react';
import styled from 'styled-components';

import Button from '../../styles/Button';
import { Input, Label } from '../../styles/Input';
import * as colors from '../../styles/Colors';

const Div = styled.div`
  padding-top: 25px;
  height: 200px;
  margin: 0 auto;
  max-width: 95%;
`;

const Search = styled(Input)`
  height: 3rem;
  border-radius: 15px;
  border: 2px solid ${colors.alpha};
  color: black;
`;

const searchBar = (props) => {
  return (
    <Div>
      <form onSubmit={props.handleSubmit}>
        <Label>
          <Search
            placeholder={'Enter a zip code to get started'}
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
