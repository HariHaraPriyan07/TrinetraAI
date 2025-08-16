import { useState, useEffect } from 'react';
import { AuthState } from '../types';
import { getStoredAuth, signOut as authSignOut } from '../utils/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(getStoredAuth);

  useEffect(() => {
    // Listen for storage changes (e.g., sign in from another tab)
    const handleStorageChange = () => {
      setAuthState(getStoredAuth());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const signOut = () => {
    authSignOut();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
  };

  const updateAuthState = (newState: AuthState) => {
    setAuthState(newState);
  };

  return {
    ...authState,
    signOut,
    updateAuthState
  };
};