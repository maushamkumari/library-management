import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const Spinner = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={clsx(
        'border-3 border-slate-200 dark:border-slate-700 border-t-primary-500 rounded-full',
        sizes[size],
        className
      )}
    />
  );
};

export const Skeleton = ({ className, count = 1, width = 'w-full', height = 'h-4' }) => {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array(count).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className={clsx(
            width,
            height,
            'bg-slate-200 dark:bg-slate-700 rounded',
            'animate-shimmer bg-gradient-to-r from-slate-200 via-white to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700'
          )}
          style={{
            backgroundSize: '1000px 100%',
          }}
          animate={{
            backgroundPosition: ['1000px 0', '-1000px 0'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export const SkeletonCard = ({ count = 1 }) => {
  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, i) => (
        <div
          key={i}
          className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6 space-y-4"
        >
          <Skeleton height="h-6" width="w-2/3" />
          <Skeleton height="h-4" count={2} />
          <Skeleton height="h-10" />
        </div>
      ))}
    </div>
  );
};

export const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-slate-600 dark:text-slate-400 text-sm">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-light-bg dark:bg-dark-bg z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {content}
    </div>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg flex items-center justify-center z-50">
    <Spinner size="lg" />
  </div>
);
