# Atelier Samui - Premium Palm Wood Furniture

![Atelier Samui](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Security](https://img.shields.io/badge/CVE--2025--55182-Not%20Vulnerable-brightgreen?style=for-the-badge)

**Premium tropical furniture website for custom-built furniture from sustainable palm wood.**

🌴 **Website:** https://atelier-samui.com (Coming Soon)
📧 **Contact:** info@atelier-samui.com
📍 **Location:** Bophut, Koh Samui, Thailand

---

## 🎨 Features

### Pages
- **Homepage** - Hero section, product showcase, philosophy, and CTAs
- **Products Catalog** - 6 furniture categories with detailed descriptions
- **Cost Calculator** - Interactive real-time cost estimation tool
- **About Us** - Company story, values, process, and materials
- **Contact** - Form with email integration & Google Maps
- **Projects Gallery** - Portfolio with category filters

### Functionality
- ✅ **Contact Form API** - Email service integration (SMTP/SendGrid/Resend)
- ✅ **Google Maps** - Embedded showroom location
- ✅ **Cost Calculator** - Real-time pricing with multiple parameters
- ✅ **3D/AR Visualizer** - Structure ready for GLB/GLTF models
- ✅ **Responsive Design** - Mobile, tablet, desktop optimized
- ✅ **SEO Optimized** - Proper metadata and structure

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cd apps/frontend
cp .env.example .env.local
```

Edit `.env.local` with your email service credentials (see EMAIL_SETUP.md)

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## 📁 Project Structure

```
atelier-samui/
├── apps/
│   ├── frontend/          # Next.js 14 App Router
│   │   ├── app/
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── products/          # Products catalog
│   │   │   ├── calculator/        # Cost calculator
│   │   │   ├── about/             # About page
│   │   │   ├── contact/           # Contact page
│   │   │   ├── projects/          # Projects gallery
│   │   │   └── api/contact/       # Contact form API
│   │   ├── components/            # React components
│   │   └── globals.css            # Custom design system
│   └── backend/           # Express API (optional)
├── packages/
│   ├── ui/                # shadcn/ui components
│   ├── utils/             # Shared utilities
│   └── types/             # TypeScript types
├── EMAIL_SETUP.md         # Email configuration guide
└── README.md
```

---

## 🎨 Design System

### Color Palette
- **Primary:** Warm golden palm wood (#b8860b)
- **Accent:** Tropical coconut gold
- **Background:** White/Light gray
- **Text:** Dark gray (#333)

### Typography
- **Headings:** Montserrat (600 weight)
- **Body:** Poppins (400 weight)

### Inspiration
Modern tropical design inspired by Rimadesio's minimalist aesthetic.

---

## 📧 Email Configuration

The contact form supports three email services:

1. **SMTP** (Gmail, etc.) - Best for development
2. **SendGrid** - Recommended for production
3. **Resend** - Modern alternative

See **EMAIL_SETUP.md** for detailed setup instructions.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Design System
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Email:** Nodemailer / SendGrid / Resend
- **Maps:** Google Maps Embed API

---

## 🔒 Security

**Protected Against Critical Vulnerabilities**

This project is secured against recent critical vulnerabilities:
- ✅ **CVE-2025-55182** (React2Shell) - Not vulnerable (using React 18.3.1)
- ✅ **CVE-2025-55184** - Patched (Next.js 14.2.35)
- ✅ **CVE-2025-67779** - Patched (Next.js 14.2.35)

**Current Security Status:**
- React: `18.3.1` (React 19 vulnerability does not affect this version)
- Next.js: `14.2.35` (includes all security patches)
- Regular dependency scanning and updates

📋 **[Full Security Advisory →](SECURITY.md)**

---

## 🌍 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard:
- `EMAIL_SERVICE`
- `CONTACT_EMAIL`
- `SMTP_*` or `SENDGRID_API_KEY` or `RESEND_API_KEY`

### Other Platforms
- **Netlify:** Connect GitHub repo, set build command `npm run build`
- **Railway:** Auto-deploy from GitHub
- **Custom Server:** `npm run build && npm start`

---

## 📝 Product Categories

1. **Room Dividers** - Coconut slat partitions (฿25,000 - ฿150,000)
2. **Storage Systems** - Wardrobes with LED lighting (฿40,000 - ฿300,000)
3. **TV Cabinets** - Media walls with hidden storage (฿35,000 - ฿200,000)
4. **Wall Decor** - Architectural panels (฿15,000 - ฿100,000)
5. **Custom Furniture** - Tables and benches (฿18,000 - ฿120,000)
6. **Complete Interiors** - Full-scale solutions (Custom Quote)

---

## 🔧 Customization

### Change Colors

Edit `apps/frontend/app/globals.css`:

```css
:root {
  --primary: 35 65% 45%;      /* Golden palm wood */
  --accent: 40 70% 55%;       /* Coconut gold */
}
```

### Add Google Maps API Key

1. Get API key from: https://console.cloud.google.com/apis/credentials
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key-here
   ```
3. Update map location in `apps/frontend/app/contact/page.tsx`

### Add 3D Models

The AR visualizer structure is ready for GLB/GLTF models:
- Add models to `/public/models/`
- Update product pages with 3D viewer component

---

## 📸 Adding Product Images

Replace placeholders in:
- Homepage product cards
- Products catalog
- Projects gallery

Recommended image sizes:
- Product cards: 800x600px
- Hero images: 1920x1080px
- Gallery images: 1200x900px

---

## 🌟 Key Features to Highlight

- **100% Sustainable Materials** - Palm wood from Thailand
- **Custom Design** - Every piece tailored to client vision
- **Premium Craftsmanship** - Integrated LED lighting & precision metalwork
- **Tropical Elegance** - Perfect for villas, hotels, restaurants

---

## 📄 License

Copyright © 2025 Atelier Samui. All rights reserved.

---

## 🤝 Support

For questions about the website:
- **Email:** info@atelier-samui.com
- **Phone:** +66 (0)12 345 6789
- **Location:** 123 Moo 4, Bophut, Koh Samui, Surat Thani 84320, Thailand

---

## 🎯 Target Audience

- Villa owners in Thailand
- Hotel and resort managers
- Restaurant and cafe owners
- Interior designers and architects
- Private clients seeking custom tropical furniture

---

**Built with ❤️ for sustainable tropical living**
