import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, Users, Award, Heart, Hammer, Lightbulb } from 'lucide-react';
import { Button, Card, CardContent } from '@awseen/ui';

const values = [
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We use only responsibly harvested palm wood and coconut materials, supporting local Thai communities and protecting tropical ecosystems.'
  },
  {
    icon: Hammer,
    title: 'Craftsmanship',
    description: 'Every piece is handcrafted by skilled artisans with decades of experience in tropical wood furniture making.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Combining traditional techniques with modern design principles and LED technology for contemporary tropical living.'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do. Each project is a labor of love, transforming natural materials into functional art.'
  }
];

const process = [
  {
    step: '1',
    title: 'Consultation',
    description: 'We meet with you to understand your vision, space requirements, and design preferences.'
  },
  {
    step: '2',
    title: '3D Design',
    description: 'Our designers create detailed 3D renders showing exactly how your furniture will look.'
  },
  {
    step: '3',
    title: 'Material Selection',
    description: 'Choose from our range of palm wood finishes and metal frame options.'
  },
  {
    step: '4',
    title: 'Manufacturing',
    description: 'Skilled craftsmen build your furniture by hand in our Samui workshop (2-4 weeks).'
  },
  {
    step: '5',
    title: 'Quality Control',
    description: 'Each piece undergoes rigorous inspection to ensure it meets our premium standards.'
  },
  {
    step: '6',
    title: 'Installation',
    description: 'Professional delivery and installation at your location, anywhere in Thailand.'
  }
];

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="border-b bg-gradient-to-br from-muted/30 to-background py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Crafting Tropical Elegance Since 2008
            </h1>
            <p className="text-xl text-muted-foreground">
              Atelier Samui was born from a passion for sustainable design and a deep appreciation
              for the natural beauty of tropical materials.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Users className="mx-auto h-16 w-16 text-primary/40" />
                <p className="text-sm text-muted-foreground">Team photo placeholder</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold sm:text-4xl">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2008 on the beautiful island of Koh Samui, Atelier Samui began as a small
                  workshop dedicated to creating custom furniture for luxury villas and boutique hotels.
                  Our founder, inspired by Rimadesio's minimalist aesthetic and Thailand's rich tropical
                  materials, saw an opportunity to create something unique.
                </p>
                <p>
                  Palm wood, often overlooked in favor of traditional hardwoods, became our signature
                  material. Its warm tones, unique grain patterns, and exceptional durability in tropical
                  climates made it perfect for our vision. Paired with sleek black metal frames and
                  integrated LED lighting, we developed a distinctive style that's both modern and timeless.
                </p>
                <p>
                  Today, we've completed over 500 projects across Thailand, from intimate residential
                  spaces to grand hotel lobbies and sophisticated restaurants. Each piece we create
                  carries our commitment to sustainability, craftsmanship, and design excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">Our Values</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="border-2 text-center">
                <CardContent className="pt-8 space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">Our Process</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              From concept to completion, we ensure excellence at every step
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {process.map((item) => (
              <Card key={item.step} className="border-2 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5">
                  {item.step}
                </div>
                <CardContent className="pt-6 space-y-3 relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold sm:text-4xl">Why Palm Wood?</h2>
            <div className="space-y-4 text-left text-muted-foreground">
              <p>
                <strong className="text-foreground">Exceptional Durability:</strong> Palm wood's dense,
                fibrous structure makes it incredibly resistant to tropical humidity, temperature
                fluctuations, and wear—perfect for Thailand's climate.
              </p>
              <p>
                <strong className="text-foreground">Unique Beauty:</strong> Each piece has distinctive
                grain patterns and warm, golden tones that range from light bamboo to rich coconut hues,
                creating one-of-a-kind furniture.
              </p>
              <p>
                <strong className="text-foreground">Sustainable Choice:</strong> Palm trees are harvested
                at the end of their productive life, making palm wood a truly sustainable material that
                supports local Thai farming communities.
              </p>
              <p>
                <strong className="text-foreground">Modern Versatility:</strong> Its clean, linear grain
                complements contemporary minimalist design while adding natural warmth—ideal for the
                Rimadesio-inspired aesthetic we champion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Years of Expertise</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Projects Completed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Hotels & Resorts</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-12 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-bold">Let's Create Together</h2>
              <p className="text-lg text-muted-foreground">
                Ready to transform your space with sustainable, custom-built furniture?
                We'd love to hear about your project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="btn-premium">
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/projects">View Our Work</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
