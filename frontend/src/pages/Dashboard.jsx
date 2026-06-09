import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaBook,
  FaUser,
  FaExchangeAlt,
  FaFileAlt,
  FaFire,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { StatCard, CompactStatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Loader';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const stats = [
    {
      title: 'Total Books',
      value: '1,234',
      icon: FaBook,
      trend: { value: 12 },
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Available Books',
      value: '856',
      icon: FaCheckCircle,
      trend: { value: 8 },
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Issued Books',
      value: '378',
      icon: FaExchangeAlt,
      trend: { value: -5 },
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Total Students',
      value: '542',
      icon: FaUser,
      trend: { value: 15 },
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Fine Collection',
      value: '₹45,230',
      icon: FaFire,
      trend: { value: 3 },
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Overdue Books',
      value: '23',
      icon: FaFileAlt,
      trend: { value: -8 },
      gradient: 'from-red-500 to-pink-500',
    },
  ];

  const issueChartData = [
    { month: 'Jan', books: 240 },
    { month: 'Feb', books: 360 },
    { month: 'Mar', books: 200 },
    { month: 'Apr', books: 500 },
    { month: 'May', books: 490 },
    { month: 'Jun', books: 600 },
  ];

  const categoryData = [
    { name: 'Fiction', value: 35 },
    { name: 'Non-Fiction', value: 25 },
    { name: 'Reference', value: 20 },
    { name: 'Academic', value: 20 },
  ];

  const COLORS = ['#2563eb', '#0ea5e9', '#22c55e', '#f59e0b'];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton count={6} height="h-32" width="w-full" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Welcome back! Here's your library performance overview.
        </p>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            {...stat}
            isLoading={isLoading}
          />
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Book Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={issueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                  cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="books"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium text-light-text dark:text-dark-text">Book Title</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Student Name</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
                    2 days left
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Borrowed Books */}
        <Card>
          <CardHeader>
            <CardTitle>Top Borrowed Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium text-light-text dark:text-dark-text">Book Title {i}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{i * 12} issues</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
