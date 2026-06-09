import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  gradient = 'from-primary-500 to-secondary-500',
  className,
  isLoading = false 
}) => {
  const containerVariants = {
    idle: { y: 0 },
    hover: { y: -5 },
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 },
  };

  return (
    <motion.div
      variants={containerVariants}
      whileHover="hover"
      initial="idle"
      className={clsx(
        'relative overflow-hidden rounded-xl p-6',
        'bg-gradient-to-br',
        gradient,
        'text-white shadow-lg',
        'border border-white/10',
        className
      )}
    >
      {/* Animated Background */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm opacity-20" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
            {isLoading ? (
              <div className="h-8 w-24 bg-white/20 rounded animate-pulse" />
            ) : (
              <h3 className="text-3xl font-bold text-white">{value}</h3>
            )}
          </div>

          <motion.div
            variants={iconVariants}
            className="p-3 bg-white/20 rounded-lg backdrop-blur-sm"
          >
            {Icon && <Icon size={24} className="text-white" />}
          </motion.div>
        </div>

        {trend && (
          <div className={clsx(
            'text-sm font-medium',
            trend.value >= 0 ? 'text-green-200' : 'text-red-200'
          )}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const CompactStatCard = ({ title, value, icon: Icon, className }) => (
  <div className={clsx(
    'flex items-center gap-4 p-4 rounded-lg',
    'bg-light-card dark:bg-dark-card',
    'border border-light-border dark:border-dark-border',
    className
  )}>
    {Icon && (
      <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
        <Icon size={20} className="text-primary-500" />
      </div>
    )}
    <div>
      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{title}</p>
      <p className="text-lg font-semibold text-light-text dark:text-dark-text">{value}</p>
    </div>
  </div>
);
