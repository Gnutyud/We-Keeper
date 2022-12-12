import React from 'react';
import { ImSpinner11 } from 'react-icons/im';
import styles from './Button.module.scss';

export const Button = (props) => {
  const { name, type, loading, width = '100%' } = props;
  return (
    <button type={type} className={styles.button} style={{ width }} disabled={loading}>
      {loading && <ImSpinner11 className={styles.spinner} />}
      {name}
    </button>
  );
};

export const ButtonWithIcon = (props) => {
  const { name, type, loading, icon, customStyles, ...others } = props;
  return (
    <button
      type={type}
      className={styles.button}
      style={{ width: '100%', ...customStyles }}
      disabled={loading}
      {...others}
    >
      {icon && icon}
      {name}
    </button>
  );
};
