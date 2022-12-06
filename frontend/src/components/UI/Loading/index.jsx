import Lottie from 'lottie-react';
import React from 'react';
import blueLoading from '../../../lottie/blue-loading.json';

const Loading = ({ styles }) => {
  const defaultStyles = {
    height: '100vh',
    overflow: 'hidden',
  };
  return <Lottie animationData={blueLoading} loop style={{ ...defaultStyles, ...styles }} />;
};

export default Loading;
