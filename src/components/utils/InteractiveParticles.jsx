import { useEffect, useRef } from 'react';
import anime from 'animejs';

const InteractiveParticles = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const createParticles = () => {
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full pointer-events-none';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(56, 189, 248, ${Math.random() * 0.5 + 0.1})`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        containerRef.current?.appendChild(particle);
        particlesRef.current.push(particle);
      }

      // Animación base de las partículas
      anime({
        targets: particlesRef.current,
        translateX: () => anime.random(-200, 200),
        translateY: () => anime.random(-200, 200),
        scale: () => [1, anime.random(0.5, 2), 1],
        opacity: () => [0.1, anime.random(0.3, 0.8), 0.1],
        duration: () => anime.random(8000, 15000),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: () => anime.random(0, 5000)
      });
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Efecto magnético en partículas cercanas
      particlesRef.current.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseRef.current.x - particleX, 2) + 
          Math.pow(mouseRef.current.y - particleY, 2)
        );
        
        if (distance < 150) {
          anime({
            targets: particle,
            scale: [1, 1.5],
            opacity: [particle.style.opacity, 0.8],
            duration: 300,
            easing: 'easeOutQuad'
          });
        } else {
          anime({
            targets: particle,
            scale: 1,
            opacity: 0.3,
            duration: 500,
            easing: 'easeOutQuad'
          });
        }
      });
    };

    const handleClick = (e) => {
      // Explosión de partículas en click
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full border-2 border-sky-400 pointer-events-none';
      ripple.style.left = e.clientX - 25 + 'px';
      ripple.style.top = e.clientY - 25 + 'px';
      ripple.style.width = '50px';
      ripple.style.height = '50px';
      
      document.body.appendChild(ripple);
      
      anime({
        targets: ripple,
        scale: [0, 4],
        opacity: [0.8, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: () => ripple.remove()
      });
    };

    createParticles();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      particlesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.05) 0%, transparent 70%)' }}
    />
  );
};

export default InteractiveParticles;