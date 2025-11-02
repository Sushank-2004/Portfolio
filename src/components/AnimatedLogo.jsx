import React from 'react';
import { motion } from 'framer-motion';
import ASSETS from '../config/assets';
import './AnimatedLogo.css';

const AnimatedLogo = () => {
  return (
    <motion.img 
      src={ASSETS.LOGO_MAIN}
      alt="Motion Lenser Logo" 
      className="minimal-logo"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
};

export default AnimatedLogo;