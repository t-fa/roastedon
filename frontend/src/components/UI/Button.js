import React from 'react';

const button = (props) => {
  return (
    <button type="submit" className="btn btn-primary" disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default button;
