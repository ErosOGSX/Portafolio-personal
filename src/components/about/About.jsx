import { forwardRef } from 'react';
import AnimatedSection from '../utils/AnimatedSection';

const About = forwardRef((props, ref) => {
  return (

    <AnimatedSection id="about" ref={ref}>
       <h2 className="text-3xl font-bold text-center text-neutral-100 sm-text-4xl">Sobre mí</h2>
      <p className='mt-4 text-lg text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed'>¡Hola! Soy Alex Cedillo, un apasionado desarrollador web front-end. Me especializo en transformar ideas en experiencias digitales inolvidables, utilizando tecnologías modernas como React y Next.js. Mi objetivo es diseñar interfaces de usuario intuitivas que no solo sean visualmente atractivas, sino también funcionales y accesibles.</p>
    </AnimatedSection>
  );
});

About.displayName = 'About';

export default About

