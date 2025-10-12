import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    return(
        <footer className='border-t border-neutral-800 mt-24'>
            <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between px-6 py-8 sm:flex-row'>
                <p className='text-neutral-400'>© {new Date().getFullYear()} Alex Cedillo. Todos los derechos reservados.</p>
                <div className='flex space-x-4 mt-4 sm:mt-0'>
                    <a href="https://github.com/ErosOGSX" target='_blank' rel='noopener noreferrer' className='text-neutral-400 hover:text-sky-400 transition-colors'><FaGithub size={24}/></a>
                    <a href="https://linkedin.com/in/ErosOGSX" target='_blank' rel='noopener noreferrer' className='text-neutral-400 hover:text-sky-400 transition-colors'><FaLinkedin size={24}/></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer