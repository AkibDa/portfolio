import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import GmailConfirmModal from './components/GmailConfirmModal';
import { PERSONAL_INFO } from './constants';

const GMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`;

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [gmailModalOpen, setGmailModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleEmailRedirect = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setGmailModalOpen(true);
  }, []);

  const handleGmailConfirmClose = useCallback(() => setGmailModalOpen(false), []);

  const handleGmailConfirm = useCallback(() => {
    window.open(GMAIL_LINK, '_blank', 'noopener,noreferrer');
    setGmailModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onEmailRedirect={handleEmailRedirect}
      />
      <main>
        <Hero onEmailRedirect={handleEmailRedirect} />
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
                href={GMAIL_LINK}
                onClick={handleEmailRedirect}
                className="px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl cursor-pointer"
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

      <GmailConfirmModal
        isOpen={gmailModalOpen}
        onClose={handleGmailConfirmClose}
        onConfirm={handleGmailConfirm}
      />
    </div>
  );
};

export default App;
