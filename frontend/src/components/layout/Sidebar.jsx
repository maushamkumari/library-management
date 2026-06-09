import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { 
  FaBars, 
  FaTimes, 
  FaBook, 
  FaHome, 
  FaTags, 
  FaUsers, 
  FaFileAlt, 
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaExchangeAlt
} from 'react-icons/fa';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FaHome, href: '/dashboard' },
  { id: 'books', label: 'Books', icon: FaBook, href: '/books' },
  { id: 'categories', label: 'Categories', icon: FaTags, href: '/categories' },
  { id: 'students', label: 'Students', icon: FaUsers, href: '/students' },
  { id: 'issue', label: 'Issue Books', icon: FaFileAlt, href: '/issue-books' },
  { id: 'return', label: 'Return Books', icon: FaExchangeAlt, href: '/return-books' },
  { id: 'reports', label: 'Reports', icon: FaChartBar, href: '/reports' },
  { id: 'settings', label: 'Settings', icon: FaCog, href: '/settings' },
];

export const Sidebar = ({ isMobile = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' },
  };

  const activeMenu = menuItems.find(item => item.href === location.pathname);

  return (
    <>
      {isMobile && isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <motion.div
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        className={clsx(
          'fixed left-0 top-0 h-screen z-50',
          'bg-light-card dark:bg-dark-sidebar',
          'border-r border-light-border dark:border-dark-border',
          'flex flex-col transition-all duration-300',
          isMobile && !isExpanded && '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-light-border dark:border-dark-border">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold">
                📚
              </div>
              <span className="font-bold text-lg text-light-text dark:text-dark-text">LibMgmt</span>
            </motion.div>
          )}
          {isMobile && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-light-text dark:text-dark-text p-2"
            >
              <FaTimes size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu?.id === item.id;

            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => isMobile && onClose?.()}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    'group relative',
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}

                  {!isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute left-full ml-2 px-2 py-1 bg-dark-card text-dark-text rounded text-xs whitespace-nowrap pointer-events-none"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-light-border dark:border-dark-border p-3 space-y-2">
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
          >
            <FaBars size={18} />
          </motion.button>

          <motion.button
            whileHover={{ x: 5 }}
            onClick={handleLogout}
            className={clsx(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
              'text-danger hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
            )}
          >
            <FaSignOutAlt size={18} className="flex-shrink-0" />
            {isExpanded && (
              <motion.span className="font-medium text-sm">Logout</motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
