export interface HighlightMatch {
  text: string;
  start: number;
  end: number;
  reason: string;
  severity: 'low' | 'medium' | 'high';
}

export const highlightSuspiciousText = (
  text: string,
  suspiciousPhrases: Array<{ text: string; reason: string; severity: 'low' | 'medium' | 'high' }>
): HighlightMatch[] => {
  const matches: HighlightMatch[] = [];
  
  suspiciousPhrases.forEach(phrase => {
    const regex = new RegExp(phrase.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        text: match[0],
        start: match.index,
        end: match.index + match[0].length,
        reason: phrase.reason,
        severity: phrase.severity
      });
    }
  });
  
  // Sort by start position
  return matches.sort((a, b) => a.start - b.start);
};