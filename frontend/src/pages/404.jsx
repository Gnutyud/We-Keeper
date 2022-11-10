import React from 'react';
import Lottie from 'lottie-react';
import NotFound from '../lottie/404.json';

const PageNotFound = () => {
  const styles = {
    height: '100vh',
    overflow: 'hidden',
  };
  return (
      <Lottie animationData={NotFound} loop={true} style={styles} />
  );
};

export default PageNotFound;
