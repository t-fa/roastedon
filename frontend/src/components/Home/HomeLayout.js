import React from 'react';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import Info from './Info';
import * as colors from '../../styles/Colors';

const MainSection = styled.section`
  height: 200px;
  background-color: ${colors.alpha};
  width: 100vw;
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

const SubSection = styled(MainSection)`
  background-color: ${colors.beta};
  height: 500px;
`;

const homeLayout = (props) => {
  return (
    <div>
      <MainSection>
        <H1>Find a premium coffee shop near you</H1>
      </MainSection>
      <SearchBar
        zipcode={props.zipcode}
        onChange={props.onChange}
        handleSubmit={props.handleSubmit}
      />
      <SubSection>
        <Info />
      </SubSection>
    </div>
  );
};

export default homeLayout;
