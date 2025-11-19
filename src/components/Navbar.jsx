import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

export const Navbar = ({ sections, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-content">
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section}>
              <button
                type="button"
                onClick={() => handleNavigate(section)}
                className={activeSection === section ? 'active' : ''}
                aria-current={activeSection === section ? 'page' : undefined}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeSection: PropTypes.string.isRequired,
};

