import React from 'react'
import { FaGithub } from 'react-icons/fa'

const ProjectsCards = ({ project }) => {
    const { image, title, description, tags, liveUrl, githubUrl} = project

    return (
        <div className='group relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 shadow-lg transition-all duration-300 hover:shadow-sky-400/20 hover:-translate-y-2'>

            <img src={image}
            alt={title}
            className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105' />
            
            <div className='p-6 flex flex-col flox-grow'>
                
                <h3 className='text-xl font-bold text-neutral-100'> {title} </h3>
                <p className='mt-2 text-neutral-400 flex-grow'> {description} </p>

                <div className='mt-4 flex flex-wrap gap-2'> {tags.map(tag =>(
                    <span key={tag} className='rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-sky-400'> {tag} </span>
                ))} 
                </div>

                <div className='mt-6 flex items-center justify-between'>
                    <a href={liveUrl} target='_blank' rel='noopener noreferrer' className='text-sky-400 hover:underline'>Ver en vivo</a>
                    <a href={githubUrl} target='_blank' rel='noopener noreferrer' className='text-neutral-400 hover:text-sky-400'><FaGithub size={24} /></a>
                </div>

            </div>

        </div>
    )
}

export default ProjectsCards