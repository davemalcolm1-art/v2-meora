import { useEffect } from 'react';

export function useNavScroll() {
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
