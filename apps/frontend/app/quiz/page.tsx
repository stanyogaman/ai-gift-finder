'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, CardHeader, CardTitle, Label, Input, Separator } from '@awseen/ui';
import { quizQuestions, quizCategories, calculateQuizCompleteness, type QuizQuestion } from '@/lib/quiz-questions';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCategory = quizCategories[currentStep];
  const categoryQuestions = quizQuestions.filter(q => q.category === currentCategory.id);
  const progress = ((currentStep + 1) / quizCategories.length) * 100;
  const completeness = calculateQuizCompleteness(answers);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleChoice = (questionId: string, option: string) => {
    const current = answers[questionId] || [];
    const updated = current.includes(option)
      ? current.filter((o: string) => o !== option)
      : [...current, option];
    setAnswers(prev => ({ ...prev, [questionId]: updated }));
  };

  const canProceed = () => {
    const requiredQuestionsInCategory = categoryQuestions.filter(q => q.required);
    return requiredQuestionsInCategory.every(q => answers[q.id]);
  };

  const handleNext = () => {
    if (currentStep < quizCategories.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Transform answers to API format
      const preferences = [
        ...(answers.interests || []),
        ...(answers.personality || []),
        ...(answers.lifestyle || []),
        ...(answers.gift_type || []),
        ...(answers.special_requirements || [])
      ].filter(Boolean);

      const payload = {
        preferences,
        event: answers.occasion || 'General',
        budgetMin: parseBudget(answers.budget, 'min'),
        budgetMax: parseBudget(answers.budget, 'max'),
        notes: JSON.stringify({
          recipientRelation: answers.recipient_relation,
          recipientAge: answers.recipient_age,
          recipientGender: answers.recipient_gender,
          timing: answers.occasion_timing,
          uniqueness: answers.uniqueness,
          avoid: answers.avoid,
          additionalNotes: answers.notes,
          allAnswers: answers
        })
      };

      // TODO: Call API when authenticated
      console.log('Quiz submission:', payload);

      // For now, redirect to client dashboard with results
      router.push('/client?quiz=completed');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const parseBudget = (budgetOption: string, type: 'min' | 'max'): number => {
    if (!budgetOption) return type === 'min' ? 0 : 1000;

    const budgetMap: Record<string, [number, number]> = {
      'Under $25': [0, 25],
      '$25 - $50': [25, 50],
      '$50 - $100': [50, 100],
      '$100 - $250': [100, 250],
      '$250 - $500': [250, 500],
      '$500 - $1000': [500, 1000],
      'Over $1000': [1000, 10000],
      'Budget is flexible': [0, 10000]
    };

    const range = budgetMap[budgetOption] || [0, 1000];
    return type === 'min' ? range[0] : range[1];
  };

  return (
    <div className="container max-w-4xl py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Gift Finder</span>
        </div>
        <h1 className="mb-2 text-3xl font-bold">Find the Perfect Gift</h1>
        <p className="text-muted-foreground">
          Answer a few questions and let our AI find personalized gift recommendations
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">
            Step {currentStep + 1} of {quizCategories.length}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Quiz Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentCategory.icon}</span>
            <CardTitle>{currentCategory.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {categoryQuestions.map((question) => (
            <div key={question.id} className="space-y-3">
              <div>
                <Label className="text-base font-semibold">
                  {question.question}
                  {question.required && <span className="ml-1 text-destructive">*</span>}
                </Label>
                {question.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{question.description}</p>
                )}
              </div>

              {question.type === 'single' && question.options && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(question.id, option)}
                      className={`rounded-lg border-2 p-3 text-left text-sm transition-all hover:border-primary/50 ${
                        answers[question.id] === option
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answers[question.id] === option && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'multiple' && question.options && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleMultipleChoice(question.id, option)}
                      className={`rounded-lg border-2 p-3 text-left text-sm transition-all hover:border-primary/50 ${
                        (answers[question.id] || []).includes(option)
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {(answers[question.id] || []).includes(option) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'range' && question.options && (
                <div className="grid gap-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(question.id, option)}
                      className={`rounded-lg border-2 p-3 text-left transition-all hover:border-primary/50 ${
                        answers[question.id] === option
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answers[question.id] === option && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'text' && (
                <Input
                  placeholder="Type your answer here..."
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-full"
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-sm text-muted-foreground">
          {completeness}% of quiz completed
        </div>

        <Button
          onClick={handleNext}
          disabled={!canProceed() || isSubmitting}
        >
          {currentStep < quizCategories.length - 1 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              {isSubmitting ? 'Finding gifts...' : 'Get Recommendations'}
              <Sparkles className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Benefits Section */}
      <Separator className="my-8" />
      <div className="rounded-lg bg-muted/50 p-6">
        <h3 className="mb-4 font-semibold">Why Our Quiz Works Best</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>
              <strong>AI-Powered Matching:</strong> Our advanced algorithm analyzes your answers to find gifts
              with the highest compatibility score
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>
              <strong>Comprehensive Analysis:</strong> We consider personality, interests, lifestyle, and
              occasion to find truly personalized gifts
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>
              <strong>Best Amazon Deals:</strong> We scan millions of products to find the best prices,
              reviews, and deals in your budget
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>
              <strong>Time-Saving:</strong> No more endless scrolling - get curated recommendations in minutes
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
