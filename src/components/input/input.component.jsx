import React from 'react';

import './input.styles.scss';

const Input = ({ isButton, ...otherProps }) => {
  return (
    <div className="group">
      <input
        className={`${isButton ? 'formButton' : ''} form-input overall`}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
