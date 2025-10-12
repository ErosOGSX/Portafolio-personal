import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const links = [
        {name:'Sobre mí', href:'#about'},
        {name:'Proyectos', href:'#projects'},
        {name:'Habilidades', href:'#skills'},
        {name:'Contacto', href:'#contact'},
    ];

    return(
        <header className='sticky top-0 z-50 bg-neutral-950/50 backdrop-blur-lg'>
            <nav className='container mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
                <a href="#" className='text-2xl font-bold text-sky-400'>AC</a>
                <div className='hidden md:flex items-center space-x-8'>
                    {links.map((link) => (
                        <a key={link.name} href={link.href} className='text-neutral-300 hover:text-sky-400 transition-colors duration-300'>{link.name}</a>
                    ))}
                </div>
                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
                    </button>
                </div>
            </nav>
                    {isOpen && (
                        <div className='md:hidden bg-neutral-950'>
                            <div className='flex flex-col items-center space-y-4 py-4'>
                                {links.map((link) => (
                                    <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className='text-neutral-300 hover:text-sky-400 transition-colors duration-300'>{link.name}</a>   
                                ))}
                            </div>
                        </div>
                    )}

        </header>
    )
}

export default Navbar