'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { QuizWizard } from '@/components/quiz/QuizWizard';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/components/layout/AuthProvider';

export default function QuizPage() {
  const router = useRouter();
  const locale = useLocale();
  const { user, getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuizComplete = async (answers: Record<string, string | string[]>) => {
    setIsSubmitting(true);

    try {
      // Get auth token if user is logged in
      const token = user ? await getToken() : null;

      // Submit quiz to API
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          answers,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const data = await response.json();

      // Redirect to results page with session ID
      router.push(`/results?sessionId=${data.sessionId}`);
    } catch (error) {
      console.error('Quiz submission error:', error);
      // Still redirect with answers in case of error
      const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
      router.push(`/results?answers=${encodedAnswers}`);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <h2 className="text-2xl font-bold">Our AI is finding perfect gifts...</h2>
        <p className="text-muted-foreground">
          Analyzing your answers and curating personalized recommendations
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-16">
      <QuizWizard onComplete={handleQuizComplete} />
    </div>
  );
}
