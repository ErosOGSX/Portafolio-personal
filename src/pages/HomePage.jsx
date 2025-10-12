import AnimatedSection from '../components/AnimatedSection'
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGitAlt, FaGithub } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si'
import ContactForm from '../components/ContactForm'

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
    title: 'Dashboard Analítico',
    description: 'Aplicación web para visualizar datos en tiempo real con gráficos interactivos.',
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
];

const HomePage = () => {
    return(
        <>

        {/* Hero Section */}
        <section className='flex min-h-[80dvh] flex-col items-center justify-center text-center'>
            <h1 className='text-5xl font-black tracking-tight text-neutral-100 md:text-6xl lg:text-7xl'>
                {/* CORRECCIÓN: text-transparent */}
                <span className='bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent'>Alex Cedillo</span>
            </h1>
            <p className='mt-4 text-lg text-sky-400 font-semibold sm:text-xl'>Desarrollador Web Front-End</p>
            <p className='mt-6 max-w-2xl text-lg text-neutral-300'>Transformando ideas en experiencias digitales inolvidables, atractivas y funcionales.</p>
            <a href="#projects" className='mt-8 inline-block rounded-md bg-sky-500 px-8 py-3 font-medium text-white transition-transform duration-300 hover:bg-sky-600 hover:scale-105'>Ver mis proyectos</a>
        </section>

        {/* About Section */}
        <AnimatedSection id="about">
             <h2 className="text-3xl font-bold text-center text-neutral-100 sm:text-4xl">Sobre mí</h2>
            <p className='mt-4 text-lg text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed'>¡Hola! Soy Alex Cedillo, un apasionado desarrollador web front-end. Me especializo en transformar ideas en experiencias digitales inolvidables, utilizando tecnologías modernas como React y Next.js. Mi objetivo es diseñar interfaces de usuario intuitivas que no solo sean visualmente atractivas, sino también funcionales y accesibles.</p>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects">
            <h2 className="text-3xl font-bold text-center text-neutral-100 sm:text-4xl">Proyectos</h2>
            <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {projects.map((project, index) => (
                    <div key={index} className="group relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 shadow-lg transition-all duration-300 hover:shadow-sky-400/20 hover:-translate-y-2">
                        <img src={project.image} alt={project.title} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-neutral-100">{project.title}</h3>
                            <p className="mt-2 text-neutral-400 flex-grow">{project.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                <span key={tag} className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-sky-400">{tag}</span>
                                ))}
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Ver en vivo</a>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-sky-400"><FaGithub size={24} /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>

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
        </>
    )
}

export default HomePage