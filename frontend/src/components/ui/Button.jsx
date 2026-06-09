import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(
  ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    children,
    ...props
  }, ref) => {
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-700',
      outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-slate-800',
      ghost: 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
      danger: 'bg-danger text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800',
      success: 'bg-success text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Loading...
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
