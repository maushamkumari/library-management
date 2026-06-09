import React from 'react';
import clsx from 'clsx';

export const Input = React.forwardRef(
  ({ className, type = 'text', label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={clsx(
            'w-full px-4 py-2.5 rounded-lg',
            'bg-light-card dark:bg-dark-card',
            'border border-light-border dark:border-dark-border',
            'text-light-text dark:text-dark-text',
            'placeholder-slate-400 dark:placeholder-slate-600',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-all duration-200',
            error && 'border-danger ring-2 ring-danger/20',
            className
          )}
          {...props}
        />
        {helperText && (
          <p className={clsx(
            'mt-1 text-sm',
            error ? 'text-danger' : 'text-slate-600 dark:text-slate-400'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = React.forwardRef(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'w-full px-4 py-2.5 rounded-lg',
            'bg-light-card dark:bg-dark-card',
            'border border-light-border dark:border-dark-border',
            'text-light-text dark:text-dark-text',
            'placeholder-slate-400 dark:placeholder-slate-600',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-all duration-200 resize-vertical',
            error && 'border-danger ring-2 ring-danger/20',
            className
          )}
          {...props}
        />
        {helperText && (
          <p className={clsx(
            'mt-1 text-sm',
            error ? 'text-danger' : 'text-slate-600 dark:text-slate-400'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export const Select = React.forwardRef(
  ({ className, label, error, helperText, options = [], ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'w-full px-4 py-2.5 rounded-lg',
            'bg-light-card dark:bg-dark-card',
            'border border-light-border dark:border-dark-border',
            'text-light-text dark:text-dark-text',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-all duration-200 cursor-pointer',
            error && 'border-danger ring-2 ring-danger/20',
            className
          )}
          {...props}
        >
          <option value="">Select an option...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helperText && (
          <p className={clsx(
            'mt-1 text-sm',
            error ? 'text-danger' : 'text-slate-600 dark:text-slate-400'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
