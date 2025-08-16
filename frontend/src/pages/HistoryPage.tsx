import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, History, Trash2, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getHistory, clearHistory } from '../utils/history';
import { HistoryEntry } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import HistoryCard from '../components/HistoryCard';
import ResultPanel from '../components/ResultPanel';

interface HistoryPageProps {
  onBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onBack }) => {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const historyData = getHistory();
      setHistory(historyData);
      setFilteredHistory(historyData);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter(entry =>
        entry.inputData.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.result.verdict.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  }, [searchQuery, history]);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    setFilteredHistory([]);
    setShowClearConfirm(false);
  };

  const handleViewDetails = (entry: HistoryEntry) => {
    setSelectedEntry(entry);
  };

  const handleBackToHistory = () => {
    setSelectedEntry(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Sign In Required
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please sign in to view your verification history.
              </p>
              <Button onClick={onBack} className="w-full">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (selectedEntry) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              onClick={handleBackToHistory}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to History</span>
            </Button>
          </motion.div>
          
          <ResultPanel 
            result={selectedEntry.result} 
            originalContent={selectedEntry.inputData.content} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            
            {history.length > 0 && (
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowClearConfirm(true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear History
                </Button>
                
                <AnimatePresence>
                  {showClearConfirm && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 z-10 min-w-[280px]"
                    >
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        Are you sure you want to clear all history? This action cannot be undone.
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowClearConfirm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleClearHistory}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                          Clear All
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 px-4 font-space-grotesk">
              Verification History
            </h1>
            <p className="text-gray-600 dark:text-gray-300 px-4 font-space-grotesk font-normal">
              Review your past content analyses and results
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Search your history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>
        )}

        {/* History Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {history.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <History className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No History Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Start analyzing content to build your verification history.
                </p>
                <Button onClick={onBack}>
                  Analyze Content
                </Button>
              </CardContent>
            </Card>
          ) : filteredHistory.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <Search className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search query.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredHistory.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <HistoryCard
                    entry={entry}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results Summary */}
        {filteredHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 font-medium"
          >
            Showing {filteredHistory.length} of {history.length} results
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;