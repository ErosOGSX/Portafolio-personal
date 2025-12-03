import { create } from 'zustand';

export const useUiStore = create((set, get) => ({
    // ? CONTROLA SI HAY ALGUN MODAL ABIERTO Y QUE TIPO ES
    isModalOpen: false,
    modalType: null,
    modalData: null,

    // TODO: ABRIR CUALQUIER MODAL CON SUS DATOS
    openModal: (type, data = null) => set({
        isModalOpen: true,
        modalType: type,
        modalData: data,
    }),

    // ! CERRAR MODAL Y LIMPIAR DATOS
    closeModal: () => set({
        isModalOpen: false,
        modalType: null,
        modalData: null,
    }),

    // ? SECCION ACTIVA PARA EL SCROLL SPY DEL NAVBAR
    activeSection: null,
    setActiveSection: (sectionId) => set({ activeSection: sectionId }),

    // ! SISTEMA DE TOASTS PARA MOSTRAR MENSAJES AL USUARIO
    notification: {
        message: '',
        type: 'success',
        isVisible: false,
    },

    showNotification: (notificationData) => {
        set({
            notification: {
                ...notificationData,
                isVisible: true,
            }
        })

        // TODO: AUTO-OCULTAR NOTIFICACION DESPUES DE 3 SEGUNDOS
        setTimeout(() => {
            get().hideNotification()
        }, 3000)
    },

    hideNotification: () => set({
        notification: {
        message: '',
        type: 'success',
        isVisible: false,
        }
    })

}))


