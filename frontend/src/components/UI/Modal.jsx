import React from 'react';
// import ReactDOM from 'react-dom';
// import reactDom from 'react-dom';
import * as ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

function BackDrop(props) {
  const { onClick } = props;
  return <div className={classes.backdrop} onClick={onClick} aria-hidden="true" />;
}
function ModalOverlay(props) {
  const { children } = props;
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
function Modal(props) {
  const { onClick, children } = props;
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClick={onClick} />, document.getElementById('overlays'))}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, document.getElementById('overlays'))}
    </>
  );
}
export default Modal;
