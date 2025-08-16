import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, HelpCircle, FileText, Link, Upload, Clock } from 'lucide-react';
import { HistoryEntry } from '../types';
import { formatTimestamp } from '../utils/history';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

interface HistoryCardProps {
  entry: HistoryEntry;
  onViewDetails: (entry: HistoryEntry) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ entry, onViewDetails }) => {
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'misinformation':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'uncertain':
        return <HelpCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-600" />;
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
        return 'text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
      case 'misinformation':
        return 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
      case 'uncertain':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const getInputTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'url':
        return <Link className="h-4 w-4" />;
      case 'file':
        return <Upload className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => onViewDetails(entry)}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header with timestamp and input type */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                <Clock className="h-3 w-3" />
                <span>{formatTimestamp(entry.timestamp)}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
                {getInputTypeIcon(entry.inputData.type)}
                <span className="capitalize">{entry.inputData.type}</span>
              </div>
            </div>

            {/* Content preview */}
            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                {truncateContent(entry.inputData.content)}
              </p>
            </div>

            {/* Verdict and confidence */}
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getVerdictColor(entry.result.verdict)}`}>
                {getVerdictIcon(entry.result.verdict)}
                <span>{getVerdictText(entry.result.verdict)}</span>
              </div>
              
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {entry.result.confidence}% confidence
              </div>
            </div>

            {/* View details button */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(entry);
                }}
              >
                View Full Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HistoryCard;