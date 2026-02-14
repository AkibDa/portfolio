import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GmailConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DEFAULT_TITLE = 'Open Gmail?';
const DEFAULT_MESSAGE =
  "You're about to open Gmail to send me a message. Would you like to continue?";

const GmailConfirmModal: React.FC<GmailConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gmail-confirm-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gmail-confirm-modal-title"
          aria-describedby="gmail-confirm-modal-desc"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-sm rounded-2xl shadow-2xl
              bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10
              p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="gmail-confirm-modal-title"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              {title}
            </h2>
            <p
              id="gmail-confirm-modal-desc"
              className="text-sm text-gray-600 dark:text-gray-300 mb-6"
            >
              {message}
            </p>
            <div className="flex gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium
                  text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800
                  hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium
                  text-white bg-indigo-600 hover:bg-indigo-700
                  transition-colors active:scale-[0.98]"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GmailConfirmModal;
