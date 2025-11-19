import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds = [], offset = 120) => {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (!sectionIds.length) return undefined;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      let currentId = sectionIds[0];

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (scrollPosition >= el.offsetTop) {
          currentId = id;
        }
      });

      setActive(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return active;
};

