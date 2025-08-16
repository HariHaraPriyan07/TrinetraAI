import { User, AuthState } from '../types';

const AUTH_STORAGE_KEY = 'trinetra_auth';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@trinetra.com',
    name: 'Demo User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  }
];

export const signIn = async (email: string, password: string): Promise<AuthState> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (email === 'demo@trinetra.com' && password === 'password') {
    const user = mockUsers[0];
    const token = `mock_jwt_token_${Date.now()}`;
    
    const authState: AuthState = {
      isAuthenticated: true,
      user,
      token
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    return authState;
  }
  
  throw new Error('Invalid credentials');
};

export const signOut = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getStoredAuth = (): AuthState => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing stored auth:', error);
  }
  
  return {
    isAuthenticated: false,
    user: null,
    token: null
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};