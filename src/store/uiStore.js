import { create } from 'zustand';

const useUiStore = create((set, get) => ({
    isModalOpen: false,
    modalType: null,
    modalData: null,

    openModal: (type, data = null) => set({
        isModalOpen: true,
        modalType: type,
        modalData: data,
    }),

    closeModal: () => set({
        isModalOpen: false,
        modalType: null,
        modalData: null,
    }),

    activeSection: null,
    setActiveSection: (sectionId) => set({ activeSection: sectionId }),

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

export default useUiStore

