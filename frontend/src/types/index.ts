export interface AnalysisResult {
  verdict: 'true' | 'misinformation' | 'uncertain';
  confidence: number;
  suspiciousPhrases: Array<{
    text: string;
    reason: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  sources?: Array<{
    title: string;
    url: string;
    reliability: number;
  }>;
  summary: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface InputData {
  type: 'text' | 'url' | 'file';
  content: string;
  file?: File;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputData: InputData;
  result: AnalysisResult;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}