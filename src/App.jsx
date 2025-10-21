import { useRef, useEffect } from 'react';
import { useUiStore } from './store/uiStore';

//? IMPORTACIONES DE DATOS
import allProjects from './datas/Projects-data';

//? IMPORTACIONES DE COMPONENTES
import Navbar from './components/layout/header/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Projects from './components/projects/Projects';
import Footer from './components/layout/footer/Footer';
import AnimatedSection from './components/utils/AnimatedSection';
import ContactForm from './components/contact/ContactForm';
import ProjectsModal from './components/modals/ProjectsModal';
import { NotificationToast } from './components/utils/NotificationToast'
import Skills from './components/skills/Skills';


function App() {
   const { isModalOpen, modalType, setActiveSection } = useUiStore();
   const projectsToShowOnPage = allProjects.slice(0, 3);

   //? LAS REFES PARA EL INTERSECTIONOBSERVER
   const heroRef = useRef(null);
   const aboutRef = useRef(null);
   const projectsRef = useRef(null);
   const skillsRef = useRef(null);
   const contactRef = useRef(null);

   useEffect(() => {
    const sections = [
      { id: 'hero', ref: heroRef },
      { id: 'about', ref: aboutRef },
      { id: 'projects', ref: projectsRef },
      { id: 'skills', ref: skillsRef },
      { id: 'contact', ref: contactRef },
    ];

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
   }, [setActiveSection]);


  return (
    <div className="bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      {/* NAVBAR SECTION */}

      <Navbar />

      <main className="container mx-auto px-4">
        <div ref={heroRef} id="hero"><Hero /></div>
        <div ref={aboutRef} id="about"><About /></div>
        <div ref={projectsRef} id="projects">
          <Projects projectsToShow={projectsToShowOnPage} allProjects={allProjects} />
        </div>
        
        {/* SKILLS SECTION */}

          <div ref={skillsRef}>
            <Skills />
          </div>
        
          {/* CONTACT SECTION */}


          <AnimatedSection ref={contactRef} id="contact">
              <h2 className='text-3xl font-bold text-center text-neutral-100 sm:text-4xl'>Contacto</h2>
              <p className='mt-6 max-w-2xl mx-auto text-center text-lg text-neutral-300'>¿Interesado en colaborar o tienes alguna pregunta? Rellena el formulario de abajo.</p>
              <ContactForm />
          </AnimatedSection>

      </main>


        {/* FOOTER SECTION */}
      <Footer />

      {isModalOpen && modalType === 'projects' && <ProjectsModal />}


        {/* NOTIFICATION */}

        <NotificationToast />

    </div>
  );
}

export default App
 