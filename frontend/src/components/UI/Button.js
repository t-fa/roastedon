import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #cdd1de;
  border-radius: 3px;
  border: 2px solid #cdd1de;
  color: black;
  margin: 0.5em 0em;
  padding: 0.25em 1em;
`;

const button = (props) => {
  return <Button type={props.type}>{props.children}</Button>;
};

export default button;
