import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, Palette, Shield, Sparkles, Clock, Award } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@awseen/ui';

const productCategories = [
  {
    title: 'Room Dividers',
    description: 'Elegant coconut slat partitions that blend transparency with privacy, creating dynamic spaces.',
    image: '/images/room-dividers.jpg',
    href: '/products/room-dividers'
  },
  {
    title: 'Storage Systems',
    description: 'Custom wardrobes and shelving solutions crafted from premium palm wood with integrated lighting.',
    image: '/images/storage-systems.jpg',
    href: '/products/storage-systems'
  },
  {
    title: 'TV Cabinets',
    description: 'Sophisticated media walls featuring hidden storage and ambient LED illumination.',
    image: '/images/tv-cabinets.jpg',
    href: '/products/tv-cabinets'
  },
  {
    title: 'Wall Decor',
    description: 'Architectural wall panels and decorative features that transform spaces with natural beauty.',
    image: '/images/wall-decor.jpg',
    href: '/products/wall-decor'
  },
  {
    title: 'Custom Tables',
    description: 'Bespoke dining and coffee tables with sleek metal frames and warm palm wood tops.',
    image: '/images/tables.jpg',
    href: '/products/furniture'
  },
  {
    title: 'Complete Interiors',
    description: 'Full-scale interior solutions for villas, hotels, restaurants, and commercial spaces.',
    image: '/images/interiors.jpg',
    href: '/contact'
  }
];

const features = [
  {
    icon: Leaf,
    title: 'Sustainable Materials',
    description: 'Handcrafted from eco-friendly palm wood and coconut slats, harvested responsibly in Thailand.'
  },
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Every piece is tailored to your vision, from dimensions to finish, ensuring perfect integration.'
  },
  {
    icon: Shield,
    title: 'Premium Craftsmanship',
    description: 'Meticulous attention to detail with integrated LED lighting and precision metalwork.'
  },
  {
    icon: Award,
    title: 'Tropical Elegance',
    description: 'Inspired by Rimadesio, designed for the unique aesthetics of tropical living spaces.'
  }
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-muted/30 via-background to-muted/50">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
        <div className="container relative z-10 py-20">
          <div className="mx-auto max-w-4xl text-center space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Eco-Design & Innovation for Tropical Spaces
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              ATELIER SAMUI
            </h1>
            <p className="text-2xl sm:text-3xl font-light text-muted-foreground">
              Exquisite Interiors from Palm Wood
            </p>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Custom-built furniture and interior systems for villas, hotels, and restaurants in Thailand.
              Where sustainable craftsmanship meets modern tropical design.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="btn-premium h-12 px-8 text-base">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/contact">Request Consultation</Link>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>100% Sustainable Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Handcrafted in Thailand</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold sm:text-4xl">Our Philosophy</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                At Atelier Samui, we believe that exceptional furniture begins with exceptional materials.
                Palm wood, with its unique grain and warm tones, offers unparalleled beauty and durability
                for tropical climates.
              </p>
              <p>
                Every piece we create is a collaboration between traditional craftsmanship and contemporary
                design. From sleek room dividers to sophisticated storage systems, our work transforms
                spaces into sanctuaries of natural elegance.
              </p>
              <p>
                We specialize in custom solutions that respect both the environment and your vision,
                delivering furniture that stands the test of time in style and substance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section className="py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">Our Signature Collections</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore our range of custom-built furniture and interior systems, each designed to elevate tropical living.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category) => (
              <Card key={category.title} className="group overflow-hidden hover-lift border-2">
                <div className="aspect-[4/3] bg-muted/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-6xl font-bold text-primary/10">{category.title.substring(0, 2)}</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <Button asChild variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link href={category.href}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-muted/30">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">Why Choose Atelier Samui</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Four pillars of excellence that define our commitment to you
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center border-2">
                <CardContent className="pt-8 space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools CTA */}
      <section className="py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl">Cost Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Get an instant estimate for your custom furniture project. Select materials, dimensions,
                  and finishes to calculate your investment.
                </p>
                <Button asChild className="w-full btn-premium" size="lg">
                  <Link href="/calculator">
                    Calculate Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover-lift wood-texture">
              <CardHeader>
                <CardTitle className="text-2xl">3D Visualizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  See how our furniture looks in your space. Upload a photo or use AR to visualize
                  our products in real-time.
                </p>
                <Button asChild className="w-full btn-premium" size="lg">
                  <Link href="/products">
                    Try AR Visualizer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Years of Expertise</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Sustainable Materials</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Hotels & Villas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <CardContent className="p-12 text-center">
              <div className="mx-auto max-w-2xl space-y-6">
                <h2 className="text-3xl font-bold sm:text-4xl">Create Your Unique Interior</h2>
                <p className="text-lg text-muted-foreground">
                  Whether you're designing a villa, hotel, restaurant, or private residence,
                  our team is ready to bring your vision to life with sustainable, custom-built furniture.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Button asChild size="lg" className="btn-premium h-12 px-8">
                    <Link href="/calculator">
                      Calculate Cost
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8">
                    <Link href="/contact">Request Consultation</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
