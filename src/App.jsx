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
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Ensure minimum loading time for better UX
  useEffect(() => {
    const minLoadingTime = setTimeout(() => {
      // This ensures loading screen shows for at least 2 seconds
    }, 2000);

    return () => clearTimeout(minLoadingTime);
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
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