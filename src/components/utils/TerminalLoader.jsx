import { useState, useEffect } from 'react';
import anime from 'animejs';

const TerminalLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // ! COMANDOS QUE SE EJECUTAN PARA "INSTALAR" EL PORTAFOLIO
  const commands = [
    { cmd: 'pnpm install skills', delay: 1000 },
    { cmd: 'pnpm install projects', delay: 1500 },
    { cmd: 'git commit -m "Portfolio"', delay: 2000 },
    { cmd: 'pnpm run dev', delay: 2500 }
  ];

  useEffect(() => {
    // TODO: FUNCION QUE SIMULA ESCRIBIR COMANDOS EN LA TERMINAL
    const typeCommand = (commandText, element) => {
      return new Promise(resolve => {
        let currentText = '';
        let charIndex = 0;
        
        const typeChar = () => {
          if (charIndex < commandText.length) {
            currentText += commandText[charIndex];
            element.textContent = '$ ' + currentText + '|';
            charIndex++;
            setTimeout(typeChar, 50);
          } else {
            element.textContent = '$ ' + currentText;
            resolve();
          }
        };
        
        typeChar();
      });
    };

    const executeCommands = async () => {
      for (let i = 0; i < commands.length; i++) {
        await new Promise(resolve => {
          setTimeout(async () => {
            setCurrentStep(i + 1);
            
            // ! AQUI EJECUTO LA ANIMACION DE TYPEWRITER PARA CADA COMANDO
            const commandElement = document.querySelector(`[data-command="${i}"]`);
            if (commandElement) {
              await typeCommand(commands[i].cmd, commandElement);
              
              // ? MOSTRAR EL CHECKMARK DESPUES DE QUE TERMINE DE ESCRIBIR
              setTimeout(() => {
                const successElement = document.querySelector(`[data-success="${i}"]`);
                if (successElement) {
                  successElement.style.display = 'block';
                }
              }, 300);
            }
            
            resolve();
          }, i === 0 ? commands[i].delay : 800);
        });
      }

      // Esperar un poco y luego ocultar terminal
      setTimeout(() => {
        anime({
          targets: '.terminal-container',
          opacity: [1, 0],
          scale: [1, 0.8],
          duration: 800,
          easing: 'easeInBack',
          complete: () => {
            setIsVisible(false);
            onComplete();
          }
        });
      }, 1000);
    };

    executeCommands();
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="terminal-container bg-gray-900 rounded-lg p-6 w-96 md:w-[85vw] h-[65vh] border border-gray-700 shadow-2xl flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm ml-2">Terminal</span>
        </div>
        
        <div className="font-mono text-sm md:text-base flex-1 flex flex-col justify-center">
          <div className="text-green-400 mb-2">alex@portfolio:~$</div>
          
          {commands.map((command, index) => (
            <div key={index} className={`mb-2 ${index < currentStep ? 'opacity-100' : 'opacity-30'}`}>
              <div className="text-white" data-command={index}>
                {index < currentStep ? '' : `$ ${command.cmd}`}
              </div>
              <div data-success={index} className="text-gray-400 text-xs ml-2" style={{ display: 'none' }}>
                {index === 0 && '✓ Skills loaded successfully'}
                {index === 1 && '✓ Projects installed'}
                {index === 2 && '✓ Portfolio committed'}
                {index === 3 && '🚀 Development server starting...'}
              </div>
            </div>
          ))}
          
          {currentStep === commands.length && (
            <div className="text-cyan-400 mt-4 animate-pulse">
              Portfolio ready! Loading interface...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;