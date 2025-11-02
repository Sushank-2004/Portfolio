import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import ASSETS from '../config/assets';
import './Hero.css';

const Hero = () => {
  const [elementPositions, setElementPositions] = useState({});
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // Monitor Hero section visibility and mouse position for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const isVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        setIsHeroVisible(isVisible);
      }
    };

    const handleMouseMove = (e) => {
      if (heroRef.current && !isDragging) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const centerX = heroRect.left + heroRect.width / 2;
        const centerY = heroRect.top + heroRect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / heroRect.width,
          y: (e.clientY - centerY) / heroRect.height
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  const handleDoubleClick = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();
    
    setElementPositions(prev => {
      const newPositions = { ...prev };
      delete newPositions[elementId];
      return newPositions;
    });
  };

  const handleMouseDown = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = e.target.getBoundingClientRect();
    
    const offsetX = e.clientX - elementRect.left;
    const offsetY = e.clientY - elementRect.top;

    const handleMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - offsetX - containerRect.left;
      const newY = moveEvent.clientY - offsetY - containerRect.top;

      // Constrain to container bounds
      const minX = 0;
      const maxX = containerRect.width - elementRect.width;
      const minY = 0;
      const maxY = containerRect.height - elementRect.height;

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));

      setElementPositions(prev => ({
        ...prev,
        [elementId]: { 
          x: clampedX, 
          y: clampedY, 
          isDragged: true,
          parallaxX: (clampedX / containerRect.width - 0.5) * 20,
          parallaxY: (clampedY / containerRect.height - 0.5) * 20
        }
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseEnter = (elementId) => {
    setHoveredElement(elementId);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  // Calculate parallax transform for non-dragged elements
  const getParallaxTransform = (elementId, baseDelay = 0) => {
    if (elementPositions[elementId]?.isDragged) {
      return {
        transform: `translate(${elementPositions[elementId].parallaxX}px, ${elementPositions[elementId].parallaxY}px)`
      };
    }
    
    const intensity = 0.5 + (baseDelay * 0.2);
    const parallaxX = mousePosition.x * 15 * intensity;
    const parallaxY = mousePosition.y * 10 * intensity;
    
    return {
      transform: `translate(${parallaxX}px, ${parallaxY}px)`
    };
  };
  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Hero Logo in Right Corner */}
      <motion.div 
        className="hero-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <img src={ASSETS.LOGO_ML} alt="ML Logo" />
      </motion.div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Creative <span className="gradient-text">Designer</span>
            <br />& Visual Storyteller
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            UI/UX Designer • Motion Graphics • Video Editor
            <br />
            Crafting digital experiences that captivate and inspire
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a href="#portfolio" className="btn-primary">
              View My Work
            </a>
            <a href="#about" className="btn-secondary">
              <Play size={16} />
              Watch Reel
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="floating-elements" ref={containerRef}>
            <motion.div
              className={`element element-1 ${hoveredElement === 'element-1' ? 'hovered' : ''} ${elementPositions['element-1']?.isDragged ? 'dragged' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, 'element-1')}
              onDoubleClick={(e) => handleDoubleClick(e, 'element-1')}
              onMouseEnter={() => handleMouseEnter('element-1')}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...(elementPositions['element-1']?.isDragged
                  ? {
                    position: 'absolute',
                    left: `${elementPositions['element-1'].x}px`,
                    top: `${elementPositions['element-1'].y}px`,
                    zIndex: 100,
                    ...getParallaxTransform('element-1', 0)
                  }
                  : getParallaxTransform('element-1', 0)
                ),
                opacity: isHeroVisible ? 1 : 0,
                pointerEvents: isHeroVisible ? 'auto' : 'none',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            ></motion.div>
            <motion.div
              className={`element element-2 ${hoveredElement === 'element-2' ? 'hovered' : ''} ${elementPositions['element-2']?.isDragged ? 'dragged' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, 'element-2')}
              onDoubleClick={(e) => handleDoubleClick(e, 'element-2')}
              onMouseEnter={() => handleMouseEnter('element-2')}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...(elementPositions['element-2']?.isDragged
                  ? {
                    position: 'absolute',
                    left: `${elementPositions['element-2'].x}px`,
                    top: `${elementPositions['element-2'].y}px`,
                    zIndex: 100,
                    ...getParallaxTransform('element-2', 1)
                  }
                  : getParallaxTransform('element-2', 1)
                ),
                opacity: isHeroVisible ? 1 : 0,
                pointerEvents: isHeroVisible ? 'auto' : 'none',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            ></motion.div>
            <motion.div
              className={`element element-3 ${hoveredElement === 'element-3' ? 'hovered' : ''} ${elementPositions['element-3']?.isDragged ? 'dragged' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, 'element-3')}
              onDoubleClick={(e) => handleDoubleClick(e, 'element-3')}
              onMouseEnter={() => handleMouseEnter('element-3')}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              style={{
                ...(elementPositions['element-3']?.isDragged
                  ? {
                    position: 'absolute',
                    left: `${elementPositions['element-3'].x}px`,
                    top: `${elementPositions['element-3'].y}px`,
                    zIndex: 100,
                    ...getParallaxTransform('element-3', 2)
                  }
                  : getParallaxTransform('element-3', 2)
                ),
                opacity: isHeroVisible ? 1 : 0,
                pointerEvents: isHeroVisible ? 'auto' : 'none',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            ></motion.div>
            <div
              className={`element element-4 ${elementPositions['element-4']?.isDragged ? 'dragged' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, 'element-4')}
              onDoubleClick={(e) => handleDoubleClick(e, 'element-4')}
              style={{
                ...(elementPositions['element-4']?.isDragged
                  ? {
                    position: 'absolute',
                    left: `${elementPositions['element-4'].x}px`,
                    top: `${elementPositions['element-4'].y}px`,
                    zIndex: 100,
                    ...getParallaxTransform('element-4', 3)
                  }
                  : getParallaxTransform('element-4', 3)
                ),
                opacity: isHeroVisible ? 1 : 0,
                pointerEvents: isHeroVisible ? 'auto' : 'none',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            ></div>
            <div
              className={`element element-5 ${elementPositions['element-5']?.isDragged ? 'dragged' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, 'element-5')}
              onDoubleClick={(e) => handleDoubleClick(e, 'element-5')}
              style={{
                ...(elementPositions['element-5']?.isDragged
                  ? {
                    position: 'absolute',
                    left: `${elementPositions['element-5'].x}px`,
                    top: `${elementPositions['element-5'].y}px`,
                    zIndex: 100,
                    ...getParallaxTransform('element-5', 4)
                  }
                  : getParallaxTransform('element-5', 4)
                ),
                opacity: isHeroVisible ? 1 : 0,
                pointerEvents: isHeroVisible ? 'auto' : 'none',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            ></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <ArrowDown size={24} />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;