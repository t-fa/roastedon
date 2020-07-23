import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid gainsboro;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;

  &:hover {
    box-shadow: ${(props) => (props.hover ? '0 0 5px grey' : 'none')};
  }
`;

export default Card;
