import { useTranslations } from 'next-intl';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

export default function FAQPage() {
  const t = useTranslations('faq');

  const faqs = [
    {
      question: t('questions.howItWorks.q'),
      answer: t('questions.howItWorks.a'),
    },
    {
      question: t('questions.free.q'),
      answer: t('questions.free.a'),
    },
    {
      question: t('questions.accuracy.q'),
      answer: t('questions.accuracy.a'),
    },
    {
      question: t('questions.privacy.q'),
      answer: t('questions.privacy.a'),
    },
    {
      question: t('questions.affiliate.q'),
      answer: t('questions.affiliate.a'),
    },
    {
      question: 'Can I save my favorite gift ideas?',
      answer: 'Yes! Create a free account to save gift ideas to your favorites. You can also view your quiz history and easily revisit past recommendations.',
    },
    {
      question: 'What types of gifts do you recommend?',
      answer: 'We recommend a variety of gift types including physical products, experiences, digital gifts, and subscriptions. Our AI considers your budget and preferences to suggest the most appropriate options.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach us through our contact page or email us at support@giftfinder.ai. We typically respond within 24-48 hours.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'AI Gift Finder does not sell products directly. We connect you with retailers who handle shipping. Check individual retailer policies for international shipping options.',
    },
    {
      question: 'Can I retake the quiz?',
      answer: 'Absolutely! You can take the quiz as many times as you like. Each session generates fresh recommendations based on your answers.',
    },
  ];

  return (
    <div className="container py-12 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about AI Gift Finder
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="mb-12">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Still Have Questions */}
      <div className="text-center p-8 bg-muted/50 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Can not find what you are looking for? We are here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button variant="gradient">Contact Us</Button>
          </Link>
          <Link href="/quiz">
            <Button variant="outline">Try the Quiz</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'FAQ',
  description: 'Frequently Asked Questions about AI Gift Finder - How it works, pricing, privacy, and more.',
};
