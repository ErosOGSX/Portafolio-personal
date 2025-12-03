import { useEffect, useRef } from 'react';
import anime from 'animejs';

const DynamicBackground = () => {
  const gridRef = useRef(null);
  const waveRef = useRef([]);

  useEffect(() => {
    // Crear grid de puntos
    const createGrid = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cols = Math.floor(window.innerWidth / 50);
      const rows = Math.floor(window.innerHeight / 50);

      for (let i = 0; i < cols * rows; i++) {
        const dot = document.createElement('div');
        dot.className = 'grid-dot';
        dot.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 50%;
          left: ${(i % cols) * 50}px;
          top: ${Math.floor(i / cols) * 50}px;
          transition: all 0.3s ease;
        `;
        grid.appendChild(dot);
      }
    };

    // Efecto de ondas en click
    const createWave = (x, y) => {
      const wave = document.createElement('div');
      wave.className = 'wave-effect';
      wave.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(56, 189, 248, 0.6);
        border-radius: 50%;
        left: ${x - 10}px;
        top: ${y - 10}px;
        pointer-events: none;
        z-index: 1;
      `;
      
      document.body.appendChild(wave);
      waveRef.current.push(wave);

      anime({
        targets: wave,
        scale: [0, 8],
        opacity: [0.8, 0],
        duration: 1500,
        easing: 'easeOutExpo',
        complete: () => {
          document.body.removeChild(wave);
          waveRef.current = waveRef.current.filter(w => w !== wave);
        }
      });
    };

    // Interacción con grid
    const handleMouseMove = (e) => {
      const dots = document.querySelectorAll('.grid-dot');
      dots.forEach(dot => {
        const rect = dot.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(e.clientX - rect.left, 2) + 
          Math.pow(e.clientY - rect.top, 2)
        );
        
        if (distance < 100) {
          dot.style.background = `rgba(56, 189, 248, ${0.8 - distance / 100})`;
          dot.style.transform = `scale(${2 - distance / 100})`;
        } else {
          dot.style.background = 'rgba(56, 189, 248, 0.1)';
          dot.style.transform = 'scale(1)';
        }
      });
    };

    const handleClick = (e) => {
      createWave(e.clientX, e.clientY);
    };

    createGrid();
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      waveRef.current.forEach(wave => {
        if (document.body.contains(wave)) {
          document.body.removeChild(wave);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={gridRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default DynamicBackground;