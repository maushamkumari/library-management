import React from 'react';
import clsx from 'clsx';

export const Badge = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200',
    secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-200',
    success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-warning text-amber-800 dark:text-amber-100 dark:bg-amber-900',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span 
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const StatusBadge = ({ status, children }) => {
  const statusColors = {
    active: 'success',
    inactive: 'slate',
    pending: 'warning',
    completed: 'success',
    issued: 'primary',
    returned: 'success',
    overdue: 'danger',
    available: 'success',
    unavailable: 'danger',
  };

  return (
    <Badge variant={statusColors[status] || 'slate'} size="sm">
      {children}
    </Badge>
  );
};
