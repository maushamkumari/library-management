import React from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Button } from './Button';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  className 
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={clsx(
              'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
              'w-full mx-4 rounded-xl',
              'bg-light-card dark:bg-dark-card',
              'border border-light-border dark:border-dark-border',
              'shadow-2xl',
              sizes[size],
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
                <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            )}
            <div className="p-6">
              {children}
            </div>
            {footer && (
              <div className="p-6 border-t border-light-border dark:border-dark-border flex justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Dialog = ({ isOpen, onClose, title, description, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', isDangerous = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      {description && (
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {description}
        </p>
      )}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button 
          variant={isDangerous ? 'danger' : 'primary'} 
          onClick={() => {
            onConfirm?.();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};
