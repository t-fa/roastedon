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
    case 'select':
      inputElement = (
        <select className="form-control" value={props.value}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
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
