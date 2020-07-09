import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid gainsboro;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;

  &:hover {
    box-shadow: 0 0 5px grey;
  }
`;

const card = (props) => {
  return <Card>{props.children}</Card>;
};

export default card;
