import { useState, useRef, useEffect } from 'react'
import anime from 'animejs'
import AnimatedSection from '../utils/AnimatedSection'

// ! IMPORTANDO TODAS LAS HABILIDADES TECNICAS DESDE LA BASE DE DATOS
import skills from '../../datas/Skills-data'

const Skills = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef(null)
    const skillsRef = useRef([])

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y })
    }

    useEffect(() => {
        // TODO: CREAR UNA ANIMACION PARA QUE LAS SKILLS APAREZCAN DE FORMA ESCALONADA
        anime({
            targets: skillsRef.current,
            scale: [0, 1],
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutBounce'
        });
    }, []);

    const handleSkillHover = (index) => {
        anime({
            targets: skillsRef.current[index],
            scale: [1, 1.18, 1.05],
            rotate: [0, 8, 0],
            boxShadow: [
                '0 0 0px rgba(34,211,238,0)',
                '0 0 24px rgba(34,211,238,0.7)',
                '0 0 0px rgba(34,211,238,0)'
            ],
            duration: 600,
            easing: 'easeOutElastic(1, .7)'
        });
    };

    return(
        <AnimatedSection id='skills'>

            <h2 className='text-3xl font-bold text-center text-neutral-100 sm:text-4xl'>Habilidades</h2>

            <div ref={containerRef} onMouseMove={handleMouseMove} className='relative mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 border border-neutral-800 rounded-xl p-4' style={{'--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px`, background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.15), transparent 80%)`}}>

                {skills.map((skill, index) => {
                    const { IconComponent } = skill;
                    return(
                        <div 
                            key={skill.name} 
                            ref={el => skillsRef.current[index] = el}
                            onMouseEnter={() => handleSkillHover(index)}
                            className='group card-tilt flex flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900/50 p-6 border border-neutral-800 transition-all duration-300 hover:border-sky-400/50 hover:bg-neutral-800/60 opacity-0'
                        >
                            <div className='text-sky-400 icon-morph transition-transform duration-300 group-hover:scale-110'>
                                <IconComponent size={40} />
                            </div>
                            <p className='font-semibold text-neutral-300'>{skill.name}</p>
                        </div>
                    )
                })}

            </div>

        </AnimatedSection>
    )
}

export default Skills