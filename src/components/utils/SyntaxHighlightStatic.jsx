import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const SyntaxHighlightStatic = () => {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);

  // ! AQUI DEFINO TODO MI CODIGO CON COLORES PARA EL SYNTAX HIGHLIGHTING
  const codeLines = [
    { text: 'const', class: 'text-purple-400 font-bold' },
    { text: ' developer = {', class: 'text-sky-400' },
    { text: '\n  ', class: '' },
    { text: 'name', class: 'text-cyan-300' },
    { text: ': ', class: 'text-sky-400' },
    { text: '"Alex Cedillo"', class: 'text-green-400' },
    { text: ',\n  ', class: 'text-sky-400' },
    { text: 'skills', class: 'text-cyan-300' },
    { text: ': ', class: 'text-sky-400' },
    { text: '["React", "JavaScript", "CSS"]', class: 'text-green-400' },
    { text: ',\n  ', class: 'text-sky-400' },
    { text: 'passion', class: 'text-cyan-300' },
    { text: ': ', class: 'text-sky-400' },
    { text: '"Frontend Development"', class: 'text-green-400' },
    { text: ',\n  ', class: 'text-sky-400' },
    { text: 'createMagic', class: 'text-cyan-300' },
    { text: ': () => {\n    ', class: 'text-sky-400' },
    { text: 'return', class: 'text-purple-400 font-bold' },
    { text: ' ', class: '' },
    { text: '"Amazing User Experiences"', class: 'text-green-400' },
    { text: ';\n  }\n};', class: 'text-sky-400' }
  ];

  const totalChars = codeLines.reduce((sum, line) => sum + line.text.length, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startTypewriter();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // TODO: FUNCION QUE HACE EL EFECTO TYPEWRITER LETRA POR LETRA
  const startTypewriter = () => {
    let currentChar = 0;
    const interval = setInterval(() => {
      if (currentChar <= totalChars) {
        setVisibleChars(currentChar);
        currentChar++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  // ? ESTA FUNCION RENDERIZA EL CODIGO CON LOS COLORES CORRECTOS
  const renderCode = () => {
    let charCount = 0;
    return codeLines.map((line, index) => {
      const lineStart = charCount;
      const lineEnd = charCount + line.text.length;
      charCount += line.text.length;

      if (visibleChars <= lineStart) return null;

      const visibleText = line.text.slice(0, Math.max(0, visibleChars - lineStart));
      const showCursor = visibleChars > lineStart && visibleChars <= lineEnd;

      return (
        <span key={index} className={line.class}>
          {visibleText}
          {showCursor && <span className="animate-pulse">|</span>}
        </span>
      );
    });
  };

  return (
    <div ref={containerRef} className="bg-gray-900 rounded-lg p-2 md:p-4 border border-gray-700 font-mono text-xs md:text-sm w-full max-w-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-xs ml-2">portfolio.js</span>
      </div>
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {renderCode()}
      </div>
    </div>
  );
};

export default SyntaxHighlightStatic;