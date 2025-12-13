'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { defaultQuizQuestions, QuizQuestion, QuizOption } from '@/lib/quiz/questions';

interface QuizWizardProps {
  onComplete: (answers: Record<string, string | string[]>) => void;
}

export function QuizWizard({ onComplete }: QuizWizardProps) {
  const t = useTranslations('quiz');
  const locale = useLocale();
  const router = useRouter();

  const [questions] = useState<QuizQuestion[]>(defaultQuizQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const getLocalizedText = (option: QuizOption): string => {
    return locale === 'ru' && option.text_ru ? option.text_ru : option.text_en;
  };

  const getLocalizedQuestion = (question: QuizQuestion): string => {
    return locale === 'ru' && question.question_ru ? question.question_ru : question.question_en;
  };

  const handleSingleSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    // Auto-advance for single select
    setTimeout(() => goToNext(value), 300);
  };

  const handleMultiSelect = (value: string) => {
    const newSelected = selectedOptions.includes(value)
      ? selectedOptions.filter((v) => v !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newSelected);
  };

  const goToNext = (singleValue?: string) => {
    // Save answer
    if (currentQuestion.type === 'multiple') {
      setAnswers({ ...answers, [currentQuestion.id]: selectedOptions });
    } else if (currentQuestion.type === 'text') {
      setAnswers({ ...answers, [currentQuestion.id]: textInput });
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptions([]);
      setTextInput('');
    } else {
      // Quiz complete
      handleSubmit(singleValue);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Restore previous answer
      const prevQuestion = questions[currentIndex - 1];
      const prevAnswer = answers[prevQuestion.id];
      if (prevQuestion.type === 'multiple' && Array.isArray(prevAnswer)) {
        setSelectedOptions(prevAnswer);
      } else if (prevQuestion.type === 'text' && typeof prevAnswer === 'string') {
        setTextInput(prevAnswer);
      }
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (lastAnswer?: string) => {
    setIsSubmitting(true);

    const finalAnswers = { ...answers };

    // Add the last answer
    if (currentQuestion.type === 'single' && lastAnswer) {
      finalAnswers[currentQuestion.id] = lastAnswer;
    } else if (currentQuestion.type === 'multiple') {
      finalAnswers[currentQuestion.id] = selectedOptions;
    } else if (currentQuestion.type === 'text') {
      finalAnswers[currentQuestion.id] = textInput;
    }

    onComplete(finalAnswers);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-6 md:p-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-muted-foreground">
              {t('progress', { current: currentIndex + 1, total: questions.length })}
            </span>
            <div className="w-10" /> {/* Spacer */}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              {getLocalizedQuestion(currentQuestion)}
            </h2>

            {currentQuestion.type === 'multiple' && (
              <p className="text-center text-muted-foreground mb-6">
                {t('selectMultiple')}
              </p>
            )}

            {/* Options */}
            {currentQuestion.type !== 'text' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentQuestion.options.map((option) => {
                  const isSelected =
                    currentQuestion.type === 'multiple'
                      ? selectedOptions.includes(option.value)
                      : answers[currentQuestion.id] === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() =>
                        currentQuestion.type === 'single'
                          ? handleSingleSelect(option.value)
                          : handleMultiSelect(option.value)
                      }
                      className={`quiz-option flex flex-col items-center justify-center text-center gap-2 p-4 rounded-xl border-2 h-28 md:h-32 ${
                        isSelected
                          ? 'selected border-purple-500 bg-purple-50'
                          : 'border-border hover:border-purple-300 hover:bg-purple-50/50'
                      }`}
                    >
                      <span className="text-3xl">{option.icon}</span>
                      <span className="font-medium text-sm">
                        {getLocalizedText(option)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Text Input */}
            {currentQuestion.type === 'text' && (
              <div className="max-w-md mx-auto">
                <Input
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={t('placeholder.text')}
                  className="text-center h-14 text-lg"
                />
              </div>
            )}

            {/* Next button for multi-select or text */}
            {(currentQuestion.type === 'multiple' || currentQuestion.type === 'text') && (
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => goToNext()}
                  className="min-w-32"
                >
                  {t('skipQuestion')}
                </Button>
                <Button
                  variant="gradient"
                  onClick={() => goToNext()}
                  disabled={
                    currentQuestion.type === 'multiple' && selectedOptions.length === 0
                  }
                  className="min-w-32"
                >
                  {currentIndex === questions.length - 1 ? (
                    isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('analyzing')}
                      </>
                    ) : (
                      t('findGifts')
                    )
                  ) : (
                    <>
                      {t('next')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}
