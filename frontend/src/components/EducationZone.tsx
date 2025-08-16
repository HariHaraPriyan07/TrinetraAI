import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Search, 
  Users, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Trophy,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { quizQuestions } from '../data/quizQuestions';

const EducationZone: React.FC = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  // Quick tips for spotting fake news
  const quickTips = [
    {
      icon: Eye,
      title: 'Check the Source',
      description: 'Verify the credibility and reputation of the publication or website.',
      color: 'blue'
    },
    {
      icon: Search,
      title: 'Cross-Reference',
      description: 'Look for the same story from multiple reputable news sources.',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Check Author',
      description: 'Research the author\'s credentials and previous work.',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Verify Date',
      description: 'Ensure the content is recent and not taken out of context.',
      color: 'orange'
    }
  ];

  // Real-world examples
  const misinformationExamples = [
    {
      title: 'Clickbait Headlines',
      example: '"Scientists HATE this one weird trick that cures everything!"',
      explanation: 'Sensational headlines designed to generate clicks often lack scientific backing. Look for specific claims and credible sources.',
      warning: 'Red flags: ALL CAPS, "one weird trick", emotional manipulation'
    },
    {
      title: 'False Statistics',
      example: '"99% of doctors agree" without citing the study',
      explanation: 'Vague statistics without proper citations or sample sizes are often misleading. Always ask for the source.',
      warning: 'Red flags: Unrealistic percentages, no source cited, sweeping generalizations'
    },
    {
      title: 'Conspiracy Language',
      example: '"They don\'t want you to know this secret..."',
      explanation: 'Conspiracy-style language appeals to emotions rather than facts. Be skeptical of claims about hidden knowledge.',
      warning: 'Red flags: "They don\'t want you to know", secret knowledge claims, us vs. them mentality'
    }
  ];

  const currentQuestion = quizQuestions[currentQuizIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'green': return 'bg-green-100 text-green-600 border-green-200';
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'orange': return 'bg-orange-100 text-orange-600 border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 px-4 font-space-grotesk">
            Learn to Spot Misinformation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 font-space-grotesk font-normal">
            Empower yourself with knowledge and skills to identify and combat misinformation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span>Quick Spotting Tips</span>
                </CardTitle>
                <CardDescription>
                  Essential strategies for identifying fake news
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickTips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-xl border ${getColorClasses(tip.color)} dark:bg-opacity-20`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-sm">{tip.title}</h3>
                            <p className="text-xs mt-1 opacity-90 dark:opacity-80">{tip.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Real-world Examples Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Real-World Examples</CardTitle>
                <CardDescription>
                  Learn from actual misinformation patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCurrentExampleIndex(prev => 
                        prev > 0 ? prev - 1 : misinformationExamples.length - 1
                      )}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {currentExampleIndex + 1} of {misinformationExamples.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCurrentExampleIndex(prev => 
                        (prev + 1) % misinformationExamples.length
                      )}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentExampleIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <h3 className="font-semibold text-red-700 dark:text-red-300">
                        {misinformationExamples[currentExampleIndex].title}
                      </h3>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-800 dark:text-red-200 italic">
                          "{misinformationExamples[currentExampleIndex].example}"
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        {misinformationExamples[currentExampleIndex].explanation}
                      </p>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
                          <strong>⚠️ {misinformationExamples[currentExampleIndex].warning}</strong>
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Quiz */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>Knowledge Quiz</span>
                </CardTitle>
                <CardDescription>
                  Test your misinformation detection skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentQuizIndex < quizQuestions.length ? (
                  <div className="space-y-4">
                    {/* Progress */}
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 font-medium">
                      <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                      <span>Score: {score}/{quizQuestions.length}</span>
                    </div>
                    
                    {/* Question */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                      <h3 className="font-medium text-blue-900 dark:text-blue-100 leading-relaxed">
                        {currentQuestion.question}
                      </h3>
                    </div>
                    
                    {/* Options */}
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showResult}
                          className={`w-full text-left p-3 rounded-xl border transition-all ${
                            selectedAnswer === index
                              ? showResult
                                ? index === currentQuestion.correctAnswer
                                  ? 'bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-800 text-green-800 dark:text-green-300'
                                  : 'bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200'
                                : 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                          }`}
                          whileHover={{ scale: showResult ? 1 : 1.02 }}
                          whileTap={{ scale: showResult ? 1 : 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            {showResult && selectedAnswer === index && (
                              index === currentQuestion.correctAnswer ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )
                            )}
                            <span className="text-sm leading-relaxed">{option}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    
                    {/* Submit/Next Button */}
                    <div className="pt-2">
                      {!showResult ? (
                        <Button
                          onClick={handleSubmitAnswer}
                          disabled={selectedAnswer === null}
                          className="w-full"
                          size="sm"
                        >
                          Submit Answer
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                              {currentQuestion.explanation}
                            </p>
                          </div>
                          <Button
                            onClick={handleNextQuestion}
                            className="w-full"
                            size="sm"
                          >
                            Next Question
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Quiz Complete!</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      You scored {score} out of {quizQuestions.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {score === quizQuestions.length ? 'Perfect score! 🎉' :
                       score >= quizQuestions.length * 0.8 ? 'Great job! 👏' :
                       score >= quizQuestions.length * 0.6 ? 'Good effort! 👍' :
                       'Keep learning! 📚'}
                    </p>
                    <Button onClick={resetQuiz} size="sm" className="w-full">
                      Take Quiz Again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationZone;