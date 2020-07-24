import React from 'react';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import Info from './Info';

const Div = styled.div`
  margin-top: 100px;
`;

const homeLayout = (props) => {
  return (
    <Div>
      <SearchBar
        zipcode={props.zipcode}
        onChange={props.onChange}
        handleSubmit={props.handleSubmit}
      />
      <Info />
    </Div>
  );
};

export default homeLayout;
