import { useState, useEffect } from 'react'
import ProjectsCards from '../projects/ProjectsCards'
import { FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useUiStore } from "../../store/uiStore";

const ProjectsModal = () => {
    const {closeModal, modalData} = useUiStore();
    const [activeFilter, setActiveFilter] = useState('Todos');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }

        return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

    const allProjects = modalData;
    if (!allProjects) {return null}

    const allTags = ['Todos', ...new Set(allProjects.flatMap(p => p.tags))]

    const filteredProjects = activeFilter === 'Todos'
    ? allProjects
    : allProjects.filter(project => project.tags.includes(activeFilter));


    return (
        <AnimatePresence>

            <motion.div
            initial= {{ opacity: 0 }}
            animate= {{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'
            onClick={closeModal}
            >
            
                <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='relative flex flex-col w-full max-w-4xl h-[90dvh] bg-neutral-900 rounded-lg shadow-xl border border-neutral-800 p-6'
                onClick={(e) => e.stopPropagation()}
                >
                    {/* HEADER DE LOS MODALS */}

                    <div className='flex items-center justify-between pb-4 border-b border-neutral-700'>

                        <h2 className='text-2xl font-bold text-white'>Todos los Proyectos</h2>

                        <button onClick={closeModal} className='p-2 text-neutral-400 rounded-full hover:bg-neutral-700 hover:text-white transition-colors' aria-label='Cerrar modal'>

                            <FaTimes size={20} />

                        </button>

                    </div>

                    {/* FILTROS (PASTILLAS) */}

                    <div className='flex flex-wrap gap-2 py-4'>

                        {allTags.map(tag => (
                            <button key={tag} onClick={() => setActiveFilter(tag)} className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeFilter === tag ? 'bg-sky-500 text-white' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`} > {tag} </button>
                        ))}

                    </div>

                    {/* GRID DE PROYECTOS (CON SCROLL) */}

                    <div className='flex-grow overflow-y-auto pr-2 -mr-2'>

                        {filteredProjects.length > 0 ? (
                            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                
                                {filteredProjects.map(project => (

                                    <ProjectsCards key={project.title} project={project} />

                                ))}

                            </div>
                        ) : (
                            <div className='flex items-center justify-center h-full'>

                                <p className='text-neutral-400'>No hay proyectos que coincidan con el filtro</p>

                            </div>
                        )}

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>
    )
}



export default ProjectsModal