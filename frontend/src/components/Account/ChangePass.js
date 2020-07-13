import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import * as colors from '../../styles/Colors';
import Card from '../../styles/Card';
import Button from '../../styles/Button';
import { Label, Input, Span } from '../../styles/Input';

const Text = styled.h1`
  text-align: center;
`;

const ChangePass = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Card nohover>
      <Text>Change Password</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Current Password
          <Input
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            ref={register({ required: true })}
          />
          {errors.currentPassword && <Span>This field is required.</Span>}
        </Label>
        <Label>
          New Password
          <Input
            type="password"
            placeholder="New Password"
            name="newPassword"
            ref={register({ required: true })}
          />
          {errors.newPassword && <Span>This field is required.</Span>}
        </Label>
        <Label>
          Confirm Password
          <Input
            type="password"
            placeholder="Confirm Password"
            name="password"
            ref={register({ required: true })}
          />
          {errors.password && <Span>This field is required.</Span>}
        </Label>
        <Button type="submit">Submit</Button>
        <Button color={colors.danger} onClick={reset}>
          Reset
        </Button>
      </form>
    </Card>
  );
};

export default ChangePass;
