import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Coffee, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    { icon: <Award size={24} />, number: '500+', label: 'Projects Completed in Video Editing and Motion Graphics' },
    { icon: <Users size={24} />, number: '30+', label: 'Happy Clients' },
    { icon: <Coffee size={24} />, number: '1000+', label: 'Cups of Coffee' },
    { icon: <Heart size={24} />, number: '2+', label: 'Years Experience' }
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Passionate about creating meaningful digital experiences</h3>
            <p>
              I'm a creative professional with over 2 years of experience in
              'Motion Graphics', and 'Video Editing' and fresher at  UI/UX design. I believe in the power of visual storytelling 
              and strive to create designs that not only look beautiful but also solve real problems.
            </p>
            <p>
              My approach combines user-centered design principles with cutting-edge technology 
              to deliver exceptional digital experiences. Whether it's designing intuitive interfaces, 
              creating engaging motion graphics, or editing compelling videos, I bring passion and 
              precision to every project.
            </p>
            <a href="#contact" className="btn-primary">Let's Work Together</a>
          </motion.div>
          
          <motion.div 
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;