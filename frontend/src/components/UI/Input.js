import React from 'react';

const input = (props) => {
  let inputElement = null;
  const inputClasses = ['form-control'];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('is-invalid');
  }
  // else {
  //   inputClasses.push('is-valid');
  // }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          onChange={props.changed}
          className={inputClasses.join(' ')}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
          className={inputClasses.join(' ')}
        />
      );
  }

  return (
    <div className="form-group">
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
