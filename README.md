# Portafolio Personal - Alex Cedillo (ErosOGSX)

Este es el repositorio de mi portafolio personal, una Single Page Application (SPA) moderna y responsiva, diseñada para mostrar mis habilidades, proyectos y experiencia como desarrollador web Front-End. El objetivo principal es presentar mi trabajo de una manera limpia, profesional y altamente interactiva.

**➡️ Visita la versión en vivo:** `[AÚN NO ESTÁ DESPLEGADO]`

---

## ✨ Características Principales

-   **Diseño Moderno y Minimalista:** Interfaz limpia con un tema oscuro y acentos de color vibrantes para una experiencia visual agradable.
-   **Arquitectura Basada en Componentes:** Construido con una filosofía modular que favorece la mantenibilidad y escalabilidad.
-   **Animaciones Sutiles:** Uso de `Framer Motion` para animar la aparición de secciones al hacer scroll, mejorando la experiencia de usuario.
-   **Modal Interactivo de Proyectos:** Una galería completa de proyectos se muestra en un modal con filtros, evitando saturar la página principal. *(Funcionalidad en desarrollo)*
-   **Estado Global Centralizado:** Gestión eficiente de la UI a través de Zustand para funcionalidades complejas como el gestor de modales.
-   **Totalmente Responsivo:** Adaptado para una visualización perfecta en dispositivos móviles, tabletas y ordenadores de escritorio.

## 🛠️ Stack Tecnológico

-   **Framework Principal:** React.js
-   **Entorno de Desarrollo y Build Tool:** Vite
-   **Estilos:** Tailwind CSS (con enfoque Utility-First)
-   **Gestión de Estado Global:** Zustand
-   **Animaciones:** Framer Motion
-   **Iconografía:** React Icons

## Tecnologías Utilizadas
- React
- Vite
- JavaScript (ES6+)
- TailwindCSS
- React router DOM
- React hook form
- Zustand
- Yup
- Framer Motion 

---

## 🏗️ Estructura y Arquitectura del Proyecto

La estructura del proyecto está diseñada para ser intuitiva y escalable, separando claramente las responsabilidades.

```plaintext
Portafolio-Alex/
├── .vscode/
├── node_modules/         # Dependencias del proyecto (instaladas por npm)
├── public/               # Archivos estáticos que no se procesan por Vite
│   └── AC ICON.svg
|
├── src/                  # Directorio principal del código fuente
│   ├── assets/           # Imágenes, fuentes, etc.
│   │   └── project1.png  # (Ejemplo de imagen de proyecto)
│   │
│   ├── components/       # El corazón de la UI, contiene todos los componentes
│   │   ├── about/
│   │   │   └── About.jsx
│   │   │
│   │   ├── contact/      # Formulario de Contacto
│   │   │   └── ContactForm.jsx
│   │   │
│   │   ├── hero/         # Sección de bienvenida (Contiene la información del about)
│   │   │   └── Hero.jsx
│   │   │
│   │   ├── layout/       # Componentes estructurales de la página
│   │   │   ├── footer/
|   |   |   |   └── Footer.jsx
│   │   │   ├── header/
|   |   |   |   └── Navbar.jsx
│   │   │
│   │   ├── modals/       # NUEVA CARPETA: Para todos los componentes de modales
│   │   │   └── ProjectsModal.jsx
│   │   │
│   │   ├── projects/
│   │   │   ├── Projects.jsx
│   │   │   └── ProjectCard.jsx
│   │   │
│   │   ├── skills/       # Modularización de las skills
│   │   │   └── Skills.jsx  
│   │   │
│   │   └── utils/        # Componentes de utilidad o helpers
│   │       └── AnimatedSection.jsx
│   │
│   ├── datas/            # NUEVA CARPETA: Archivos de datos estáticos de la aplicación
│   │   ├── Projects-data.js
│   │   └── Skills-data.js
│   │
│   ├── store/            # Estado global de la aplicación
│   │   └── uiStore.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .eslintrc.cjs         
├── .gitignore    
├── index.html
├── package-lock.json    
├── package.json      
├── postcss.config.js  
├── tailwind.config.js 
└── README.md   
```

### Evolución del Proyecto y Justificación de Cambios

Este proyecto ha pasado por una refactorización arquitectónica clave para mejorar su calidad y mantenibilidad a largo plazo.

1.  **De `HomePage` a `App.jsx`:** Inicialmente, las secciones de contenido residían en un componente `HomePage`, que era renderizado por `App.jsx`. Se decidió **eliminar la capa intermedia de `HomePage`** y ensamblar todas las secciones directamente en `App.jsx`.
    -   **Justificación:** Para una Single Page Application, esta estructura es más directa y legible. `App.jsx` ahora actúa como el único "índice" de la aplicación, simplificando el flujo de datos y la comprensión de la estructura general.

2.  **Modularización de Secciones:** Cada sección de la página (`Hero`, `About`, `Projects`, etc.) se ha extraído a su propia carpeta y archivo de componente.
    -   **Justificación:** Permite el **aislamiento de la lógica y los estilos**, facilita enormemente el **mantenimiento** (si algo falla en los proyectos, solo se revisa `Projects.jsx`), y mejora la **escalabilidad** (añadir una nueva sección es tan simple como crear un nuevo componente e importarlo en `App.jsx`).

3.  **Componentes Reutilizables (ej. `ProjectCard`):** En lugar de definir la estructura de una tarjeta de proyecto múltiples veces, se creó un componente `ProjectCard.jsx`.
    -   **Justificación:** Sigue el principio **DRY (Don't Repeat Yourself)**. Para modificar el estilo de todas las tarjetas, solo se necesita editar un archivo, garantizando consistencia y ahorrando tiempo.

4. **Centralización del Layout en `App.jsx`:** Se eliminó un componente `HomePage` intermedio para que `App.jsx` actúe como el único "índice" de la aplicación.
    -   **Justificación:**  Simplifica la estructura para una SPA. 

5. **Modularización de Componentes:** Cada sección (`Hero`, `About`, `Projects`, etc.) fue extraída a su propio componente.
    -   **Justificación:** Para aislar su lógica y facilitar el mantenimiento (Principio de Responsabilidad Única).

6. **Separación de Datos (`/data`):** Los arrays de proyectos y habilidades se movieron a su propia carpeta `data/`. 
    -   **Justificación:** Esto desacopla los datos de la capa de presentación, haciendo `App.jsx` más limpio y permitiendo que la gestión de la información sea más segura y centralizada.

---

## 🚀 Instalación y Desarrollo Local

Si deseas clonar y ejecutar este proyecto en tu máquina local, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/ErosOGSX/Portafolio-personal.git
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd Portafolio-personal
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite en tu terminal).

---

*Este README se mantiene actualizado para reflejar el estado actual y la evolución del proyecto.*