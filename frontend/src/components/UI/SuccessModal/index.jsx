import Lottie from 'lottie-react';
import React from 'react';
import successAnimation from '../../../lottie/success.json';
import Modal from '../Modal';

const SuccessAnimation = ({ styles }) => {
  const defaultStyles = {
    height: '100%',
    overflow: 'hidden',
  };
  return <Lottie animationData={successAnimation} loop style={{ ...defaultStyles, ...styles }} />;
};

const SuccessModal = ({ duration = 1000, onClose }) => {
  setTimeout(() => {
    onClose();
  }, duration);

  return (
    <Modal onClick={onClose} size="success">
      <SuccessAnimation />
    </Modal>
  );
};

export default SuccessModal;
