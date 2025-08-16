import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MessageSquarePlus, 
  Search, 
  History, 
  Download, 
  Settings,
  Shield
} from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../hooks/useAuth';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToHistory: () => void;
  onNewChat: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ 
  isOpen, 
  onClose, 
  onNavigateToHistory,
  onNewChat 
}) => {
  const { isAuthenticated, user } = useAuth();

  // Close on ESC key
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  const menuItems = [
    {
      icon: MessageSquarePlus,
      label: 'New Analysis',
      onClick: () => {
        onNewChat();
        onClose();
      },
      description: 'Start a fresh content analysis'
    },
    {
      icon: Search,
      label: 'Search History',
      onClick: () => {
        // TODO: Implement search functionality
        onClose();
      },
      description: 'Search through past verifications',
      disabled: !isAuthenticated
    },
    {
      icon: History,
      label: 'History',
      onClick: () => {
        onNavigateToHistory();
        onClose();
      },
      description: 'View all past analyses',
      disabled: !isAuthenticated
    },
    {
      icon: Download,
      label: 'Browser Extension',
      onClick: () => {
        // TODO: Link to extension download
        onClose();
      },
      description: 'Get the Trinetra browser extension'
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => {
        // TODO: Implement settings page
        onClose();
      },
      description: 'Manage your preferences'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-space-grotesk">Trinetra</h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Verify. Learn. Share Truth.</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Info */}
            {isAuthenticated && user && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all duration-200 ${
                      item.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                    whileHover={item.disabled ? {} : { scale: 1.02 }}
                    whileTap={item.disabled ? {} : { scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={item.label}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs opacity-75 truncate">{item.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Built for a better informed world
                </p>
                <div className="flex justify-center space-x-4 text-xs text-gray-400 dark:text-gray-500">
                  <a href="#privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    Privacy
                  </a>
                  <a href="#terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    Terms
                  </a>
                  <a href="#about" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    About
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarMenu;