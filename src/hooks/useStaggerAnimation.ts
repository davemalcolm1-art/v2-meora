import { useEffect, useRef } from 'react';

export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(itemCount: number, baseDelay = 80) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(28px)';
      child.style.transition = `opacity 0.6s ease ${i * baseDelay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * baseDelay}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [itemCount]);

  return ref;
}
