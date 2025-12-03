import { useEffect, useRef } from 'react';
import anime from 'animejs';

const FloatingCode = () => {
  const containerRef = useRef(null);

  const codeSnippets = [
    'const skills = ["React", "JavaScript"];',
    'function createAwesome() { return magic; }',
    'import { useState } from "react";',
    'export default Portfolio;',
    '.container { display: flex; }',
    'npm install creativity',
    'git commit -m "Amazing feature"',
    'const passion = true;'
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createFloatingCode = () => {
      codeSnippets.forEach((code, index) => {
        const codeElement = document.createElement('div');
        codeElement.className = 'floating-code';
        codeElement.textContent = code;
        codeElement.style.cssText = `
          position: absolute;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: rgba(56, 189, 248, 0.3);
          pointer-events: none;
          white-space: nowrap;
          left: ${Math.random() * 80}%;
          top: ${Math.random() * 80}%;
          z-index: 1;
        `;
        
        container.appendChild(codeElement);

        // Animación de flotación
        anime({
          targets: codeElement,
          translateX: () => anime.random(-100, 100),
          translateY: () => anime.random(-50, 50),
          opacity: [0.3, 0.6, 0.2],
          duration: () => anime.random(8000, 15000),
          delay: index * 1000,
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine'
        });
      });
    };

    createFloatingCode();

    return () => {
      const codes = container.querySelectorAll('.floating-code');
      codes.forEach(code => container.removeChild(code));
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
};

export default FloatingCode;