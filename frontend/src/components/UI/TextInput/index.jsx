import React from 'react';
import styles from './TextInput.module.scss';

const TextInput = (props) => {
  const { fieldName, id, name, value, handleChange, error, placeholder, ...others } = props;
  return (
    <div className={styles.textInput}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={id}>
        <b>{fieldName}</b>
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        /* eslint-disable react/jsx-props-no-spreading */
        {...others}
      />
      <p>{error}</p>
    </div>
  );
};

export default TextInput;
