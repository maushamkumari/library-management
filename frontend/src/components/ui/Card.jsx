import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const Card = React.forwardRef(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border',
      glass: 'bg-glass-light dark:bg-glass-dark backdrop-blur-glass border border-white/20 dark:border-slate-700/20',
      gradient: 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white',
      elevated: 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-card',
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={clsx(
          'rounded-xl p-6 transition-all duration-300',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, children, ...props }) => (
  <div className={clsx('mb-4 pb-4 border-b border-light-border dark:border-dark-border', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={clsx('text-lg font-semibold text-light-text dark:text-dark-text', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={clsx('text-sm text-slate-600 dark:text-slate-400', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={clsx('', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={clsx('mt-4 pt-4 border-t border-light-border dark:border-dark-border', className)} {...props}>
    {children}
  </div>
);
