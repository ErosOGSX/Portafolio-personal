import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

const TronLoader = ({ onFinish }) => {
  const loaderRef = useRef(null);
  const circleRef = useRef(null);
  const rainRef = useRef(null);
  const liquidRef = useRef(null);

  const loaderStartRef = useRef(null);
  useEffect(() => {
    loaderStartRef.current = Date.now();
    // Animación de pulso en el círculo exterior
    anime({
      targets: circleRef.current,
      scale: [0.95, 1.08, 1],
      boxShadow: [
        '0 0 0px #00f0ff',
        '0 0 40px #00f0ff',
        '0 0 0px #00f0ff'
      ],
      duration: 1800,
      easing: 'easeInOutSine',
      loop: true
    });

    // Animación de llenado tipo líquido progresiva
    let liquidAnim;
    let mounted = true;
    if (liquidRef.current) {
      let progress = 0;
      const start = performance.now();
      const duration = 4000; // 4 segundos para llegar al 100%
      const animateLiquid = now => {
        if (!mounted) return;
        const elapsed = now - start;
        progress = Math.min(Math.max(elapsed / duration, 0), 1);
        const height = Math.max(0, 96 * progress);
        if (liquidRef.current) {
          liquidRef.current.setAttribute('y', 96 - height);
          liquidRef.current.setAttribute('height', height);
        }
        if (progress < 1) {
          liquidAnim = requestAnimationFrame(animateLiquid);
        }
      };
      liquidAnim = requestAnimationFrame(animateLiquid);
    }
    // Animación de destello en el texto
    anime({
      targets: '.tron-loader-text',
      opacity: [0.5, 1, 0.7, 1],
      filter: [
        'drop-shadow(0 0 0px #00f0ff)',
        'drop-shadow(0 0 12px #00f0ff)',
        'drop-shadow(0 0 0px #00f0ff)'
      ],
      duration: 1200,
      loop: true
    });

    // Lluvia de código azul neón
    const canvas = rainRef.current;
    let rainAnim;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      const cols = Math.floor(w / 20);
      const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const drops = Array(cols).fill(1);
      let lastTime = 0;
      const rainSpeed = 55;
      function drawRain() {
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(0, 0, w, h);
        ctx.font = '18px monospace';
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = '#00f0ff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 12;
          ctx.fillText(text, i * 20, drops[i] * 20);
          ctx.shadowBlur = 0;
          drops[i]++;
          if (drops[i] * 20 > h && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }
      }
      function animateRain(now) {
        if (!lastTime || now - lastTime > rainSpeed) {
          drawRain();
          lastTime = now;
        }
        rainAnim = requestAnimationFrame(animateRain);
      }
      rainAnim = requestAnimationFrame(animateRain);
    }

    // Fade out del loader tras 4.5s
    let finished = false;
    const safeFinish = () => {
      if (!finished) {
        finished = true;
        const loaderEnd = Date.now();
        const elapsed = ((loaderEnd - loaderStartRef.current) / 1000).toFixed(2);
        // Log consola
        console.log(`Duración real del loader: ${elapsed} segundos`);
        if (typeof onFinish === 'function') onFinish();
      }
    };
    const timeout = setTimeout(() => {
      anime({
        targets: loaderRef.current,
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutQuad',
        complete: safeFinish
      });
      setTimeout(safeFinish, 900);
    }, 4500);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      cancelAnimationFrame(rainAnim);
      if (liquidAnim) cancelAnimationFrame(liquidAnim);
      safeFinish();
    };
  }, [onFinish]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black" style={{transition: 'opacity 0.7s'}}>
      {/* Lluvia de código azul neón */}
      <canvas ref={rainRef} className="absolute inset-0 w-full h-full -z-10" style={{ pointerEvents: 'none' }}></canvas>
      <div className="relative flex flex-col items-center justify-center">
        {/* Círculo central con animación de llenado */}
        <div ref={circleRef} className="w-24 h-24 rounded-full border-4 border-cyan-400 shadow-[0_0_40px_#00f0ff] flex items-center justify-center overflow-hidden" style={{ boxShadow: '0 0 40px #00f0ff', background: 'rgba(0,16,32,0.7)' }}>
          <svg width="96" height="96" viewBox="0 0 96 96" className="absolute">
            <rect ref={liquidRef} x="0" y="96" width="96" height="0" fill="#00f0ff" opacity="0.7" />
            <circle cx="48" cy="48" r="44" stroke="#00f0ff" strokeWidth="4" fill="none" opacity="0.2" />
          </svg>
        </div>
        {/* Texto con animación de destello */}
        <div className="mt-8 text-cyan-400 text-xl font-mono tracking-widest tron-loader-text" style={{filter: 'drop-shadow(0 0 12px #00f0ff)'}}>
          <span>INICIANDO...</span>
        </div>
      </div>
    </div>
  );
};

TronLoader.propTypes = {
  onFinish: PropTypes.func
};
export default TronLoader;
