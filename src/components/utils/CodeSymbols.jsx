import { useEffect, useRef } from 'react';
import anime from 'animejs';

const CodeSymbols = () => {
  const containerRef = useRef(null);

  const symbols = ['<', '>', '{', '}', '[', ']', '=>', '()', '&&', '||'];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSymbols = () => {
      symbols.forEach((symbol, index) => {
        const symbolElement = document.createElement('div');
        symbolElement.className = 'code-symbol';
        symbolElement.textContent = symbol;
        symbolElement.style.cssText = `
          position: absolute;
          font-family: 'Courier New', monospace;
          font-size: 24px;
          font-weight: bold;
          color: rgba(56, 189, 248, 0.2);
          pointer-events: none;
          left: ${Math.random() * 90}%;
          top: ${Math.random() * 90}%;
          z-index: 1;
          cursor: default;
        `;
        
        container.appendChild(symbolElement);

        // Animación base
        anime({
          targets: symbolElement,
          rotate: () => anime.random(-15, 15),
          scale: [0.8, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          duration: () => anime.random(3000, 6000),
          delay: index * 300,
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine'
        });

        // Interacción con mouse
        const handleMouseEnter = () => {
          anime({
            targets: symbolElement,
            scale: [1, 1.5],
            color: 'rgba(56, 189, 248, 0.8)',
            duration: 300,
            easing: 'easeOutQuad'
          });
        };

        const handleMouseLeave = () => {
          anime({
            targets: symbolElement,
            scale: [1.5, 1],
            color: 'rgba(56, 189, 248, 0.2)',
            duration: 300,
            easing: 'easeOutQuad'
          });
        };

        symbolElement.addEventListener('mouseenter', handleMouseEnter);
        symbolElement.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    createSymbols();

    return () => {
      const symbols = container.querySelectorAll('.code-symbol');
      symbols.forEach(symbol => container.removeChild(symbol));
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
};

export default CodeSymbols;