
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <Stats />
        <Skills />
        <Projects />
        <section className="py-24 px-6 lg:px-24 bg-indigo-600 dark:bg-indigo-700">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to build something intelligent together?
            </h2>
            <p className="text-indigo-100 text-xl">
              I'm currently seeking opportunities to contribute to impactful AI products and work with advanced model ecosystems.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ahammedskakib@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  Send an Email
              </a>
              <a 
                href="https://www.linkedin.com/in/skakibahammed/" 
                target="_blank"
                rel="noreferrer"
                className="px-10 py-5 bg-indigo-950 text-white rounded-full font-bold text-lg hover:bg-black transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
