import { useRef, useEffect } from 'react';
import anime from 'animejs';

const MagneticButton = ({ children, className = '', ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      anime({
        targets: button,
        translateX: x * 0.3,
        translateY: y * 0.3,
        duration: 200,
        easing: 'easeOutQuad'
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: button,
        translateX: 0,
        translateY: 0,
        duration: 400,
        easing: 'easeOutElastic(1, .8)'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`btn-magnetic ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MagneticButton;