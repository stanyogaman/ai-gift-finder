'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! We will contact you within 24 hours.');
  };

  return (
    <div className="py-12">
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+66 12 345 6789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget (THB)</Label>
                    <Input
                      id="budget"
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
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select project type...</option>
                    <option value="room-divider">Room Dividers</option>
                    <option value="storage">Storage Systems</option>
                    <option value="tv-cabinet">TV Cabinets</option>
                    <option value="wall-decor">Wall Decor</option>
                    <option value="furniture">Custom Furniture</option>
                    <option value="complete">Complete Interior</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details *</Label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, including dimensions, timeline, and any specific requirements..."
                    className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-gray-300" />
                    <span className="text-sm text-muted-foreground">
                      I agree to receive project updates and communication from Atelier Samui via email and phone.
                    </span>
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full btn-premium">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
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
                    <a href="tel:+66123456789" className="text-sm text-muted-foreground hover:text-primary">
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
                    <a href="mailto:info@atelier-samui.com" className="text-sm text-muted-foreground hover:text-primary">
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

      {/* Map */}
      <section className="container py-12">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Visit Our Showroom</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-[21/9] bg-muted/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Google Maps integration placeholder</p>
                <p className="text-xs text-muted-foreground">123 Moo 4, Bophut, Koh Samui</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
