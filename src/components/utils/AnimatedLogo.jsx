import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedLogo = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    // Animación de pulso con gradiente
    anime({
      targets: logoRef.current,
      scale: [1, 1.08, 1],
      boxShadow: [
        '0 0 0px rgba(56, 189, 248, 0)',
        '0 0 15px rgba(56, 189, 248, 0.6)',
        '0 0 0px rgba(56, 189, 248, 0)'
      ],
      duration: 3000,
      easing: 'easeInOutQuad',
      loop: true
    });
  }, []);

  const handleHover = () => {
    anime({
      targets: logoRef.current,
      scale: [1, 1.15, 1.1],
      rotateY: [0, 360],
      boxShadow: [
        '0 0 0px rgba(56, 189, 248, 0)',
        '0 0 25px rgba(56, 189, 248, 0.8)',
        '0 0 15px rgba(56, 189, 248, 0.6)'
      ],
      duration: 600,
      easing: 'easeOutBack(1.7)'
    });
  };

  return (
    <div 
      ref={logoRef}
      onMouseEnter={handleHover}
      className="text-2xl font-bold cursor-pointer select-none bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent border-2 border-sky-400/30 rounded-lg px-3 py-1 backdrop-blur-sm"
      style={{ perspective: '1000px' }}
    >
      AC
    </div>
  );
};

export default AnimatedLogo;