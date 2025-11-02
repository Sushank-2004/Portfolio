import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-text">
            <p>
              Made with <Heart size={16} className="heart-icon" /> by a passionate designer
            </p>
            <p className="copyright">
              © 2025 Motion Lenser`s` Portfolio. All rights reserved.
            </p>
          </div>
          
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;