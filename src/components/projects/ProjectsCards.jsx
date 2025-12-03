import { FaGithub, FaCode } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PropTypes from 'prop-types'
import { useUiStore } from '../../store/uiStore'
import allProjects from '../../datas/Projects-data'

const ProjectsCards = ({ project }) => {
    const { image, title, description, tags, liveUrl, githubUrl} = project
    const openModal = useUiStore((state) => state.openModal)
    
    const handleCodeClick = () => {
        openModal('vscode', allProjects)
    }

    return (
        <div className='group card-tilt relative flex flex-col overflow-hidden rounded-lg bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 shadow-lg transition-all duration-300 hover:shadow-sky-400/20 hover:-translate-y-2'>

            <LazyLoadImage src={image}
            alt={title}
            effect='blur'
            className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105' height={192} width={400} />
            
            <div className='p-6 flex flex-col flex-grow'>
                
                <h3 className='text-xl font-bold text-neutral-100'> {title} </h3>
                <p className='mt-2 text-neutral-400 flex-grow'> {description} </p>

                <div className='mt-4 flex flex-wrap gap-2'> {tags.map(tag =>(
                    <span key={tag} className='rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-sky-400'> {tag} </span>
                ))} 
                </div>

                <div className='mt-6 flex items-center justify-between'>
                    <a href={liveUrl} target='_blank' rel='noopener noreferrer' className='text-sky-400 hover:underline'>Ver en vivo</a>
                    <div className='flex gap-3'>
                        <button onClick={handleCodeClick} className='text-neutral-400 hover:text-sky-400 transition-colors'>
                            <FaCode size={24} />
                        </button>
                        <a href={githubUrl} target='_blank' rel='noopener noreferrer' className='text-neutral-400 hover:text-sky-400'>
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>

            </div>

        </div>
    )
}
ProjectsCards.propTypes = {
    project: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        liveUrl: PropTypes.string,
        githubUrl: PropTypes.string,
    }).isRequired,
}

export default ProjectsCards
