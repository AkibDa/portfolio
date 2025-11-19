import { useEffect } from 'react';
import { ScrollProgress } from './components/ScrollProgress.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Projects } from './components/Projects.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import { useScrollSpy } from './hooks/useScrollSpy.js';

const sections = ['home', 'about', 'projects', 'contact'];

const App = () => {
  const activeSection = useScrollSpy(sections);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-animate-on-scroll]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar sections={sections} activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;

