import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const SyntaxHighlight = () => {
  const codeRef = useRef(null);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const codeExample = `const developer = {
  name: "Alex Cedillo",
  skills: ["React", "JavaScript", "CSS"],
  passion: "Frontend Development",
  createMagic: () => {
    return "Amazing User Experiences";
  }
};`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCode();
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

  const animateCode = () => {
    if (!codeRef.current) return;

    const codeElement = codeRef.current;
    const lines = codeExample.split('\n');
    
    codeElement.innerHTML = '';

    lines.forEach((line, lineIndex) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'code-line break-words';
      lineDiv.style.color = '#d1d5db';
      lineDiv.style.minHeight = '1.5em';
      lineDiv.style.wordBreak = 'break-word';
      lineDiv.style.overflowWrap = 'break-word';
      codeElement.appendChild(lineDiv);

      // Efecto typewriter para cada línea
      setTimeout(() => {
        let currentText = '';
        let charIndex = 0;
        
        const typeChar = () => {
          if (charIndex < line.length) {
            currentText += line[charIndex];
            
            // Aplicar colores después de escribir
            let coloredText = currentText
              .replace(/\b(const|return|function)\b/g, '<span style="color: #a855f7; font-weight: bold;">$1</span>')
              .replace(/\b(name|skills|passion|createMagic)\b/g, '<span style="color: #67e8f9;">$1</span>')
              .replace(/("[^"]*")/g, '<span style="color: #4ade80;">$1</span>')
              .replace(/(\[[^\]]*\])/g, '<span style="color: #facc15;">$1</span>')
              .replace(/(=>|\{|\}|:|\(|\)|;|,)/g, '<span style="color: #38bdf8;">$1</span>');
            
            lineDiv.innerHTML = coloredText + '<span class="animate-pulse">|</span>';
            charIndex++;
            setTimeout(typeChar, 50);
          } else {
            // Remover cursor al terminar
            let finalText = currentText
              .replace(/\b(const|return|function)\b/g, '<span style="color: #a855f7; font-weight: bold;">$1</span>')
              .replace(/\b(name|skills|passion|createMagic)\b/g, '<span style="color: #67e8f9;">$1</span>')
              .replace(/("[^"]*")/g, '<span style="color: #4ade80;">$1</span>')
              .replace(/(\[[^\]]*\])/g, '<span style="color: #facc15;">$1</span>')
              .replace(/(=>|\{|\}|:|\(|\)|;|,)/g, '<span style="color: #38bdf8;">$1</span>');
            lineDiv.innerHTML = finalText;
          }
        };
        
        typeChar();
      }, lineIndex * 800);
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
      <div ref={codeRef} className="text-gray-300 leading-relaxed"></div>
    </div>
  );
};

export default SyntaxHighlight;