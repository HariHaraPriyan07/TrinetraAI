import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip';
import { highlightSuspiciousText } from '../utils/textHighlighter';

interface SuspiciousTextHighlighterProps {
  text: string;
  suspiciousPhrases: Array<{
    text: string;
    reason: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  className?: string;
}

const SuspiciousTextHighlighter: React.FC<SuspiciousTextHighlighterProps> = ({
  text,
  suspiciousPhrases,
  className = ''
}) => {
  const matches = highlightSuspiciousText(text, suspiciousPhrases);
  
  if (matches.length === 0) {
    return <p className={className}>{text}</p>;
  }

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const renderHighlightedText = () => {
    const elements = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      // Add text before the match
      if (match.start > lastIndex) {
        elements.push(
          <span key={`text-${index}`}>
            {text.slice(lastIndex, match.start)}
          </span>
        );
      }

      // Add the highlighted match
      elements.push(
        <TooltipProvider key={`highlight-${index}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={`px-1 py-0.5 rounded border cursor-help transition-all duration-200 hover:shadow-sm ${getSeverityColor(match.severity)}`}
              >
                {match.text}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="font-medium">Suspicious Content Detected</p>
              <p className="text-xs mt-1">{match.reason}</p>
              <p className="text-xs mt-1 opacity-75">Severity: {match.severity}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key="text-end">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <p className={className}>
      {renderHighlightedText()}
    </p>
  );
};

export default SuspiciousTextHighlighter;