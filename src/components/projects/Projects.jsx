import React from 'react'
import AnimatedSection from '../utils/AnimatedSection'
import ProjectsCards from './ProjectsCards'

const Projects = ({projects}) => {
    return (
        <AnimatedSection id='projects'>
            <h2 className='text-3xl font-bold text-center text-neutral-100 sm:text-4xl'>Proyectos</h2>

            <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {projects.map ((project) => (
                    <ProjectsCards key={project.title} project={project} />
                ))}
            </div>

        </AnimatedSection>
    )
}

export default Projects