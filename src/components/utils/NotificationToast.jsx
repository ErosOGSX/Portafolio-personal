
import { useUiStore } from '../../store/uiStore';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationToast = () => {
  const notification = useUiStore((state) => state.notification);
  const hideNotification = useUiStore((state) => state.hideNotification);
  
  if (!notification || !notification.isVisible) {
    return null;
  }

  const { message, type } = notification;

  const isSuccess = type === 'success';
  const Icon = isSuccess ? FaCheckCircle : FaTimesCircle;
  const bgColor = isSuccess ? 'bg-green-600' : 'bg-red-600';
  const borderColor = isSuccess ? 'border-green-700' : 'border-red-700';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed bottom-5 right-5 z-50 flex items-center justify-between w-full max-w-sm p-4 text-white rounded-lg shadow-lg border ${bgColor} ${borderColor}`}
      >
        <div className="flex items-center">
          <Icon size={24} className="mr-3" />
          <p className="font-medium">{message}</p>
        </div>
        <button onClick={hideNotification} className="p-1 rounded-full hover:bg-black/20" aria-label="Cerrar notificación">
          <FaTimes size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};