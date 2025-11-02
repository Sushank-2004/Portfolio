import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X } from 'lucide-react';
import ASSETS from '../config/assets';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Product Page UI',
      category: 'ui-ux',
      type: 'image',
      media: ASSETS.SONY_HEADPHONE,
      description: 'Product page design for tech e-commerce platform',
      tools: ['Figma', 'Prototyping', 'User Research']
    },
    {
      id: 2,
      title: 'VFX Animation',
      category: 'motion',
      type: 'video',
      media: ASSETS.FLOAT_ICONS,
      thumbnail: ASSETS.FLOATING_SS,
      description: 'Dynamic logo animation and brand identity motion graphics',
      tools: ['After Effects', 'Cinema 4D', 'Lottie']
    },
    {
      id: 3,
      title: 'Advertisement Video',
      category: 'video',
      type: 'video',
      media: ASSETS.FRAMEFUSION_PERPLEXITY,
      thumbnail: ASSETS.ADVERTISE_SS,
      description: 'Promotional video for tech startup product launch',
      tools: ['Premiere Pro', 'After Effects', 'Color Grading']
    },
    {
      id: 4,
      title: 'Landing Page UI',
      category: 'ui-ux',
      type: 'image',
      media: ASSETS.FRAME,
      description: 'Clean and intuitive landing page interface',
      tools: ['Figma', 'Data Visualization', 'UX Research']
    },
    {
      id: 5,
      title: 'Motion Explainer Video',
      category: 'motion',
      type: 'video',
      media: ASSETS.PREMIUM_EDIT_2,
      thumbnail: ASSETS.PREMIUM_EDIT_SS,
      description: 'Animated explainer video for SaaS platform',
      tools: ['After Effects', 'Illustrator', 'Character Animation']
    },
    {
      id: 6,
      title: 'Long Form/YouTube Video Edits',
      category: 'video',
      type: 'video',
      media: ASSETS.DEMO_EDIT,
      thumbnail: ASSETS.YT_SS,
      description: 'Feature-length documentary post-production',
      tools: ['DaVinci Resolve', 'Sound Design', 'Color Correction']
    }
  ];

  const filters = [
    { key: 'all', label: 'All Work' },
    { key: 'ui-ux', label: 'UI/UX Design' },
    { key: 'motion', label: 'Motion Graphics' },
    { key: 'video', label: 'Video Editing' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const openFullscreen = (project) => {
    setFullscreenMedia(project);
  };

  const closeFullscreen = () => {
    setFullscreenMedia(null);
  };

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Work
        </motion.h2>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="portfolio-item"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              layout
            >
              <div className="portfolio-image">
                {project.type === 'video' ? (
                  <video
                    src={project.media}
                    poster={project.thumbnail}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                  />
                ) : (
                  <img src={project.media} alt={project.title} />
                )}
                <div className="portfolio-overlay">
                  <div className="portfolio-actions">
                    <button
                      className="action-btn"
                      onClick={() => openFullscreen(project)}
                      title="View Fullscreen"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="portfolio-content">
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                <div className="portfolio-tools">
                  {project.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {fullscreenMedia && (
            <motion.div
              className="fullscreen-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFullscreen}
            >
              <motion.div
                className="fullscreen-content"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={closeFullscreen}
                  title="Close"
                >
                  <X size={24} />
                </button>

                {fullscreenMedia.type === 'video' ? (
                  <video
                    src={fullscreenMedia.media}
                    controls
                    autoPlay
                    loop
                    className="fullscreen-video"
                  />
                ) : (
                  <img
                    src={fullscreenMedia.media}
                    alt={fullscreenMedia.title}
                    className="fullscreen-image"
                  />
                )}

                <div className="fullscreen-info">
                  <h3>{fullscreenMedia.title}</h3>
                  <p>{fullscreenMedia.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;