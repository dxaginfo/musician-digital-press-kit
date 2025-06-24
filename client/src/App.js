import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard';
import CreatePressKit from './pages/dashboard/CreatePressKit';
import EditPressKit from './pages/dashboard/EditPressKit';
import PressKitDetails from './pages/dashboard/PressKitDetails';
import PressKitAnalytics from './pages/dashboard/PressKitAnalytics';
import Settings from './pages/dashboard/Settings';
import Profile from './pages/dashboard/Profile';

// Public pages
import Home from './pages/public/Home';
import PublicPressKit from './pages/public/PublicPressKit';
import NotFound from './pages/public/NotFound';

// Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Redux actions
import { checkAuth } from './redux/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // Check for authentication status when app loads
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/kit/:slug" element={<PublicPressKit />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/press-kits/create" element={<CreatePressKit />} />
            <Route path="/press-kits/:id/edit" element={<EditPressKit />} />
            <Route path="/press-kits/:id" element={<PressKitDetails />} />
            <Route path="/press-kits/:id/analytics" element={<PressKitAnalytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;