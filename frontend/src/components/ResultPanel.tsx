import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, HelpCircle, ExternalLink, Share2 } from 'lucide-react';
import { AnalysisResult } from '../types';
import ProgressCircle from './ProgressCircle';
import SuspiciousTextHighlighter from './SuspiciousTextHighlighter';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface ResultPanelProps {
  result: AnalysisResult;
  originalContent: string;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ result, originalContent }) => {
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'misinformation':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case 'uncertain':
        return <HelpCircle className="h-6 w-6 text-yellow-600" />;
      default:
        return <HelpCircle className="h-6 w-6 text-gray-600" />;
    }
  };

  const getVerdictText = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return 'Likely True';
      case 'misinformation':
        return 'Potential Misinformation';
      case 'uncertain':
        return 'Requires Verification';
      default:
        return 'Analysis Complete';
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'misinformation':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'uncertain':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getVerdictIcon(result.verdict)}
                  <div>
                    <CardTitle className="text-xl">
                      {getVerdictText(result.verdict)}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 font-medium">
                      Analysis completed with {result.confidence}% confidence
                    </p>
                  </div>
                </div>
                
                {/* Confidence Score Circle */}
                <div className="hidden sm:block">
                  <ProgressCircle 
                    percentage={result.confidence} 
                    size={80} 
                    strokeWidth={6}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Mobile Confidence Score */}
              <div className="sm:hidden flex justify-center py-4">
                <ProgressCircle 
                  percentage={result.confidence} 
                  size={100} 
                  strokeWidth={6}
                />
              </div>

              {/* Verdict Summary */}
              <div className={`p-4 rounded-2xl border ${getVerdictColor(result.verdict)}`}>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p>{result.summary}</p>
              </div>

              {/* Suspicious Phrases Analysis */}
              {result.suspiciousPhrases.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Suspicious Content Analysis</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                    <SuspiciousTextHighlighter
                      text={originalContent}
                      suspiciousPhrases={result.suspiciousPhrases}
                      className="text-gray-700 dark:text-gray-200 leading-relaxed"
                    />
                  </div>
                  
                  {/* Phrases Legend */}
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-200">Detected Issues:</h4>
                    {result.suspiciousPhrases.map((phrase, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 text-sm"
                      >
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          phrase.severity === 'high' ? 'bg-red-100 text-red-800' :
                          phrase.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {phrase.severity}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">"{phrase.text}"</p>
                          <p className="text-gray-600 dark:text-gray-300">{phrase.reason}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {result.sources && result.sources.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Related Sources</h3>
                  <div className="grid gap-3">
                    {result.sources.map((source, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100">{source.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                            Reliability: {source.reliability}%
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Google Fact Check
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Result
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ResultPanel;