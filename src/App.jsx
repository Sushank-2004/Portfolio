import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ASSETS from './config/assets';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload all image assets
  useEffect(() => {
    const preloadAssets = async () => {
      const imageAssets = [
        ASSETS.LOGO_MAIN,
        ASSETS.LOGO_ML,
        ASSETS.SONY_HEADPHONE,
        ASSETS.FRAME,
        ASSETS.YT_SS,
        ASSETS.ADVERTISE_SS,
        ASSETS.FLOATING_SS,
        ASSETS.PREMIUM_EDIT_SS
      ];

      const totalAssets = imageAssets.length;
      let loadedCount = 0;

      const imagePromises = imageAssets.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            setLoadingProgress((loadedCount / totalAssets) * 100);
            resolve(src);
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            loadedCount++;
            setLoadingProgress((loadedCount / totalAssets) * 100);
            resolve(src); // Resolve anyway to not block loading
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        console.log('All assets loaded successfully');
        
        // Ensure minimum loading time of 2 seconds
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
        await minLoadingTime;
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading assets:', error);
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoading ? (
          <LoadingScreen progress={loadingProgress} />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Portfolio />
                  <Contact />
                </>
              } />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;