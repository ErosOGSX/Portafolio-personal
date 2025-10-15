import React from 'react'

// 1. IMPORTACIONES DE COMPONENTES Y DATOS
import Navbar from './components/layout/header/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Footer from './components/layout/footer/Footer';
import AnimatedSection from './components/utils/AnimatedSection';
import ContactForm from './components/contact/ContactForm';
import Projects from './components/projects/Projects'

// Iconos
import { FaGithub, FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaFigma, FaJsSquare, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si';

// 2. DATOS DE PROYECTOS Y HABILIDADES
const projects = [
  {
    title: 'Plataforma de E-commerce',
    description: 'Una tienda online moderna y responsiva construida con tecnologías de punta.',
    image: '#',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Finance Tracker',
    description: 'Aplicación web para visualizar datos de finanzas personales en tiempo real con gráficos interactivos.',
    image: '#',
    tags: ['React', 'D3.js', 'CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Landing Page Corporativa',
    description: 'Sitio web estático optimizado para SEO y rendimiento, enfocado en la conversión.',
    image: '#',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const skills = [
    { name: 'HTML5', IconComponent: FaHtml5 },
    { name: 'CSS3', IconComponent: FaCss3Alt },
    { name: 'JavaScript', IconComponent: FaJsSquare },
    { name: 'React', IconComponent: FaReact },
    { name: 'Next.js', IconComponent: SiNextdotjs },
    { name: 'Tailwind CSS', IconComponent: SiTailwindcss },
    { name: 'Git', IconComponent: FaGitAlt },
    { name: 'GitHub', IconComponent: FaGithub },
    { name: 'Node.js', IconComponent: FaNodeJs },
    { name: 'Figma', IconComponent: FaFigma },
];

function App() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <Navbar />

      <main className="container mx-auto px-4">
      

        <Hero />

        <About />

        {/* Projects Section */}
        <Projects projects={projects} />

        {/* Skills Section */}
        <AnimatedSection id="skills">
            <h2 className="text-3xl font-bold text-center text-neutral-100 sm:text-4xl">Habilidades</h2>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                {skills.map((skill) => {
                    const { IconComponent } = skill;
                    return (
                        <div key={skill.name} className="flex flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900 p-6 border border-neutral-800 transition-colors duration-300 hover:border-sky-400/50 hover:bg-neutral-800/60">
                            <div className="text-sky-400"><IconComponent size={40} /></div>
                            <p className="font-semibold text-neutral-300">{skill.name}</p>
                        </div>
                    );
                })}
            </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact">
            <h2 className='text-3xl font-bold text-center text-neutral-100 sm:text-4xl'>Contacto</h2>
            <p className='mt-6 max-w-2xl mx-auto text-center text-lg text-neutral-300'>¿Interesado en colaborar o tienes alguna pregunta? Rellena el formulario de abajo.</p>
            <ContactForm />
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}

export default App;