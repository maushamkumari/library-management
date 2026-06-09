import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  FaBell,
  FaMoon,
  FaSun,
  FaSearch,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = ({ onSidebarToggle }) => {
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="sticky top-0 z-40 bg-light-card dark:bg-dark-sidebar border-b border-light-border dark:border-dark-border backdrop-blur-glass">
      <div className="h-16 px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            onClick={onSidebarToggle}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-96 items-center gap-3 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <FaSearch className="text-slate-400 dark:text-slate-600" size={16} />
            <input
              type="text"
              placeholder="Search books, students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1 text-light-text dark:text-dark-text placeholder-slate-500"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            >
              <FaBell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-2xl p-4"
                >
                  <h3 className="font-semibold mb-3 text-light-text dark:text-dark-text">
                    Notifications
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                      >
                        <p className="font-medium">Book overdue</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          "Advanced React" is overdue by 2 days
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowProfile(!showProfile)}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg',
                'hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors',
                'hidden sm:flex'
              )}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-semibold">
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-light-text dark:text-dark-text">
                  {user?.username || 'User'}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Admin</p>
              </div>
              <FaChevronDown
                size={12}
                className={clsx(
                  'transition-transform',
                  showProfile && 'rotate-180'
                )}
              />
            </motion.button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-light-border dark:border-dark-border">
                    <p className="text-sm font-medium text-light-text dark:text-dark-text">
                      {user?.username}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </div>

                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm text-left text-slate-700 dark:text-slate-300">
                      <FaUser size={16} />
                      View Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm text-left text-slate-700 dark:text-slate-300">
                      <FaCog size={16} />
                      Settings
                    </button>
                    <hr className="my-2 border-light-border dark:border-dark-border" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm text-left text-danger">
                      <FaSignOutAlt size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const BreadcrumbNav = ({ items }) => (
  <nav className="flex items-center gap-2 mb-6 text-sm">
    {items.map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        {idx > 0 && <span className="text-slate-400">/</span>}
        {item.href ? (
          <a href={item.href} className="text-primary-500 hover:text-primary-600">
            {item.label}
          </a>
        ) : (
          <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
        )}
      </div>
    ))}
  </nav>
);
