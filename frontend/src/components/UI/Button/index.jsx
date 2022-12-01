import React from 'react';
import { ImSpinner11 } from 'react-icons/im';
import styles from './Button.module.scss';

function Button(props) {
  const { name, type, loading, width = '100%' } = props;
  return (
    <button type={type} className={styles.button} style={{ width }} disabled={loading}>
      {loading && <ImSpinner11 className={styles.spinner} />}
      {name}
    </button>
  );
}

export default Button;
