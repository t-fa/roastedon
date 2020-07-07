import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #9c6615;
  border-radius: 3px;
  border: 2px solid #9c6615;
  color: black;
  margin: 0.5em 0em;
  padding: 0.25em 1em;
`;

const button = (props) => {
  return <Button type={props.type}>{props.children}</Button>;
};

export default button;
