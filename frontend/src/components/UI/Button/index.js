import styles from './Button.module.scss';

const Button = (props) => {
  return (
    <button type={props.type} className={styles.button}>
      {props.name}
    </button>
  );
};

export default Button;