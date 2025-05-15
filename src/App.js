import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { initScrollAnimations } from './utils/animationUtils';

// Import layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
// Import page sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Certifications from './components/sections/Certifications';
import TechTimeline from './components/sections/TechTimeline';
import Contact from './components/sections/Contact';
import Education from './components/sections/Education';
function App() {
  // Initialize animations when component mounts
  useEffect(() => {
    const observer = initScrollAnimations();

    // Cleanup observer when component unmounts
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Experience />
          {/* <TechTimeline /> */}
          {/* <Certifications /> */}
          <Contact />

        </main><ScrollToTop />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;