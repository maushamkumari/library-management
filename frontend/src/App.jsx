import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './layouts/AppLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Books from './pages/Books.jsx';
import Students from './pages/Students.jsx';
import Categories from './pages/Categories.jsx';
import Issues from './pages/Issues.jsx';
import Returns from './pages/Returns.jsx';
import Reports from './pages/Reports.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/students" element={<Students />} />
          <Route path="/issue-books" element={<Issues />} />
          <Route path="/return-books" element={<Returns />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} theme="light" />
    </ThemeProvider>
  );
}
