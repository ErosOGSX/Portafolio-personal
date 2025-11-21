import { forwardRef, useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { FaWhatsapp, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = forwardRef(function Hero(props, ref) {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  const [projectCount] = useState(12);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    // Typewriter effect para el nombre
    if (nameRef.current) {
      const text = 'Alex Cedillo';
      nameRef.current.innerHTML = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          nameRef.current.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      setTimeout(typeWriter, 500);
    }

    // Animación del título
    anime({
      targets: titleRef.current,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: 2500
    });

    // Animación de la descripción
    anime({
      targets: descRef.current,
      translateY: [30, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 800,
      delay: 3000
    });

    // Animación de botones sociales
    anime({
      targets: '.social-btn',
      scale: [0, 1],
      opacity: [0, 1],
      rotate: () => anime.random(-180, 180),
      delay: anime.stagger(150, {start: 3200}),
      duration: 800,
      easing: 'easeOutElastic(1, .8)'
    });

    // Animación del botón principal
    anime({
      targets: buttonRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      easing: 'easeOutBounce',
      duration: 1000,
      delay: 4200
    });

    // Contador animado
    anime({
      targets: { count: 0 },
      count: projectCount,
      duration: 2000,
      delay: 4000,
      easing: 'easeOutExpo',
      update: function(anim) {
        if (countRef.current) {
          countRef.current.innerHTML = Math.round(anim.animatables[0].target.count) + '+';
        }
      }
    });


    
    setHasAnimated(true);
  }, [projectCount, hasAnimated]);

  return (
    <section ref={ref} id="hero" className='relative flex min-h-[80dvh] flex-col items-center justify-center text-center overflow-hidden z-10'>
      
      <h1 className='text-5xl font-black tracking-tight text-neutral-100 md:text-6xl lg:text-7xl'>
        <span ref={nameRef} className='bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent'></span>
      </h1>
      
      <p ref={titleRef} className='mt-4 text-lg text-sky-400 font-semibold sm:text-xl opacity-0'>Desarrollador Web Front-End</p>
      
      <p ref={descRef} className='mt-6 max-w-2xl text-lg text-neutral-300 opacity-0'>Transformando ideas en experiencias digitales inolvidables, atractivas y funcionales.</p>
      
      <div className='mt-4 text-2xl font-bold text-sky-400'>
        <span ref={countRef}>0+</span> <span className='text-sm text-neutral-400'>proyectos completados</span>
      </div>
      
      {/* Botones de redes sociales */}
      <div className='mt-8 flex gap-4 justify-center flex-wrap'>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" 
           className='social-btn whatsapp group relative overflow-hidden rounded-full p-3 bg-[#25D366] hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-110 hover:rotate-12'>
          <FaWhatsapp size={24} className='text-white relative z-10' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </a>
        
        <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer"
           className='social-btn github group relative overflow-hidden rounded-full p-3 bg-[#333] hover:bg-[#24292e] transition-all duration-300 transform hover:scale-110 hover:-rotate-12'>
          <FaGithub size={24} className='text-white relative z-10' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#333] to-[#24292e] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </a>
        
        <a href="mailto:tu@email.com" target="_blank" rel="noopener noreferrer"
           className='social-btn gmail group relative overflow-hidden rounded-full p-3 bg-[#EA4335] hover:bg-[#d33b2c] transition-all duration-300 transform hover:scale-110 hover:rotate-12'>
          <FaEnvelope size={24} className='text-white relative z-10' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#EA4335] to-[#d33b2c] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </a>
        
        <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer"
           className='social-btn linkedin group relative overflow-hidden rounded-full p-3 bg-[#0077B5] hover:bg-[#005885] transition-all duration-300 transform hover:scale-110 hover:-rotate-12'>
          <FaLinkedin size={24} className='text-white relative z-10' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#0077B5] to-[#005885] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </a>
      </div>
      
      <a ref={buttonRef} href="#projects" className='mt-8 inline-block rounded-md bg-sky-500 px-8 py-3 font-medium text-white transition-transform duration-300 hover:bg-sky-600 hover:scale-105 opacity-0'>Ver mis proyectos</a>
    </section>
  );
});
 
export default Hero