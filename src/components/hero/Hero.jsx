import { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import MagneticButton from '../utils/MagneticButton';

const Hero = forwardRef(function Hero(props, ref) {
  // Typewriter para el nombre
  const fullName = 'Alex Cedillo';
  const [displayName, setDisplayName] = useState('');
  useEffect(() => {
    let i = 0;
    const type = () => {
      setDisplayName(fullName.slice(0, i + 1));
      i++;
      if (i < fullName.length) {
        setTimeout(type, 100);
      }
    };
    type();
    // Limpieza no necesaria porque el efecto es corto
  }, []);

  // Contador animado
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = 12;
    const duration = 2000;
    const increment = end / (duration / 30);
    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.round(start));
        setTimeout(animate, 30);
      } else {
        setCount(end);
      }
    };
    animate();
  }, []);

  return (
    <motion.section
      ref={ref}
      id="hero"
      className='relative flex min-h-[80dvh] flex-col items-center justify-center text-center overflow-hidden z-10'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        className='text-5xl font-black tracking-tight text-neutral-100 md:text-6xl lg:text-7xl'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className='bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent'>{displayName}</span>
      </motion.h1>

      <motion.p
        className='mt-4 text-lg text-sky-400 font-semibold sm:text-xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Desarrollador Web Front-End
      </motion.p>

      <motion.p
        className='mt-6 max-w-2xl text-lg text-neutral-300'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Transformando ideas en experiencias digitales inolvidables, atractivas y funcionales.
      </motion.p>

      {/* Botones de redes sociales */}
      <motion.div
        className='mt-8 flex gap-4 justify-center flex-wrap'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.a
          href="https://wa.me/+584120140142"
          target="_blank"
          rel="noopener noreferrer"
          className='social-btn whatsapp group relative overflow-hidden rounded-full p-3 bg-[#25D366] hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-110 hover:rotate-12'
          whileHover={{ scale: 1.15, rotate: 12 }}
        >
          <FaWhatsapp size={24} className='text-white relative z-10' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </motion.a>
        <motion.a
          href="https://github.com/ErosOGSX"
          target="_blank"
          rel="noopener noreferrer"
          className='social-btn github group relative overflow-hidden rounded-full p-3 bg-[#333] hover:bg-[#24292e] transition-all duration-300 transform hover:scale-110 hover:-rotate-12'
          whileHover={{ scale: 1.15, rotate: -12 }}
        >
          <FaGithub size={24} className='text-white relative z-10' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#333] to-[#24292e] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </motion.a>
        <motion.a
          href="mailto:erosogsx@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className='social-btn gmail group relative overflow-hidden rounded-full p-3 bg-[#EA4335] hover:bg-[#d33b2c] transition-all duration-300 transform hover:scale-110 hover:rotate-12'
          whileHover={{ scale: 1.15, rotate: 12 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" className='text-white relative z-10'>
            <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.887.711-1.592 1.592-1.636L12 9.545l10.408-5.724A1.636 1.636 0 0 1 24 5.457z"/>
          </svg>
          <div className='absolute inset-0 bg-gradient-to-r from-[#EA4335] to-[#d33b2c] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/ErosOGSX"
          target="_blank"
          rel="noopener noreferrer"
          className='social-btn linkedin group relative overflow-hidden rounded-full p-3 bg-[#0077B5] hover:bg-[#005885] transition-all duration-300 transform hover:scale-110 hover:-rotate-12'
          whileHover={{ scale: 1.15, rotate: -12 }}
        >
          <FaLinkedin size={24} className='text-white relative z-10' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#0077B5] to-[#005885] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </motion.a>
      </motion.div>

      {/* Contador debajo de los botones sociales */}
      <motion.div
        className='mt-8 text-2xl font-bold text-sky-400'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span>{count}+</span> <span className='text-sm text-neutral-400'>proyectos completados</span>
      </motion.div>
      
      {/* Botón principal con efecto magnético */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <MagneticButton className='mt-8 inline-block rounded-md bg-sky-500 px-8 py-3 font-medium text-white transition-transform duration-300 hover:bg-sky-600 hover:scale-105 btn-pulse'>
          <a href="#projects">Ver mis proyectos</a>
        </MagneticButton>
      </motion.div>
    </motion.section>
  );
});
 
export default Hero