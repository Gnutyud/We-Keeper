import React from "react";
import classes from "./Modal.module.scss";
import ReactDOM from "react-dom";
import reactDom from "react-dom";
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <React.Fragment>
      {reactDom.createPortal(
        <BackDrop onClick={props.onClick} />,
        document.getElementById("overlays"),
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays"),
      )}
    </React.Fragment>
  );
};
export default Modal;