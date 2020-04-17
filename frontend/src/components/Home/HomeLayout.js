import React from 'react';

import SearchBar from './SearchBar';
import Info from './Info';

const homeLayout = (props) => {
  return (
    <>
      <SearchBar
        zipcode={props.zipcode}
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
      />
      <Info />
    </>
  );
};

export default homeLayout;
