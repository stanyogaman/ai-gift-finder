'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, HeadphonesIcon, BarChart3, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function PartnershipsPage() {
  const t = useTranslations('partnerships');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    country: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/partnership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', website: '', country: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Users,
      title: t('benefits.traffic'),
      description: 'Connect with users actively searching for gifts',
    },
    {
      icon: TrendingUp,
      title: t('benefits.commission'),
      description: 'Earn competitive commissions on referred sales',
    },
    {
      icon: HeadphonesIcon,
      title: t('benefits.support'),
      description: 'Get help from our partnership team',
    },
    {
      icon: BarChart3,
      title: t('benefits.analytics'),
      description: 'Track your performance with detailed reports',
    },
  ];

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Benefits Section */}
        <div>
          <p className="text-lg text-muted-foreground mb-8">
            {t('intro')}
          </p>

          <h2 className="text-2xl font-bold mb-6">{t('benefits.title')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 bg-muted/50">
                <CardContent className="p-6">
                  <benefit.icon className="h-8 w-8 text-purple-500 mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <h3 className="font-semibold mb-2">Who can partner with us?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Brands and retailers looking for exposure</li>
              <li>Content creators and influencers</li>
              <li>Affiliate marketers</li>
              <li>Gift-related businesses</li>
              <li>E-commerce platforms</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">{t('form.title')}</h2>

              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                  <p className="text-muted-foreground">{t('form.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t('form.name')} *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">{t('form.email')} *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">{t('form.company')}</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">{t('form.website')}</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">{t('form.country')}</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t('form.message')} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {t('form.error')}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      t('form.submit')
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
