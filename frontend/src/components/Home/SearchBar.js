import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Button from '../../styles/Button';
import { Input, Label, Span } from '../../styles/Input';
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

const SearchBar = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    history.push({
      pathname: '/shops',
      search: `?zipcode=${data.zipcode}`,
    });
  };

  return (
    <Div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          <Search
            placeholder={'Enter a zip code to get started'}
            name={'zipcode'}
            onChange={props.onChange}
            ref={register({
              required: {
                value: true,
                message: <Span>This field is required.</Span>,
              },
              minLength: {
                value: 2,
                message: <Span>Please enter at least 2 characters.</Span>,
              },
              maxLength: {
                value: 12,
                message: <Span>Please enter at most 12 characters.</Span>,
              },
              pattern: {
                value: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/,
                message: <Span>Please enter a valid zipcode.</Span>,
              },
            })}
          />
        </Label>
        {errors?.zipcode?.message}
        <Button type="submit">Submit</Button>
      </form>
    </Div>
  );
};

export default SearchBar;
