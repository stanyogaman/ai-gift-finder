import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Home, Utensils, Hotel, Store } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@awseen/ui';

const projects = [
  {
    id: 'luxury-villa-samui',
    title: 'Luxury Villa - Chaweng',
    category: 'Residential',
    location: 'Chaweng, Koh Samui',
    year: '2024',
    description: 'Complete interior transformation featuring custom room dividers, storage systems, and wall panels in natural palm wood finish.',
    scope: ['Room Dividers', 'Master Bedroom Storage', 'Living Room Wall Panels', 'Custom Dining Table'],
    image: '/images/projects/villa-chaweng.jpg'
  },
  {
    id: 'boutique-hotel-bophut',
    title: 'Boutique Hotel - Bophut Beach',
    category: 'Hospitality',
    location: 'Bophut, Koh Samui',
    year: '2023',
    description: '24-room boutique hotel featuring coordinated furniture packages with integrated LED lighting throughout.',
    scope: ['Room Dividers (24 units)', 'TV Cabinets (24 units)', 'Reception Desk', 'Lobby Seating'],
    image: '/images/projects/hotel-bophut.jpg'
  },
  {
    id: 'restaurant-fishermans-village',
    title: 'Beachfront Restaurant',
    category: 'Commercial',
    location: 'Fisherman\'s Village, Bophut',
    year: '2023',
    description: 'Modern tropical restaurant design with custom dividers creating intimate dining zones and outdoor furniture.',
    scope: ['Room Dividers', 'Custom Tables (15)', 'Bar Counter', 'Outdoor Furniture'],
    image: '/images/projects/restaurant.jpg'
  },
  {
    id: 'private-residence-lamai',
    title: 'Modern Beach House',
    category: 'Residential',
    location: 'Lamai Beach, Koh Samui',
    year: '2024',
    description: 'Contemporary beachfront property with floor-to-ceiling storage systems and horizontal slat wall features.',
    scope: ['Walk-in Closet System', 'Master Bedroom Wall Panels', 'Living Room Dividers'],
    image: '/images/projects/beach-house.jpg'
  },
  {
    id: 'spa-resort',
    title: 'Wellness Spa & Resort',
    category: 'Hospitality',
    location: 'Maenam, Koh Samui',
    year: '2022',
    description: 'Tranquil spa environment created with privacy partitions and ambient LED-lit storage solutions.',
    scope: ['Treatment Room Dividers (12)', 'Reception Area', 'Retail Display Units'],
    image: '/images/projects/spa-resort.jpg'
  },
  {
    id: 'cafe-chaweng',
    title: 'Artisan Coffee House',
    category: 'Commercial',
    location: 'Central Chaweng, Koh Samui',
    year: '2023',
    description: 'Industrial-tropical fusion cafe featuring wall decor panels and custom furniture throughout.',
    scope: ['Wall Decor Panels', 'Custom Tables (8)', 'Display Shelving', 'Bar Stools'],
    image: '/images/projects/cafe.jpg'
  },
  {
    id: 'condo-bangkok',
    title: 'Luxury Condo - Bangkok',
    category: 'Residential',
    location: 'Sukhumvit, Bangkok',
    year: '2024',
    description: 'Space-efficient design for a 120 sqm condo featuring multi-functional storage and room division.',
    scope: ['TV Cabinet & Media Wall', 'Bedroom Storage System', 'Room Divider'],
    image: '/images/projects/condo-bangkok.jpg'
  },
  {
    id: 'villa-phuket',
    title: 'Hillside Villa - Phuket',
    category: 'Residential',
    location: 'Kamala, Phuket',
    year: '2023',
    description: 'Expansive 5-bedroom villa with coordinated palm wood furniture throughout all living spaces.',
    scope: ['Complete Bedroom Storage (5)', 'Living Areas', 'Outdoor Furniture', 'Pool Deck'],
    image: '/images/projects/villa-phuket.jpg'
  }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Building2 },
  { id: 'Residential', label: 'Residential', icon: Home },
  { id: 'Hospitality', label: 'Hotels & Resorts', icon: Hotel },
  { id: 'Commercial', label: 'Commercial', icon: Store }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="py-12">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-muted/30 to-background py-16">
        <div className="container space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Projects
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Explore our portfolio of completed projects across Thailand. From intimate residential
            spaces to grand hospitality venues, each project showcases our commitment to quality
            and sustainable design.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-muted/20 py-6">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border-2 hover:border-primary/50'
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-2 hover-lift">
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-5xl font-bold text-primary/20 mb-2">
                    {project.category === 'Residential' ? <Home className="h-16 w-16" /> :
                     project.category === 'Hospitality' ? <Hotel className="h-16 w-16" /> :
                     <Store className="h-16 w-16" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Project photo coming soon</p>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary whitespace-nowrap">
                    {project.year}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{project.location}</div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Scope:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.scope.slice(0, 3).map((item) => (
                      <span key={item} className="rounded-full bg-muted px-2 py-1 text-xs">
                        {item}
                      </span>
                    ))}
                    {project.scope.length > 3 && (
                      <span className="rounded-full bg-muted px-2 py-1 text-xs">
                        +{project.scope.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  asChild
                  variant="secondary"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Link href={`/projects/${project.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Hotels & Resorts</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">300+</div>
              <div className="text-sm text-muted-foreground">Private Residences</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-12 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-bold">Start Your Project</h2>
              <p className="text-lg text-muted-foreground">
                Ready to transform your space with custom palm wood furniture?
                Let's discuss your vision.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="btn-premium">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/calculator">Calculate Cost</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
