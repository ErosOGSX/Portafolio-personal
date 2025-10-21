import PropTypes from 'prop-types'
import AnimatedSection from '../utils/AnimatedSection'
import ProjectsCards from './ProjectsCards'
import { useUiStore } from '../../store/uiStore'
import { forwardRef } from 'react'

const Projects = forwardRef(({ projectsToShow, allProjects }, ref) => {
    const openModal = useUiStore((state) => state.openModal)
    return(
        
            <AnimatedSection ref={ref} id="projects">

                <h2 className='text-3xl font-bold text-center text-neutral-100 sm:text-4xl'>Proyectos</h2>

                <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                    {projectsToShow.map((project) => (
                        <ProjectsCards key={project.title} project={project} />
                    ))}
                </div>

                <div className='mt-12 text-center'>
                    <button onClick={() => openModal('projects', allProjects)} className='inline-block rounded-md bg-sky-500 px-8 py-3 font-medium text-white transition-transform duration-300 hover:bg-sky-600 hover:scale-105'>Ver todos los proyectos</button>
                </div>

            </AnimatedSection>
    )
})

Projects.displayName = 'Projects'

Projects.propTypes = {
    projectsToShow: PropTypes.array.isRequired,
    allProjects: PropTypes.array.isRequired,
}

export default Projects


