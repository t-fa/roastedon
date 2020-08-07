import React from 'react';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import Info from './Info';
import * as colors from '../../styles/Colors';

const GraySection = styled.section`
  height: 200px;
  background-color: lightgrey;
  width: 100vw;
  margin-left: -2.6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  color: ${colors.dark};
  background-color: ${colors.light};
  padding: 1.5rem;
  border-radius: 25px;
`;

const YellowSection = styled(GraySection)`
  background-color: peachpuff;
  height: 500px;
`;

const homeLayout = (props) => {
  return (
    <div>
      <GraySection>
        <H1>Find a premium coffee shop near you</H1>
      </GraySection>
      <SearchBar
        zipcode={props.zipcode}
        onChange={props.onChange}
        handleSubmit={props.handleSubmit}
      />
      <YellowSection>
        <Info />
      </YellowSection>
    </div>
  );
};

export default homeLayout;
