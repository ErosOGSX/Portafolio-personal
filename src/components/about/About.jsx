import { forwardRef } from 'react';
import AnimatedSection from '../utils/AnimatedSection';
import FloatingCode from '../utils/FloatingCode';

const About = forwardRef((props, ref) => {
  return (
      <AnimatedSection ref={ref} id="about" className="relative">
        <FloatingCode />
        <h2 className="text-3xl font-bold text-center text-neutral-100 sm:text-4xl relative z-10">Sobre mí</h2>
        <p className='mt-4 text-lg text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed relative z-10'>¡Hola! Soy Alex Cedillo, un apasionado desarrollador web front-end. Me especializo en transformar ideas en experiencias digitales inolvidables, utilizando tecnologías modernas como React y Next.js. Mi objetivo es diseñar interfaces de usuario intuitivas que no solo sean visualmente atractivas, sino también funcionales y accesibles.</p>
      </AnimatedSection>

  );
});

About.displayName = 'About';

export default About

