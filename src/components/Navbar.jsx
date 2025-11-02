import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Mail, Settings } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Get all sections
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: <Home size={20} /> },
    { name: 'About', href: '#about', icon: <User size={20} /> },
    { name: 'Skills', href: '#skills', icon: <Settings size={20} /> },
    { name: 'Portfolio', href: '#portfolio', icon: <Briefcase size={20} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={20} /> }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
        >
          <span className="gradient-text">Motion Lenser</span>
        </motion.div>

        <div className="nav-menu">
          {navItems.map((item, index) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            
            return (
              <motion.a
                key={item.name}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                title={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isActive && (
                  <span className="nav-label">{item.name}</span>
                )}
              </motion.a>
            );
          })}
        </div>

        <button 
          className="nav-toggle" 
          onClick={() => {
            console.log('Toggle clicked, current state:', isOpen);
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile menu backdrop */}
        <div 
          className={`mobile-menu-backdrop ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(false)}
        />

        <motion.div 
          className={`mobile-menu ${isOpen ? 'active' : ''}`}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            y: isOpen ? 0 : -20,
            scale: isOpen ? 1 : 0.95
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {navItems.map((item, index) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            
            return (
              <motion.a
                key={item.name}
                href={item.href}
                className={`mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="mobile-link-icon">{item.icon}</span>
                {item.name}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;