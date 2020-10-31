import React from 'react';
// import { useForm } from 'react-hook-form';

import './input.styles.scss';

const Input = ({ isButton, name, type, value, disabled, ...otherProps }) => {
  // const { register, handleSubmit, watch, errors } = useForm();
  return (
    <div className="group">
      {isButton ? (
        <button
          disabled={disabled}
          type={type}
          name={name}
          className={`${isButton ? 'formButton' : ''} ${
            disabled ? 'buttonDisabled ' : null
          } form-input overall`}
          {...otherProps}
        >
          {value}
        </button>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          className="form-input overall"
          {...otherProps}
          // ref={register({ required: true, maxLength: 10 })}
        />
      )}
      {/* {errors.name && <span>This field is required</span>} */}
    </div>
  );
};

export default Input;
