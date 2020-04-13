import React from 'react';

function TextInput(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.label}>{props.labeltext}</label>
      <input type="text" className="form-control" {...props} />
    </div>
  );
}

export default TextInput;
