import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onEmailRedirect: (e: React.MouseEvent) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode, onEmailRedirect }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`;

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onEmailRedirect(e);
  };

  // 🔥 Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 Active Section Detection
  useEffect(() => {
    const sections = ['home', 'skills', 'projects'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0.1
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" }
  ];

  return (
    <>
      {/* 🔥 Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[1000]"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed z-[999] transition-all duration-300 
          border border-black/5 dark:border-white/15
          
          top-4 inset-x-4 rounded-2xl flex flex-col 
          
          md:top-6 md:w-fit md:inset-x-0 md:mx-auto
          md:flex-row md:items-center md:rounded-full
          
          ${isScrolled || mobileMenuOpen
            ? 'bg-white/95 dark:bg-black/90 backdrop-blur-xl shadow-xl' 
            : 'bg-black/5 dark:bg-white/5 backdrop-blur-md'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-2">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-full border border-black/10 dark:border-white/20 group-hover:border-indigo-500 transition-colors">
              <img 
                src="/headshot.png" 
                alt="Profile"
                className="h-8 w-8 object-cover"
              />
            </div>
          </a>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 pr-2 pl-4">
          <div className="flex items-center gap-6 relative">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;

              return (
                <a 
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition-colors
                    ${isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`}
                >
                  {link.name}

                  {/* 🔥 Active Underline Animation */}
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                    style={{ opacity: isActive ? 1 : 0 }}
                  />
                </a>
              );
            })}

            <a 
              href={gmailLink}
              onClick={handleEmailClick}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors py-2 cursor-pointer"
            >
              Contact
            </a>
          </div>

          <div className="h-4 w-px bg-black/10 dark:bg-white/10" />

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a 
              href={gmailLink}
              onClick={handleEmailClick}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] active:scale-95 whitespace-nowrap cursor-pointer"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden w-full border-t border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/50"
            >
              <div className="flex flex-col p-4 space-y-2">
                {navLinks.map(link => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors
                      ${activeSection === link.id
                        ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10"
                      }`}
                  >
                    {link.name}
                  </a>
                ))}

                <a 
                  href={gmailLink}
                  onClick={handleEmailClick}
                  className="px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  Contact
                </a>

                <a 
                  href={gmailLink}
                  onClick={handleEmailClick}
                  className="mt-2 py-3 bg-indigo-600 text-white text-center text-base rounded-xl font-bold active:scale-95 transition-transform cursor-pointer"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
