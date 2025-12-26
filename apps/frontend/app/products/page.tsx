import React from 'react';
import Link from 'next/link';
import { ArrowRight, Grid3x3, Camera, Calculator } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@awseen/ui';

const categories = [
  {
    id: 'room-dividers',
    title: 'Room Dividers & Partitions',
    description: 'Elegant coconut slat partitions that seamlessly blend transparency with privacy. Create dynamic, flowing spaces while maintaining architectural integrity.',
    features: [
      'Vertical or horizontal slat configurations',
      'Sliding or fixed panel options',
      'Integrated LED ambient lighting',
      'Multiple wood finishes available',
      'Black powder-coated metal frames'
    ],
    applications: ['Living Rooms', 'Bedrooms', 'Hotels', 'Restaurants', 'Spas'],
    priceRange: '฿25,000 - ฿150,000',
    href: '/products/room-dividers'
  },
  {
    id: 'storage-systems',
    title: 'Storage Systems & Wardrobes',
    description: 'Custom-built wardrobes and shelving solutions crafted from premium palm wood. Features integrated LED lighting and sleek metalwork.',
    features: [
      'Floor-to-ceiling wardrobe systems',
      'Open and closed storage combinations',
      'Integrated LED shelf lighting',
      'Soft-close mechanisms',
      'Customizable interior layouts'
    ],
    applications: ['Bedrooms', 'Walk-in Closets', 'Living Rooms', 'Hotels', 'Villas'],
    priceRange: '฿40,000 - ฿300,000',
    href: '/products/storage-systems'
  },
  {
    id: 'tv-cabinets',
    title: 'TV Cabinets & Media Walls',
    description: 'Sophisticated media walls featuring hidden storage, cable management, and ambient LED illumination. Perfectly balanced form and function.',
    features: [
      'Floating TV panel designs',
      'Hidden cable management systems',
      'Integrated display shelving',
      'Ambient LED backlighting',
      'Drawer units with soft-close'
    ],
    applications: ['Living Rooms', 'Entertainment Rooms', 'Hotels', 'Condos'],
    priceRange: '฿35,000 - ฿200,000',
    href: '/products/tv-cabinets'
  },
  {
    id: 'wall-decor',
    title: 'Wall Decor & Panels',
    description: 'Architectural wall panels and decorative features that transform blank walls into stunning focal points with natural wood beauty.',
    features: [
      'Horizontal slat wall panels',
      'Vertical accent walls',
      'Integrated niche shelving',
      'LED backlit panels',
      'Modular panel systems'
    ],
    applications: ['Bedrooms', 'Living Rooms', 'Hotels', 'Restaurants', 'Offices'],
    priceRange: '฿15,000 - ฿100,000',
    href: '/products/wall-decor'
  },
  {
    id: 'furniture',
    title: 'Custom Furniture',
    description: 'Bespoke dining tables, coffee tables, and benches featuring warm palm wood tops with sleek black metal frames.',
    features: [
      'Dining tables (4-12 person)',
      'Coffee tables & side tables',
      'Outdoor furniture options',
      'Waterproof finishes available',
      'Custom dimensions & shapes'
    ],
    applications: ['Dining Rooms', 'Patios', 'Restaurants', 'Cafes', 'Hotels'],
    priceRange: '฿18,000 - ฿120,000',
    href: '/products/furniture'
  },
  {
    id: 'complete-interiors',
    title: 'Complete Interior Solutions',
    description: 'Full-scale interior design and installation services for villas, hotels, restaurants, and commercial spaces.',
    features: [
      'Complete space planning',
      '3D visualization & renders',
      'Coordinated furniture packages',
      'Professional installation',
      'Post-installation support'
    ],
    applications: ['Villas', 'Hotels', 'Restaurants', 'Bars', 'Commercial'],
    priceRange: 'Custom Quote',
    href: '/contact'
  }
];

export default function ProductsPage() {
  return (
    <div className="py-12">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-muted/30 to-background py-16">
        <div className="container space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Product Collection
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Explore our comprehensive range of custom-built furniture and interior systems.
            Each piece is handcrafted from sustainable palm wood and designed specifically
            for tropical living spaces.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="btn-premium">
              <Link href="/calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Price Calculator
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#visualizer">
                <Camera className="mr-2 h-5 w-5" />
                Try AR Visualizer
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                <Grid3x3 className="mr-2 h-5 w-5" />
                View Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="container py-16 space-y-12">
        {categories.map((category, index) => (
          <Card key={category.id} className={`overflow-hidden border-2 ${index % 2 === 0 ? '' : 'bg-muted/30'}`}>
            <div className={`grid gap-8 lg:grid-cols-2 ${index % 2 === 0 ? '' : 'lg:grid-flow-dense'}`}>
              {/* Image Placeholder */}
              <div className={`aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
                <div className="text-center space-y-2">
                  <p className="text-8xl font-bold text-primary/20">{category.id.substring(0, 2).toUpperCase()}</p>
                  <p className="text-sm text-muted-foreground">Product renders coming soon</p>
                </div>
              </div>

              {/* Content */}
              <div className={`p-8 space-y-6 ${index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold">{category.title}</h2>
                  <p className="text-lg text-muted-foreground">{category.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Key Features:</h3>
                  <ul className="grid gap-1.5 text-sm text-muted-foreground">
                    {category.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold">Applications:</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.applications.map((app) => (
                        <span key={app} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold">Price Range:</h3>
                    <p className="text-lg font-bold text-primary">{category.priceRange}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild className="btn-premium">
                    <Link href={category.href}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/calculator">Calculate Cost</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* 3D/AR Visualizer Section */}
      <section id="visualizer" className="border-y bg-muted/30 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold sm:text-4xl">Visualize in Your Space</h2>
            <p className="text-lg text-muted-foreground">
              See how our furniture will look in your actual space using our AR visualizer.
              Upload a photo of your room or use your device's camera for real-time visualization.
            </p>

            <Card className="border-2">
              <CardContent className="p-8 space-y-6">
                <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">AR Visualizer Interface</p>
                    <p className="text-xs text-muted-foreground">Integration ready for 3D models</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Button size="lg" className="btn-premium">
                    <Camera className="mr-2 h-5 w-5" />
                    Upload Photo
                  </Button>
                  <Button size="lg" variant="outline">
                    <Camera className="mr-2 h-5 w-5" />
                    Open Camera (AR)
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Supports .GLB and .GLTF 3D model formats • WebXR compatible
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-12 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground">
                Use our calculator for an instant quote or contact us for a personalized consultation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="btn-premium">
                  <Link href="/calculator">
                    Calculate Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
