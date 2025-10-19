import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import useUiStore  from '../../../store/uiStore';

const Navbar = () => {
    const activeSection = useUiStore((state) => state.activeSection);

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const navLinks = [
        { href: '#about', label: 'Sobre mí', id: 'about' },
        { href: '#projects', label: 'Proyectos', id: 'projects' },
        { href: '#skills', label: 'Habilidades', id: 'skills' },
        { href: '#contact', label: 'Contacto', id: 'contact' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };
 
    return (
        <header className='sticky top-0 z-50 bg-neutral-950/50 backdrop-blur-lg'>
            <nav className='container mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
                <a href="#hero" className='text-2xl font-bold text-sky-400'>AC</a>

                {/* Navegación para pantallas grandes (Desktop) */}
                <div className='hidden md:flex items-center space-x-8'>
                    {navLinks.map((link) => (
                        <a 
                            key={link.id}
                            href={link.href} 
                            className={`transition-colors duration-300 ${
                                activeSection === link.id
                                    ? 'text-sky-400 font-semibold'
                                    : 'text-neutral-300 hover:text-sky-400'
                            }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Botón de Menú (Móvil) */}
                <div className='md:hidden'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
                        {isMenuOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
                    </button>
                </div>
            </nav>

            {/* Menú desplegable para Móvil */}
            {isMenuOpen && (
                <div className='md:hidden bg-neutral-950'>
                    <div className='flex flex-col items-center space-y-4 py-4'>
                        {navLinks.map((link) => (
                            <a 
                                key={link.id} 
                                href={link.href} 
                                onClick={handleLinkClick} 
                                className={`text-lg transition-colors duration-300 ${
                                    activeSection === link.id
                                        ? 'text-sky-400 font-semibold'
                                        : 'text-neutral-300 hover:text-sky-400'
                                }`}
                            >
                                {link.label}
                            </a>   
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;