import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login
    setTimeout(() => {
      localStorage.setItem('token', 'mock-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify({
        email,
        username: email.split('@')[0],
        role: 'admin',
      }));
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-4xl"
              >
                📚
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">LibMgmt</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Premium Library Management System
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="backdrop-blur-2xl border-white/20 dark:border-slate-700/20">
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>

                {/* Password */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </motion.div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                  </label>
                  <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                </motion.div>

                {/* Sign Up Link */}
                <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                  Don't have an account?{' '}
                  <a href="/register" className="text-primary-500 hover:text-primary-600 font-medium">
                    Sign up
                  </a>
                </p>
              </form>
            </Card>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            variants={itemVariants}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          >
            <p className="text-xs font-medium text-blue-900 dark:text-blue-300 mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-800 dark:text-blue-400">
              Email: <code className="font-mono">admin@example.com</code>
            </p>
            <p className="text-xs text-blue-800 dark:text-blue-400">
              Password: <code className="font-mono">password</code>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
