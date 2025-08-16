import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import InputSection from '../components/InputSection';
import ResultPanel from '../components/ResultPanel';
import EducationZone from '../components/EducationZone';
import Footer from '../components/Footer';
import HistoryPage from './HistoryPage';
import { AnalysisResult, InputData } from '../types';
import { analyzeContent } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import { saveToHistory } from '../utils/history';

const HomePage: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [originalContent, setOriginalContent] = useState('');
  const [currentPage, setCurrentPage] = useState<'home' | 'history'>('home');
  const { isAuthenticated } = useAuth();

  const handleAnalyze = async (inputData: InputData) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Store original content for highlighting
    setOriginalContent(inputData.content);
    
    try {
      const result = await analyzeContent(inputData);
      setAnalysisResult(result);
      
      // Save to history if user is authenticated
      if (isAuthenticated) {
        saveToHistory(inputData, result);
      }
      
      // Auto-scroll to results after a brief delay
      setTimeout(() => {
        const resultSection = document.getElementById('results');
        resultSection?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNavigateToHistory = () => {
    setCurrentPage('history');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleNewChat = () => {
    setAnalysisResult(null);
    setOriginalContent('');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'history') {
    return <HistoryPage onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onNavigateToHistory={handleNavigateToHistory} onNewChat={handleNewChat} />
      
      {/* Hero Section with Input */}
      <main className="relative">
        <InputSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        
        {/* Results Section */}
        {analysisResult && (
          <motion.div
            id="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResultPanel result={analysisResult} originalContent={originalContent} />
          </motion.div>
        )}
        
        {/* Loading State */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Analyzing Content
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our AI is examining the content for potential misinformation patterns...
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Education Zone */}
        <EducationZone />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;