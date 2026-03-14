import { useState, useEffect } from 'react';
import { logout, isLoggedIn, getCurrentUser } from '../services/auth/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const loggedIn = await isLoggedIn();
      setIsAuthenticated(loggedIn);
      
      if (loggedIn) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  return {
    user,
    isAuthenticated,
    loading,
    logout: handleLogout,
    updateUser,
    checkAuthStatus
  };
};

export const useAuthGuard = (redirectTo = 'Home') => {
  const { isAuthenticated, loading } = useAuth();
  
  return {
    isAuthenticated,
    loading,
    shouldRedirect: !loading && !isAuthenticated,
    redirectTo
  };
};