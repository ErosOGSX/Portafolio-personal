import { useState, useEffect } from 'react';
import { FaTimes, FaFolder, FaReact, FaJs, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from "../../store/uiStore";

const VSCodeModal = () => {
  const { closeModal, modalData } = useUiStore();
  const [activeProject, setActiveProject] = useState(0);
  const [activeFile, setActiveFile] = useState('App.jsx');

  const projects = modalData || [];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const getProjectIcon = (project) => {
    const tech = project.tags?.[0]?.toLowerCase();
    if (tech?.includes('react')) return <FaReact className="text-blue-400" />;
    if (tech?.includes('javascript')) return <FaJs className="text-yellow-400" />;
    if (tech?.includes('css')) return <FaCss3Alt className="text-blue-500" />;
    return <FaHtml5 className="text-orange-500" />;
  };

  const getCodeExample = (project) => {
    return `// ${project.title}
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>${project.title}</h1>
        <p>${project.description}</p>
      </header>
      
      <main className="main-content">
        {/* ! TODAS LAS TECNOLOGIAS QUE USE EN ESTE PROYECTO */}
        <div className="tech-stack">
          ${project.tags?.map(tag => `<span className="tech-tag">${tag}</span>`).join('\n          ') || ''}
        </div>
      </main>
    </div>
  );
}

export default App;`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md'
        onClick={closeModal}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className='relative w-[95vw] h-[90vh] bg-gray-900 rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          {/* ! BARRA DE TITULO IGUAL QUE VS CODE REAL */}
          <div className='flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-red-500 rounded-full'></div>
              <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
              <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              <span className='text-gray-300 text-sm ml-4'>Portfolio - CodeCraft Studio</span>
            </div>
            <button onClick={closeModal} className='text-gray-400 hover:text-white'>
              <FaTimes size={16} />
            </button>
          </div>

          <div className='flex flex-1 overflow-hidden'>
            {/* TODO: SIDEBAR CON TODOS MIS PROYECTOS COMO ARCHIVOS */}
            <div className='w-64 bg-gray-800 border-r border-gray-700 flex flex-col'>
              <div className='p-3 border-b border-gray-700'>
                <h3 className='text-gray-300 text-sm font-semibold flex items-center gap-2'>
                  <FaFolder size={14} />
                  PROYECTOS
                </h3>
              </div>
              <div className='flex-1 overflow-y-auto'>
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    onClick={() => setActiveProject(index)}
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-700 ${
                      activeProject === index ? 'bg-gray-700 border-r-2 border-blue-400' : ''
                    }`}
                  >
                    {getProjectIcon(project)}
                    <span className='text-gray-300 text-sm truncate'>{project.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ! AREA DEL EDITOR DONDE SE MUESTRA EL CODIGO */}
            <div className='flex-1 flex flex-col'>
              {/* ? PESTAÑAS DE ARCHIVOS COMO EN VS CODE */}
              <div className='flex bg-gray-800 border-b border-gray-700'>
                <div className='flex items-center gap-2 px-4 py-2 bg-gray-900 border-r border-gray-700'>
                  <FaReact size={14} className='text-blue-400' />
                  <span className='text-gray-300 text-sm'>{activeFile}</span>
                </div>
              </div>

              {/* ! AQUI ES DONDE LA MAGIA SUCEDE - EL EDITOR DE CODIGO */}
              <div className='flex-1 bg-gray-900 p-4 overflow-auto'>
                <div className='font-mono text-sm text-gray-300 leading-relaxed'>
                  <pre className='whitespace-pre-wrap'>
                    <code dangerouslySetInnerHTML={{
                      __html: getCodeExample(projects[activeProject] || {})
                        .replace(/(import|export|function|return|const|let|var)/g, '<span style="color: #c586c0;">$1</span>')
                        .replace(/(React|App|className)/g, '<span style="color: #4ec9b0;">$1</span>')
                        .replace(/('.*?'|".*?")/g, '<span style="color: #ce9178;">$1</span>')
                        .replace(/(\/\/.*)/g, '<span style="color: #6a9955;">$1</span>')
                        .replace(/(<\/?[^>]+>)/g, '<span style="color: #569cd6;">$1</span>')
                    }} />
                  </pre>
                </div>
              </div>

              {/* ? BARRA DE ESTADO CON INFO DEL ARCHIVO ACTUAL */}
              <div className='bg-blue-600 px-4 py-1 flex items-center justify-between text-xs text-white'>
                <div className='flex items-center gap-4'>
                  <span>React JSX</span>
                  <span>UTF-8</span>
                  <span>Ln 1, Col 1</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span>{projects[activeProject]?.tags?.join(', ') || 'JavaScript'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VSCodeModal;