import styled from 'styled-components';
import * as colors from './Colors';

const Button = styled.button`
  background: ${(props) => (props.color ? props.color : colors.primary)};
  border-radius: 3px;
  border: 2px solid ${(props) => (props.color ? props.color : colors.primary)};
  color: white;
  font-size: 1em;
  font-weight: bold;
  margin: 0.5em 0.5em 0.5em;
  padding: 0.25em 1em;
`;

export default Button;
