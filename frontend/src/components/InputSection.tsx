import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Link, Upload, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { InputData } from '../types';

interface InputSectionProps {
  onAnalyze: (inputData: InputData) => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [inputType, setInputType] = useState<'text' | 'url' | 'file'>('text');
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = () => {
    setError('');
    
    let inputData: InputData;
    
    switch (inputType) {
      case 'text':
        if (!textInput.trim()) {
          setError('Please enter some text to analyze');
          return;
        }
        inputData = { type: 'text', content: textInput };
        break;
        
      case 'url':
        if (!urlInput.trim()) {
          setError('Please enter a URL to analyze');
          return;
        }
        if (!/^https?:\/\/.+\..+/.test(urlInput)) {
          setError('Please enter a valid URL starting with http:// or https://');
          return;
        }
        inputData = { type: 'url', content: urlInput };
        break;
        
      case 'file':
        if (!selectedFile) {
          setError('Please select a file to analyze');
          return;
        }
        inputData = { type: 'file', content: selectedFile.name, file: selectedFile };
        break;
        
      default:
        return;
    }
    
    onAnalyze(inputData);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (for demo, accept text files and images)
      const validTypes = ['text/plain', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid file type (text, image, or PDF)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      setError('');
    }
  };

  const inputTabs = [
    { id: 'text', label: 'Text', icon: Search },
    { id: 'url', label: 'URL', icon: Link },
    { id: 'file', label: 'File', icon: Upload },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-4"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-space-grotesk">
            Analyze Content for Misinformation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-space-grotesk font-normal">
            Upload text, paste a URL, or drag a file to get instant analysis 
            and learn how to spot misinformation patterns.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          {/* Input Type Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
              {inputTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setInputType(tab.id as 'text' | 'url' | 'file')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      inputType === tab.id
                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Areas */}
          <div className="mb-6">
            {inputType === 'text' && (
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste or type the content you want to analyze..."
                className="w-full h-32 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-base placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 dark:text-gray-100"
              />
            )}

            {inputType === 'url' && (
              <Input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/article-to-analyze"
                className="text-base"
              />
            )}

            {inputType === 'file' && (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".txt,.pdf,.jpg,.jpeg,.png,.gif"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-20 border-dashed border-2 hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400 dark:text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedFile ? selectedFile.name : 'Click to select a file or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Supports text, images, and PDF files (max 10MB)
                    </p>
                  </div>
                </Button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Analyze Button */}
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="px-12 py-4 text-lg font-semibold"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Analyze Content
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InputSection;