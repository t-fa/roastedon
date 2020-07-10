import styled from 'styled-components';

const Button = styled.button`
  background: ${(props) => (props.danger ? '#FFD791' : '#cdd1de')};
  border-radius: 3px;
  border: 2px solid ${(props) => (props.danger ? '#FFD791' : '#cdd1de')};
  color: black;
  margin: 0.5em 0.5em 0.5em;
  padding: 0.25em 1em;
`;

export default Button;
