import React from 'react';
import Lottie from 'lottie-react';
import blueLoading from '../../../lottie/blue-loading.json';

const Loading = () => {
  const styles = {
    height: '100vh',
    overflow: 'hidden',
  };
  return <Lottie animationData={blueLoading} loop style={styles} />;
};

export default Loading;
