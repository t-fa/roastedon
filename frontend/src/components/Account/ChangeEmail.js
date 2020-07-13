import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import * as colors from '../../styles/Colors';
import Card from '../../styles/Card';
import Button from '../../styles/Button';
import { Label, Input, Span } from '../../styles/Input';

export const Text = styled.h1`
  text-align: center;
`;

const ChangeEmail = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Card nohover>
      <Text>Change Email</Text>
      <form onClick={handleSubmit(onSubmit)}>
        <Label>
          Current Email
          <Input
            type="email"
            placeholder="Current Email Address"
            name="currEmail"
            ref={register({ required: true })}
          />
        </Label>
        {errors.currEmail && <Span>This field is required.</Span>}
        <Label>
          New Email
          <Input
            type="email"
            placeholder="New Email Address"
            name="email"
            ref={register({ required: true })}
          />
        </Label>
        {errors.email && <Span>This field is required.</Span>}
        <Button>Submit</Button>
        <Button color={colors.danger} onClick={reset}>
          Reset
        </Button>
      </form>
    </Card>
  );
};

export default ChangeEmail;
