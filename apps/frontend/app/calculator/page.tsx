'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, Check } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@awseen/ui';

type ProductType = 'room-divider' | 'storage' | 'tv-cabinet' | 'wall-decor' | 'furniture' | 'complete';
type WoodFinish = 'natural' | 'light' | 'medium' | 'dark';
type Complexity = 'basic' | 'standard' | 'premium';

const productPricing = {
  'room-divider': { base: 25000, perSqm: 8000 },
  'storage': { base: 40000, perSqm: 12000 },
  'tv-cabinet': { base: 35000, perSqm: 10000 },
  'wall-decor': { base: 15000, perSqm: 6000 },
  'furniture': { base: 18000, perSqm: 5000 },
  'complete': { base: 100000, perSqm: 15000 }
};

const finishMultipliers = {
  natural: 1.0,
  light: 1.1,
  medium: 1.15,
  dark: 1.2
};

const complexityMultipliers = {
  basic: 1.0,
  standard: 1.3,
  premium: 1.6
};

export default function CalculatorPage() {
  const [productType, setProductType] = useState<ProductType>('room-divider');
  const [width, setWidth] = useState<string>('2.5');
  const [height, setHeight] = useState<string>('2.8');
  const [quantity, setQuantity] = useState<string>('1');
  const [finish, setFinish] = useState<WoodFinish>('natural');
  const [complexity, setComplexity] = useState<Complexity>('standard');
  const [includeLighting, setIncludeLighting] = useState<boolean>(true);
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);

  const calculateCost = () => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const q = parseInt(quantity) || 1;

    const area = w * h;
    const pricing = productPricing[productType];

    let subtotal = (pricing.base + (pricing.perSqm * area)) * q;
    subtotal *= finishMultipliers[finish];
    subtotal *= complexityMultipliers[complexity];

    if (includeLighting) {
      subtotal += area * 1500 * q;
    }

    const installation = includeInstallation ? subtotal * 0.15 : 0;
    const total = subtotal + installation;

    return {
      subtotal: Math.round(subtotal),
      installation: Math.round(installation),
      total: Math.round(total),
      area: area.toFixed(2)
    };
  };

  const costs = calculateCost();

  return (
    <div className="py-12">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-muted/30 to-background py-16">
        <div className="container space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Cost Calculator
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Get an instant estimate for your custom furniture project
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
          {/* Form */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Type */}
                <div className="space-y-2">
                  <Label>Product Type</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {Object.keys(productPricing).map((type) => (
                      <button
                        key={type}
                        onClick={() => setProductType(type as ProductType)}
                        className={`rounded-lg border-2 p-3 text-left text-sm transition-colors ${
                          productType === type
                            ? 'border-primary bg-primary/10 font-medium'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimensions */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (meters)</Label>
                    <Input
                      id="width"
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="10"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (meters)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="5"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max="20"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Wood Finish */}
                <div className="space-y-2">
                  <Label>Wood Finish</Label>
                  <div className="grid gap-2 sm:grid-cols-4">
                    {(Object.keys(finishMultipliers) as WoodFinish[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFinish(f)}
                        className={`rounded-lg border-2 p-3 text-center text-sm transition-colors ${
                          finish === f
                            ? 'border-primary bg-primary/10 font-medium'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Complexity */}
                <div className="space-y-2">
                  <Label>Design Complexity</Label>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {(Object.keys(complexityMultipliers) as Complexity[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setComplexity(c)}
                        className={`rounded-lg border-2 p-3 text-center text-sm transition-colors ${
                          complexity === c
                            ? 'border-primary bg-primary/10 font-medium'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <Label>Additional Options</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeLighting}
                        onChange={(e) => setIncludeLighting(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">Include LED lighting (+฿1,500/m²)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeInstallation}
                        onChange={(e) => setIncludeInstallation(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">Include installation (+15%)</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="border-2 bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Premium palm wood materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Black powder-coated metal frames</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Custom design consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Precision manufacturing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Quality assurance & 2-year warranty</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Cost Summary - Sticky */}
          <div className="lg:sticky lg:top-24 space-y-6" style={{ height: 'fit-content' }}>
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Cost Estimate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Area:</span>
                    <span className="font-medium">{costs.area} m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{quantity} unit(s)</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">฿{costs.subtotal.toLocaleString()}</span>
                  </div>
                  {includeInstallation && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Installation:</span>
                      <span className="font-medium">฿{costs.installation.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-3xl font-bold text-primary">
                      ฿{costs.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  * This is an estimated cost. Final pricing will be provided after consultation and design finalization.
                </p>

                <Button asChild className="w-full btn-premium" size="lg">
                  <Link href="/contact">
                    Request Detailed Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary flex-shrink-0">
                    1
                  </div>
                  <p className="text-muted-foreground">Request a consultation via our contact form</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary flex-shrink-0">
                    2
                  </div>
                  <p className="text-muted-foreground">We'll create custom 3D renders of your design</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary flex-shrink-0">
                    3
                  </div>
                  <p className="text-muted-foreground">Approve design and receive final quote</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary flex-shrink-0">
                    4
                  </div>
                  <p className="text-muted-foreground">Manufacturing begins (2-4 weeks)</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary flex-shrink-0">
                    5
                  </div>
                  <p className="text-muted-foreground">Professional installation & delivery</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
