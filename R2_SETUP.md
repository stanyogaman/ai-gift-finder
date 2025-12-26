# Cloudflare R2 Media Storage Setup Guide

This guide will help you set up Cloudflare R2 for storing all product images, project photos, and other media for Atelier Samui.

## Why Cloudflare R2?

✅ **Zero egress fees** - No charges for bandwidth
✅ **S3-compatible** - Easy migration and familiar API
✅ **Fast CDN** - Cloudflare's global network
✅ **Affordable** - $0.015/GB storage per month
✅ **Unlimited requests** - No operation charges

---

## Step 1: Create Cloudflare Account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up for a free account
3. Verify your email

---

## Step 2: Create R2 Bucket

1. Go to **R2 Object Storage** in the Cloudflare dashboard
2. Click **Create bucket**
3. **Bucket name:** `atelier-samui-media` (or your preferred name)
4. **Location:** Automatic (Cloudflare optimizes globally)
5. Click **Create bucket**

---

## Step 3: Get R2 Credentials

### Account ID
1. In Cloudflare dashboard, click on R2
2. Copy your **Account ID** (on the right sidebar)

### API Token (Access Key)
1. Click **Manage R2 API Tokens**
2. Click **Create API Token**
3. **Token name:** `atelier-samui-upload`
4. **Permissions:**
   - ✅ Object Read & Write
5. **TTL:** No expiration (or set your preference)
6. Click **Create API Token**
7. **Copy and save:**
   - Access Key ID
   - Secret Access Key
   - ⚠️ You won't see the secret again!

---

## Step 4: Set Up Public Access

### Option A: R2.dev Subdomain (Quick Start)

1. Go to your bucket settings
2. Click **Settings** tab
3. Under **Public access**, click **Allow access**
4. Enable **R2.dev subdomain**
5. Copy the URL: `https://pub-xxxxxxxxxxxxx.r2.dev`

This is your `NEXT_PUBLIC_R2_PUBLIC_URL`!

### Option B: Custom Domain (Recommended for Production)

1. Go to your bucket settings
2. Click **Settings** → **Public access**
3. Click **Connect domain**
4. Enter your domain: `media.atelier-samui.com`
5. Add the CNAME record to your DNS:
   ```
   Type: CNAME
   Name: media
   Target: [provided by Cloudflare]
   ```
6. Wait for DNS propagation (5-10 minutes)
7. Your public URL: `https://media.atelier-samui.com`

---

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cd apps/frontend
   cp .env.example .env.local
   ```

2. Fill in your R2 credentials:
   ```env
   # Cloudflare R2 Configuration
   R2_ACCOUNT_ID=your-account-id-here
   R2_ACCESS_KEY_ID=your-access-key-id
   R2_SECRET_ACCESS_KEY=your-secret-access-key
   R2_BUCKET_NAME=atelier-samui-media
   NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

---

## Step 6: Install AWS SDK

R2 uses S3-compatible API, so we use AWS SDK:

```bash
cd apps/frontend
npm install @aws-sdk/client-s3
```

---

## Step 7: Upload Images to R2

### Method 1: Using Cloudflare Dashboard (Manual)

1. Go to your R2 bucket
2. Click **Upload**
3. Organize by folders:
   ```
   products/
   ├── room-divider-1.jpg
   ├── room-divider-2.jpg
   ├── storage-system-1.jpg
   └── ...

   projects/
   ├── villa-chaweng-1.jpg
   ├── hotel-bophut-1.jpg
   └── ...

   hero/
   ├── homepage-hero.jpg
   └── ...
   ```

### Method 2: Using Upload API (Programmatic)

Create an upload page for admins:

```typescript
// Example usage
const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', 'products');

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  console.log('Uploaded:', data.url);
};
```

### Method 3: Using Wrangler CLI (Bulk Upload)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Upload files
wrangler r2 object put atelier-samui-media/products/image.jpg --file ./image.jpg
```

---

## Step 8: Use Images in Your Code

### In React Components

```tsx
import { R2Image } from '@/components/r2-image';

export default function ProductCard() {
  return (
    <R2Image
      src="products/room-divider-1.jpg"
      alt="Palm wood room divider"
      width={800}
      height={600}
      quality={85}
    />
  );
}
```

### Get Image URLs

```typescript
import { getR2ImageUrl } from '@/lib/r2-config';

const imageUrl = getR2ImageUrl('products/room-divider-1.jpg');
// Returns: https://media.atelier-samui.com/products/room-divider-1.jpg
```

---

## Image Organization Structure

Recommended folder structure in R2:

```
atelier-samui-media/
├── products/
│   ├── room-dividers/
│   │   ├── natural-finish-1.jpg
│   │   ├── dark-finish-1.jpg
│   │   └── ...
│   ├── storage-systems/
│   ├── tv-cabinets/
│   ├── wall-decor/
│   └── furniture/
│
├── projects/
│   ├── residential/
│   ├── hospitality/
│   └── commercial/
│
├── hero/
│   ├── homepage-hero.jpg
│   └── about-hero.jpg
│
├── gallery/
│   └── ...
│
└── team/
    └── team-photo.jpg
