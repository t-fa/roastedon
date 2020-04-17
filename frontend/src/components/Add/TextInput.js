import React from 'react';

const textInput = (props) => {
  return (
    <div className={`form-group ${props.divclass}`}>
      <label htmlFor={props.label}>{props.labeltext}</label>
      <input type="text" className="form-control" {...props} />
    </div>
  );
};

export default textInput;
