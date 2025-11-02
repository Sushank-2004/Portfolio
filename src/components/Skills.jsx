import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Monitor, Video, Zap } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Monitor size={32} />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user interfaces',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing']
    },
    {
      icon: <Zap size={32} />,
      title: 'Motion Graphics',
      description: 'Bringing designs to life with smooth animations',
      skills: ['After Effects', 'Cinema 4D', 'Principle', '3D Animation', 'VFX']
    },
    {
      icon: <Video size={32} />,
      title: 'Video Editing',
      description: 'Crafting compelling visual stories',
      skills: ['Premiere Pro', 'Filmora', 'Color Grading', 'Sound Design', 'Storytelling']
    },
    {
      icon: <Palette size={32} />,
      title: 'Creative Tools',
      description: 'Mastering industry-standard software',
      skills: ['Photoshop', 'Illustrator', 'Blender', 'Framer']
    }
  ];

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="skill-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="skill-icon">{category.icon}</div>
              <h3 className="skill-title">{category.title}</h3>
              <p className="skill-description">{category.description}</p>
              <div className="skill-tags">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span 
                    key={skillIndex}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;