import { HistoryEntry, AnalysisResult, InputData } from '../types';

const HISTORY_STORAGE_KEY = 'trinetra_history';
const MAX_HISTORY_ENTRIES = 10;

export const saveToHistory = (inputData: InputData, result: AnalysisResult): void => {
  const entry: HistoryEntry = {
    id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    inputData,
    result
  };
  
  const history = getHistory();
  const updatedHistory = [entry, ...history].slice(0, MAX_HISTORY_ENTRIES);
  
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const getHistory = (): HistoryEntry[] => {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing stored history:', error);
  }
  
  return [];
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
};

export const getHistoryEntry = (id: string): HistoryEntry | null => {
  const history = getHistory();
  return history.find(entry => entry.id === id) || null;
};

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 168) { // 7 days
    const days = Math.floor(diffInHours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};