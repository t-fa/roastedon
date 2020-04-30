import React from 'react';

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className="form-control"
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = <textarea {...props.elementConfig} value={props.value} />;
      break;
    default:
      inputElement = <input {...props.elementConfig} value={props.value} />;
  }

  return (
    <div className="form-group">
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
