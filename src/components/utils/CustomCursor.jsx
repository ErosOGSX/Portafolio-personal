import { useEffect, useRef } from 'react';
import anime from 'animejs';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = [];

    // Crear partículas de rastro
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-trail';
      particle.style.cssText = `
        position: fixed;
        width: ${8 - i}px;
        height: ${8 - i}px;
        background: rgba(56, 189, 248, ${0.8 - i * 0.1});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(particle);
      trail.push(particle);
    }

    trailRef.current = trail;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Cursor principal
      if (cursor) {
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
      }

      // Rastro de partículas con delay
      trail.forEach((particle, index) => {
        setTimeout(() => {
          particle.style.left = x + 'px';
          particle.style.top = y + 'px';
        }, index * 20);
      });
    };

    const handleMouseEnter = () => {
      anime({
        targets: cursor,
        scale: [1, 1.5],
        duration: 200,
        easing: 'easeOutQuad'
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: cursor,
        scale: [1.5, 1],
        duration: 200,
        easing: 'easeOutQuad'
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Efectos en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .cursor-hover');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      trail.forEach(particle => document.body.removeChild(particle));
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-4 h-4 bg-sky-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
};

export default CustomCursor;