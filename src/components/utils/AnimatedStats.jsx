import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const AnimatedStats = () => {
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    { number: 12, label: 'Proyectos Completados', suffix: '+' },
    { number: 3, label: 'Años de Experiencia', suffix: '+' },
    { number: 8, label: 'Tecnologías Dominadas', suffix: '' },
    { number: 100, label: 'Satisfacción del Cliente', suffix: '%' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animar números
            stats.forEach((stat, index) => {
              const element = document.querySelector(`[data-stat="${index}"]`);
              if (element) {
                anime({
                  targets: { count: 0 },
                  count: stat.number,
                  duration: 2000,
                  delay: index * 200,
                  easing: 'easeOutExpo',
                  update: function(anim) {
                    element.textContent = Math.round(anim.animatables[0].target.count);
                  }
                });
              }
            });

            // Animar contenedores
            anime({
              targets: '.stat-item',
              scale: [0.8, 1],
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(150),
              duration: 800,
              easing: 'easeOutElastic(1, .8)'
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={statsRef} className="py-16 bg-neutral-900/50 rounded-xl border border-neutral-800">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item opacity-0">
            <div className="text-3xl md:text-4xl font-bold text-sky-400 mb-2">
              <span data-stat={index}>0</span>
              <span>{stat.suffix}</span>
            </div>
            <p className="text-neutral-300 text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedStats;