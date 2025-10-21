import { useState, useRef } from 'react'
import AnimatedSection from '../utils/AnimatedSection'

//? DATOS DE LAS SKILLS
import skills from '../../datas/Skills-data'

const Skills = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef(null)

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y })
    }

    return(
        <AnimatedSection id='skills'>

            <h2 className='text-3xl font-bold text-center text-neutral-100 sm:text-4xl'>Habilidades</h2>

            <div ref={containerRef} onMouseMove={handleMouseMove} className='relative mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 border border-neutral-800 rounded-xl p-4' style={{'--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px`, background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.15), transparent 80%)`}}>

                {skills.map((skill) => {
                    const { IconComponent } = skill;
                    return(
                        <div key={skill.name} className='group flex flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900/50 p-6 border border-neutral-800 transition-all duration-300 hover:border-sky-400/50 hober:bg-neutral-800/60'>

                            <div className='text-sky-400 transition-transform duration-300 group-hover:scake-110'>

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