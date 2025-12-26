# Cloudflare R2 Usage Examples

Quick reference for using R2 images in your Atelier Samui website.

---

## 🖼️ Using R2Image Component

### Basic Usage

```tsx
import { R2Image } from '@/components/r2-image';

export default function ProductCard() {
  return (
    <R2Image
      src="products/room-divider-natural.jpg"
      alt="Natural finish room divider"
      width={800}
      height={600}
    />
  );
}
```

### Responsive Image with Fill

```tsx
<div className="relative aspect-[4/3] overflow-hidden rounded-lg">
  <R2Image
    src="products/storage-system-1.jpg"
    alt="Bedroom storage system"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
</div>
```

### Hero Image

```tsx
<div className="relative h-screen">
  <R2Image
    src="hero/homepage-hero.jpg"
    alt="Atelier Samui showroom"
    fill
    priority
    quality={90}
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10">
    <h1>Welcome to Atelier Samui</h1>
  </div>
</div>
```

---

## 🔗 Getting Image URLs

### Simple URL

```tsx
import { getR2ImageUrl } from '@/lib/r2-config';

const imageUrl = getR2ImageUrl('products/table-1.jpg');
// Returns: https://media.atelier-samui.com/products/table-1.jpg
```

### Background Image

```tsx
import { R2BackgroundImage } from '@/components/r2-image';

<R2BackgroundImage
  src="projects/villa-chaweng.jpg"
  alt="Villa Chaweng project"
  className="h-96"
>
  <div className="p-12">
    <h2>Villa Chaweng</h2>
  </div>
</R2BackgroundImage>
```

---

## 📁 Path Helpers

Use organized path helpers for consistency:

```tsx
import { R2_PATHS } from '@/lib/r2-config';

// Product images
const roomDividerUrl = R2_PATHS.productImage('room-divider-1.jpg');
// Returns: "products/room-divider-1.jpg"

// Project images
const projectUrl = R2_PATHS.projectImage('villa-luxury-2.jpg');
// Returns: "projects/villa-luxury-2.jpg"

// Hero images
const heroUrl = R2_PATHS.heroImage('homepage-banner.jpg');
// Returns: "hero/homepage-banner.jpg"

// Then use in component
<R2Image src={roomDividerUrl} alt="..." width={800} height={600} />
```

---

## 📤 Uploading Images (Admin)

### From a Form

```tsx
'use client';

import { useState } from 'react';

export default function ImageUploadForm() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'products');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log('Uploaded successfully!');
        console.log('Image URL:', data.url);
        console.log('Path:', data.path);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

### Drag and Drop Upload

```tsx
import { useCallback } from 'react';

export default function DragDropUpload() {
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'products');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Uploaded:', data.url);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
    >
      <p>Drag and drop an image here</p>
    </div>
  );
}
```

---

## 🎨 Product Gallery Example

```tsx
import { R2Image } from '@/components/r2-image';

const products = [
  {
    id: 1,
    name: 'Room Divider - Natural',
    image: 'products/room-dividers/natural-finish-1.jpg',
  },
  {
    id: 2,
    name: 'Storage System - LED',
    image: 'products/storage-systems/bedroom-led.jpg',
  },
  {
    id: 3,
    name: 'TV Cabinet - Floating',
    image: 'products/tv-cabinets/floating-panel.jpg',
  },
];

export default function ProductGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <R2Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="mt-4 font-semibold">{product.name}</h3>
        </div>
      ))}
    </div>
  );
}
```

---

## 🏗️ Projects Portfolio Example

```tsx
import { R2Image } from '@/components/r2-image';

const projects = [
  {
    title: 'Villa Chaweng',
    category: 'Residential',
    images: [
      'projects/residential/villa-chaweng-living.jpg',
      'projects/residential/villa-chaweng-bedroom.jpg',
      'projects/residential/villa-chaweng-exterior.jpg',
    ],
  },
  {
    title: 'Boutique Hotel Bophut',
    category: 'Hospitality',
    images: [
      'projects/hospitality/hotel-bophut-lobby.jpg',
      'projects/hospitality/hotel-bophut-room.jpg',
    ],
  },
];

export default function ProjectsGallery() {
  return (
    <div className="space-y-12">
      {projects.map((project) => (
        <div key={project.title}>
          <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
          <p className="text-muted-foreground mb-6">{project.category}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <R2Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 SEO-Optimized Images

```tsx
import { R2Image } from '@/components/r2-image';

export default function SEOProduct() {
  return (
    <article itemScope itemType="https://schema.org/Product">
      <h1 itemProp="name">Natural Palm Wood Room Divider</h1>

      <div itemProp="image" itemScope itemType="https://schema.org/ImageObject">
        <R2Image
          src="products/room-dividers/natural-finish-1.jpg"
          alt="Natural palm wood room divider with vertical slats"
          width={800}
          height={600}
          priority
        />
        <meta itemProp="url" content="https://media.atelier-samui.com/products/room-dividers/natural-finish-1.jpg" />
        <meta itemProp="width" content="800" />
        <meta itemProp="height" content="600" />
      </div>

      <div itemProp="description">
        Premium room divider crafted from sustainable palm wood...
      </div>
    </article>
  );
}
```

---

## 🔄 Dynamic Product Images

```tsx
import { R2Image } from '@/components/r2-image';

interface ProductProps {
  productId: string;
  finish: 'natural' | 'light' | 'medium' | 'dark';
}

export default function DynamicProduct({ productId, finish }: ProductProps) {
  // Construct image path based on product and finish
  const imagePath = `products/${productId}/${finish}-finish.jpg`;

  return (
    <div>
      <R2Image
        src={imagePath}
        alt={`${productId} with ${finish} finish`}
        width={800}
        height={600}
      />
    </div>
  );
}
```

---

## 💡 Best Practices

### 1. Always Use Alt Text
```tsx
// ✅ Good
<R2Image src="products/table.jpg" alt="Dining table with palm wood top" />

// ❌ Bad
<R2Image src="products/table.jpg" alt="" />
```

### 2. Use Appropriate Sizes
```tsx
// For responsive layouts, use sizes prop
<R2Image
  src="products/image.jpg"
  alt="..."
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 3. Lazy Load Non-Critical Images
```tsx
// Only use priority for above-the-fold images
<R2Image src="hero.jpg" alt="..." priority /> // Above fold
<R2Image src="product.jpg" alt="..." /> // Below fold (lazy loaded)
```

### 4. Organize Files Consistently
```
✅ products/room-dividers/natural-finish-1.jpg
✅ projects/residential/villa-chaweng-living.jpg

❌ IMG_1234.jpg
❌ final-photo-v2.JPG
```

---

## 🚀 Migration Checklist

Replace existing images with R2:

```tsx
// Before (local images)
<img src="/images/products/room-divider.jpg" alt="..." />
<Image src="/images/products/table.jpg" width={800} height={600} alt="..." />

// After (R2 images)
<R2Image src="products/room-divider.jpg" alt="..." width={800} height={600} />
<R2Image src="products/table.jpg" alt="..." width={800} height={600} />
```

Search and replace pattern:
1. Find: `<Image src="/images/products/`
2. Replace: `<R2Image src="products/`
3. Update imports: Add `import { R2Image } from '@/components/r2-image';`

---

Happy building with Cloudflare R2! 🚀
