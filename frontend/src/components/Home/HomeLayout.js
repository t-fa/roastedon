import React from 'react';

import SearchBar from './SearchBar';
import Info from './Info';

const homeLayout = (props) => {
  return (
    <>
      <SearchBar
        zipcode={props.zipcode}
        onChange={props.onChange}
        handleSubmit={props.handleSubmit}
      />
      <Info />
    </>
  );
};

export default homeLayout;
