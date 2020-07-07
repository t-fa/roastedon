import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: #495057;
  font-size: 1rem;
  font-weight: 400;
  min-height: 1rem;
  margin: 0.25rem 0rem;
  padding: 0.375rem 0.75rem;
  box-sizing: border-box;
  width: 100%;
  display: block;
`;

const Label = styled.label`
  margin: 0.375rem 0.75rem;
`;

const input = (props) => {
  let type;

  props.type ? (type = props.type) : (type = 'text');

  return (
    <Label>
      {props.label}
      <Input
        type={type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </Label>
  );
};

export default input;
