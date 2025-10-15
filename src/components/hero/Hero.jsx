import React from 'react';

const Hero = () => {
  return (
    <section className='flex min-h-[80dvh] flex-col items-center justify-center text-center'>
        <h1 className='text-5xl font-black tracking-tight text-neutral-100 md:text-6xl lg:text-7xl'>
            <span className='bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent'>Alex Cedillo</span>
        </h1>
        <p className='mt-4 text-lg text-sky-400 font-semibold sm:text-xl'>Desarrollador Web Front-End</p>
        <p className='mt-6 max-w-2xl text-lg text-neutral-300'>Transformando ideas en experiencias digitales inolvidables, atractivas y funcionales.</p>
        <a href="#projects" className='mt-8 inline-block rounded-md bg-sky-500 px-8 py-3 font-medium text-white transition-transform duration-300 hover:bg-sky-600 hover:scale-105'>Ver mis proyectos</a>
    </section>
  );
};

export default Hero