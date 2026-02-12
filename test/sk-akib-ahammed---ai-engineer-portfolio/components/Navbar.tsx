import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If it's not an internal anchor, let browser handle it
    if (!href.startsWith('#')) {
      setMobileMenuOpen(false);
      return;
    }
  
    e.preventDefault();
    setMobileMenuOpen(false);
  
    const targetId = href.replace('#', '') || 'home';
    const element = document.getElementById(targetId);
  
    if (element) {
      const offset = 90; // slightly tighter offset
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
  
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };
  

  const navLinks = [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: `mailto:${PERSONAL_INFO.email}` }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed z-50 transition-all duration-300 
        /* Border: Light Grey in Light Mode, White-ish in Dark Mode */
        border border-black/5 dark:border-white/15
        
        /* --- Mobile Styles --- */
        top-4 inset-x-4 rounded-2xl flex flex-col overflow-hidden
        
        /* --- Desktop Styles --- */
        md:top-6 md:w-fit md:inset-x-0 md:mx-auto
        md:flex-row md:items-center md:rounded-full md:overflow-visible
        
        /* --- Dynamic Backgrounds --- */
        ${isScrolled || mobileMenuOpen
          ? 'bg-white/90 dark:bg-black/75 backdrop-blur-xl shadow-xl' // Stronger bg when scrolled
          : 'bg-black/5 dark:bg-white/5 backdrop-blur-md'             // Subtle tint when at top
        }`}
    >
      {/* 1. Header Section */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-2">
        {/* Logo Image */}
        <a 
          href="#home" 
          onClick={(e) => handleScrollToSection(e, '#home')}
          className="flex items-center gap-2 group"
        >
          <div className="relative overflow-hidden rounded-full border border-black/10 dark:border-white/20 group-hover:border-indigo-500 transition-colors">
            <img 
              src="/headshot.png" 
              alt="Profile" 
              className="h-8 w-8 object-cover"
            />
          </div>
        </a>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-300 p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="text-gray-900 dark:text-white p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 2. Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 pr-2 pl-4">
        <div className="flex items-center gap-6">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Divider: Darker in light mode, Lighter in dark mode */}
        <div className="h-4 w-px bg-black/10 dark:bg-white/10" />

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] active:scale-95 whitespace-nowrap"
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* 3. Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden w-full border-t border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/40"
          >
            <div className="p-3 flex flex-col gap-1">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  onClick={(e) => handleScrollToSection(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="mt-2 block w-full py-3 bg-indigo-600 text-white text-center text-sm rounded-lg font-bold active:scale-95 transition-transform"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;