'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@awseen/ui';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
          budget: ''
        });

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="container mb-6">
          <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-950 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Thank you for contacting Atelier Samui. We've received your inquiry and will respond within 24 hours during business hours.
                  You should also receive a confirmation email shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="container mb-6">
          <div className="rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-950 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  Error Sending Message
                </h3>
                <p className="text-sm text-red-800 dark:text-red-200">
                  {errorMessage}
                </p>
                <p className="text-sm text-red-800 dark:text-red-200 mt-2">
                  You can also contact us directly at{' '}
                  <a href="mailto:info@atelier-samui.com" className="underline font-medium">
                    info@atelier-samui.com
                  </a>
                  {' '}or{' '}
                  <a href="tel:+66123456789" className="underline font-medium">
                    +66 (0)12 345 6789
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="border-b bg-gradient-to-br from-muted/30 to-background py-16">
        <div className="container space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Ready to start your custom furniture project? Contact us for a consultation.
            We typically respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
          {/* Contact Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+66 12 345 6789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget (THB)</Label>
                    <Input
                      id="budget"
                      disabled={isSubmitting}
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="50,000 - 100,000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <select
                    id="projectType"
                    required
                    disabled={isSubmitting}
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select project type...</option>
                    <option value="Room Dividers">Room Dividers</option>
                    <option value="Storage Systems">Storage Systems</option>
                    <option value="TV Cabinets">TV Cabinets</option>
                    <option value="Wall Decor">Wall Decor</option>
                    <option value="Custom Furniture">Custom Furniture</option>
                    <option value="Complete Interior">Complete Interior</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details *</Label>
                  <textarea
                    id="message"
                    required
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, including dimensions, timeline, and any specific requirements..."
                    className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      disabled={isSubmitting}
                      className="mt-1 h-4 w-4 rounded border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree to receive project updates and communication from Atelier Samui via email and phone.
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-premium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  * Required fields. We'll respond within 24 hours.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Showroom & Workshop</div>
                    <p className="text-sm text-muted-foreground">
                      123 Moo 4, Bophut<br />
                      Koh Samui, Surat Thani 84320<br />
                      Thailand
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a href="tel:+66123456789" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      +66 (0)12 345 6789
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:info@atelier-samui.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      info@atelier-samui.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Business Hours</div>
                    <p className="text-sm text-muted-foreground">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 10:00 AM - 4:00 PM<br />
                      Sun: By appointment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-muted/30">
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="https://instagram.com/atelier.samui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border-2 hover:border-primary/50 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                  <span className="font-medium">@atelier.samui</span>
                </a>
                <a
                  href="https://facebook.com/ateliersamui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border-2 hover:border-primary/50 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-primary" />
                  <span className="font-medium">Atelier Samui</span>
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-6 space-y-2">
                <div className="font-semibold">Need immediate assistance?</div>
                <p className="text-sm text-muted-foreground">
                  For urgent inquiries, please call us directly at{' '}
                  <a href="tel:+66123456789" className="text-primary font-medium hover:underline">
                    +66 (0)12 345 6789
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="container py-12">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Visit Our Showroom</CardTitle>
            <p className="text-sm text-muted-foreground">
              123 Moo 4, Bophut, Koh Samui, Surat Thani 84320, Thailand
            </p>
          </CardHeader>
          <CardContent className="p-0">
            {/* Google Maps Embed - Replace with your actual location */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62768.64489262877!2d100.01843897273866!3d9.535419846925772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30535a0ba8b91b1f%3A0x30a8c53c8ba3d50!2sBophut%2C%20Ko%20Samui%20District%2C%20Surat%20Thani%2C%20Thailand!5e0!3m2!1sen!2sus!4v1703000000000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-b-lg"
              title="Atelier Samui Location Map"
            />
            <div className="p-4 bg-muted/30 text-center text-sm text-muted-foreground">
              <p>
                <strong>Note:</strong> This is a general location for Bophut, Koh Samui.
                Replace the iframe src with your exact coordinates for precise location.
              </p>
              <p className="mt-1">
                Get your Google Maps embed code at{' '}
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Maps
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Directions Card */}
      <section className="container pb-12">
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>How to Find Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">From Samui Airport:</h4>
                <p className="text-sm text-muted-foreground">
                  Take Route 4169 towards Bophut (approximately 15 minutes).
                  Turn right onto Route 4171. Our showroom is located near Fisherman's Village.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">From Chaweng:</h4>
                <p className="text-sm text-muted-foreground">
                  Head north on Route 4169 for about 10 minutes.
                  Look for signs to Bophut. Free parking available on-site.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Parking:</strong> Free parking available for visitors.
                Our showroom is wheelchair accessible.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
