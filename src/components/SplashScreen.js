import React from 'react';
import Lottie from 'react-lottie';
import splashAnimationData from '../assets/splashScreen.json'; 
import './SplashScreen.css'; 

const SplashScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: splashAnimationData, 
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="splash-screen">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default SplashScreen;