```

---

## Image Naming Conventions

**Good practices:**
- Use lowercase
- Use hyphens (not spaces or underscores)
- Include descriptive names
- Include finish/color if applicable

**Examples:**
```
✅ room-divider-natural-finish-open.jpg
✅ storage-system-bedroom-led-lights.jpg
✅ villa-chaweng-living-room-front.jpg

❌ IMG_1234.jpg
❌ Room Divider.jpg
❌ photo_final_v2.JPG
```

---

## Optimizing Images

### Before Upload

1. **Resize images:**
   - Product cards: 800x600px
   - Hero images: 1920x1080px
   - Gallery: 1200x900px

2. **Compress images:**
   - Use tools like TinyPNG, Squoosh, or ImageOptim
   - Target: 100-300KB per image
   - Quality: 85%

3. **Use modern formats:**
   - WebP (best compression)
   - AVIF (even better, but less supported)
   - JPEG as fallback

### Using Cloudflare Images (Optional Upgrade)

Cloudflare Images provides on-the-fly transformations:

1. Enable Cloudflare Images in dashboard
2. Upload images to Cloudflare Images
3. Get automatic resizing, format conversion, and CDN

**Pricing:** $5/month for 100,000 images served

---

## Costs Estimate

For Atelier Samui website:

**Storage:**
- ~100 product images × 200KB = 20MB
- ~50 project images × 300KB = 15MB
- ~10 hero/misc images × 500KB = 5MB
- **Total:** ~40MB = **$0.0006/month**

**Bandwidth:**
- **$0 egress fees** (main benefit of R2!)

**Operations:**
- Free (no charges for GET/PUT requests)

**Total monthly cost:** Less than $0.01/month! 🎉

---

## Troubleshooting

### Images not showing

1. **Check public URL:**
   ```bash
   curl https://your-r2-url/products/image.jpg
   ```
   Should return the image, not 403/404

2. **Verify environment variables:**
   ```typescript
   console.log(process.env.NEXT_PUBLIC_R2_PUBLIC_URL);
   ```
   Should show your R2 URL

3. **Check CORS settings** (if uploading from browser):
   - Go to R2 bucket settings
   - Add CORS rule:
     ```json
     [
       {
         "AllowedOrigins": ["https://atelier-samui.com"],
         "AllowedMethods": ["GET", "PUT", "POST"],
         "AllowedHeaders": ["*"]
       }
     ]
     ```

### Upload fails

1. **Check credentials:**
   - Verify Access Key ID and Secret are correct
   - Ensure API token has Read & Write permissions

2. **Check bucket name:**
   - Must match exactly (case-sensitive)

3. **File size limits:**
   - R2 max file size: 5TB (way more than needed!)
   - Our limit: 10MB (set in code)

---

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default

2. **Use separate credentials** for development and production

3. **Rotate API tokens** every 3-6 months

4. **Set up bucket policies** to prevent accidental deletion:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Deny",
         "Action": "s3:DeleteObject",
         "Resource": "arn:aws:s3:::atelier-samui-media/*"
       }
     ]
   }
   ```

5. **Monitor usage** in Cloudflare dashboard

---

## Production Deployment

### Vercel

1. Go to Project Settings → Environment Variables
2. Add all R2 variables:
   - `R2_ACCOUNT_ID`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET_NAME`
   - `NEXT_PUBLIC_R2_PUBLIC_URL`
3. Redeploy

### Railway

Same process - add variables in Railway dashboard

---

## Migration from Local Images

If you have existing images in `/public/images/`:

1. **Upload to R2:**
   ```bash
   # Using Wrangler
   wrangler r2 object put atelier-samui-media/products/image.jpg \
     --file ./public/images/products/image.jpg
   ```

2. **Update code:**
   ```tsx
   // Before
   <img src="/images/products/image.jpg" />

   // After
   <R2Image src="products/image.jpg" />
   ```

3. **Remove local images:**
   ```bash
   rm -rf public/images/products/
   ```

---

## Next Steps

1. ✅ Create R2 bucket
2. ✅ Get credentials
3. ✅ Set up public access
4. ✅ Configure `.env.local`
5. ✅ Install AWS SDK
6. ✅ Upload first test image
7. ✅ Test in development
8. ✅ Upload all product images
9. ✅ Deploy to production

---

## Need Help?

- **Cloudflare R2 Docs:** https://developers.cloudflare.com/r2/
- **AWS S3 SDK Docs:** https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-s3/
- **Cloudflare Discord:** https://discord.gg/cloudflaredev

Your media is now fast, affordable, and globally distributed! 🚀
