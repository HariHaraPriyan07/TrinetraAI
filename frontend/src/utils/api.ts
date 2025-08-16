import { AnalysisResult, InputData } from '../types';

// Mock API responses for demo purposes
const mockResults: AnalysisResult[] = [
  {
    verdict: 'misinformation',
    confidence: 85,
    suspiciousPhrases: [
      { text: 'scientists don\'t want you to know', reason: 'Appeals to conspiracy theories', severity: 'high' },
      { text: 'this one weird trick', reason: 'Clickbait language pattern', severity: 'medium' },
      { text: 'breakthrough they\'re hiding', reason: 'Implies deliberate concealment', severity: 'high' }
    ],
    summary: 'This content contains multiple indicators of misinformation including conspiracy-style language and unsupported claims.',
    sources: [
      { title: 'Fact Check: Similar claims debunked', url: 'https://example.com/factcheck1', reliability: 95 },
      { title: 'Scientific consensus contradicts claim', url: 'https://example.com/factcheck2', reliability: 92 }
    ]
  },
  {
    verdict: 'true',
    confidence: 92,
    suspiciousPhrases: [],
    summary: 'This content appears to be factually accurate based on available evidence and credible sources.',
    sources: [
      { title: 'Peer-reviewed research supports claim', url: 'https://example.com/research1', reliability: 98 },
      { title: 'Multiple news outlets confirm', url: 'https://example.com/news1', reliability: 88 }
    ]
  },
  {
    verdict: 'uncertain',
    confidence: 45,
    suspiciousPhrases: [
      { text: 'some experts believe', reason: 'Vague attribution without specifics', severity: 'low' },
      { text: 'studies suggest', reason: 'Unclear which studies are referenced', severity: 'medium' }
    ],
    summary: 'This content contains claims that require additional verification and more specific sourcing.',
    sources: []
  }
];

export const analyzeContent = async (inputData: InputData): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  // Return random mock result
  const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
  
  // Add some variation to confidence score
  return {
    ...randomResult,
    confidence: Math.max(10, Math.min(99, randomResult.confidence + (Math.random() - 0.5) * 20))
  };
};