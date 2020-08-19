import React from 'react';
import styled from 'styled-components';

import Button from '../../styles/Button';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
`;

const ModalDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  border: 1px solid grey;
  border-radius: 20px;
  box-shadow: 0 0 5px grey;
  padding: 20px;
  background: white;
  transform: translate(-50%, -50%);
`;

const Modal = (props) => {
  return (
    <Backdrop>
      <ModalDiv>
        <p>{props.text}</p>
        <Button onClick={props.click}>Got it</Button>
      </ModalDiv>
    </Backdrop>
  );
};

export default Modal;
