import React from 'react';
// import ReactDOM from 'react-dom';
// import reactDom from 'react-dom';
import * as ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const modalSize = {
  default: {
    width: '70%',
    height: '80%',
  },
  full: {
    width: '100%',
    height: '100%',
  },
  success: {
    width: '300px',
    height: '300px',
    backgroundColor: 'transparent',
  },
  confirm: {
    width: '500px',
    height: '200px',
  },
};

function BackDrop(props) {
  const { onClick } = props;
  return <div className={classes.backdrop} onClick={onClick} aria-hidden="true" />;
}
function ModalOverlay(props) {
  const { children, size } = props;
  return (
    <div className={classes.modal} style={{ ...modalSize[size] }}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
function Modal(props) {
  const { onClick, children, size = 'default' } = props;
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClick={onClick} />, document.getElementById('overlays'))}
      {ReactDOM.createPortal(
        <ModalOverlay size={size}>{children}</ModalOverlay>,
        document.getElementById('overlays')
      )}
    </>
  );
}
export default Modal;
