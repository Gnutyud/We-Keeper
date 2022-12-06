import React from 'react';
import Modal from '../Modal';
import classes from './ConfirmModal.module.scss';

const ConfirmModal = (props) => {
  const { onClose, onConfirm, message = 'Are you sure to do this?', title = 'Confirm !!!' } = props;

  return (
    <Modal onClick={onClose} size="confirm">
      <div className={classes.confirmModal}>
        <div className={classes.content}>
          <h3 className={classes.title}>{title}</h3>
          <p className={classes.message}>{message}</p>
        </div>
        <div className={classes.handleButton}>
          <button className={classes.confirmBtn} onClick={onConfirm}>
            Ok
          </button>
          <button className={classes.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
