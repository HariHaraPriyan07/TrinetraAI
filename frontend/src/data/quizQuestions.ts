import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's the most reliable way to verify a news story?",
    options: [
      "Check if it's shared by many people on social media",
      "Look for the same story on multiple credible news sources",
      "See if it confirms what you already believe",
      "Check if it has an emotional headline"
    ],
    correctAnswer: 1,
    explanation: "Cross-referencing multiple credible sources helps verify information accuracy and reduces the risk of misinformation."
  },
  {
    id: 2,
    question: "Which of these is a red flag for potential misinformation?",
    options: [
      "The article cites specific experts and studies",
      "The headline uses phrases like 'SHOCKING TRUTH THEY DON'T WANT YOU TO KNOW'",
      "The publication date is recent",
      "The article includes quotes from multiple perspectives"
    ],
    correctAnswer: 1,
    explanation: "Sensational headlines designed to provoke strong emotions are common tactics used in misinformation to bypass critical thinking."
  },
  {
    id: 3,
    question: "What should you do before sharing news on social media?",
    options: [
      "Share it immediately if it supports your views",
      "Add your own opinion to the post",
      "Verify the information and check the source credibility",
      "Only share if it has many likes already"
    ],
    correctAnswer: 2,
    explanation: "Always verify information and check source credibility before sharing to prevent the spread of misinformation."
  },
  {
    id: 4,
    question: "Which source is generally most reliable for breaking news?",
    options: [
      "Anonymous social media accounts",
      "Established news organizations with editorial standards",
      "Personal blogs without citations",
      "Forwarded messages in group chats"
    ],
    correctAnswer: 1,
    explanation: "Established news organizations typically have fact-checking processes and editorial standards that help ensure accuracy."
  }
];