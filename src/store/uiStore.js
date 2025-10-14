// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// const useUiStore = create(
//     persist(
//         (set) => ({
//             theme: 'light',
//             isMenuOpen: false,
//             toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light'})),
//             toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen})),
//             closeMenu : () => set({ isMenuOpen: false}),
//         }),

//         { 
//             name: 'ui-storage', 
//             partialize: (state) => ({ theme: state.theme}),
//         }
//     )
// )

// export default useUiStore;