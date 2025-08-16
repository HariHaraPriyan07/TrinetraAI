import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, User, LogOut, History, AlignJustify } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';
import SidebarMenu from './SidebarMenu';
import { AuthState } from '../types';

interface HeaderProps {
  onNavigateToHistory: () => void;
  onNewChat?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToHistory, onNewChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, user, signOut, updateAuthState } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAuthSuccess = (authState: AuthState) => {
    updateAuthState(authState);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      window.location.reload(); // Fallback to refresh page
    }
  };

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Extension', href: '#extension' },
    { label: 'Quiz', href: '#quiz' },
    ...(isAuthenticated ? [{ label: 'History', href: '#history', onClick: onNavigateToHistory }] : [])
  ];

  return (
    <>
    {/* Sidebar Menu */}
    <SidebarMenu
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      onNavigateToHistory={onNavigateToHistory}
      onNewChat={handleNewChat}
    />
    
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: isSidebarOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <AlignJustify className="h-5 w-5" />
              )}
            </motion.div>
          </Button>
          
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 flex-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="bg-blue-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-space-grotesk">Trinetra</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Verify. Learn. Share Truth.</p>
            </div>
          </motion.div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.onClick ? undefined : item.href}
                onClick={item.onClick}
                className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium py-2 transition-colors duration-200 cursor-pointer"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {item.label}
              </motion.a>
            ))}
            </nav>
            
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user?.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.onClick ? undefined : item.href}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    }
                    setIsMenuOpen(false);
                  }}
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium py-2 transition-colors duration-200 cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Theme</span>
                  <ThemeToggle />
                </div>
                
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    
    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      onAuthSuccess={handleAuthSuccess}
    />
    </>
  );
};

export default Header;