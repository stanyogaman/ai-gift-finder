# AI Gift Finder

A production-grade AI-powered gift recommendation platform built with Next.js 14, featuring multi-language support, Firebase authentication, and intelligent gift suggestions.

## Features

- **AI-Powered Quiz**: Interactive quiz with 10 questions to understand gift preferences
- **Smart Recommendations**: AI-generated gift ideas using OpenAI, Gemini, or Claude
- **Multi-Language Support**: Full English and Russian translations with next-intl
- **Firebase Authentication**: Sign in with Google, Facebook, Twitter/X, email, or phone
- **User Dashboard**: Personal account with quiz history and favorites
- **Blog System**: SEO-friendly gift guides with categories
- **Admin Panel**: Manage quiz questions, gifts, blog posts, static pages, and users
- **Partnership Program**: Sign-up form with email notifications
- **Legal Compliance**: Terms, Privacy Policy, Cookie Policy, Affiliate Disclosure

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Firebase Auth
- **AI Providers**: OpenAI / Google Gemini / Anthropic Claude
- **Internationalization**: next-intl
- **Email**: Nodemailer

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Firebase project
- AI provider API key (OpenAI, Gemini, or Claude)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stanyogaman/ai-gift-finder.git
   cd ai-gift-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` file with the required values (see Environment Variables section below)

5. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Seed the database with sample data:
   ```bash
   npx prisma db seed
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/giftfinder"

# Firebase (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""

# Session
JWT_SECRET="your-secure-random-string-min-32-chars"

# AI Provider (choose one: openai, gemini, claude)
GIFT_AI_PROVIDER="openai"

# AI API Keys (only need the one matching GIFT_AI_PROVIDER)
OPENAI_API_KEY=""
GOOGLE_GEMINI_API_KEY=""
ANTHROPIC_API_KEY=""

# Email (for partnership notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
EMAIL_FROM="noreply@yourdomain.com"
ADMIN_EMAIL="stanyogaman@gmail.com"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="AI Gift Finder"
```

## Project Structure

```
ai-gift-finder/
├── app/
│   ├── [locale]/
│   │   ├── (public)/           # Public pages
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── quiz/           # Quiz page
│   │   │   ├── results/        # Results page
│   │   │   ├── blog/           # Blog pages
│   │   │   ├── about/          # About page
│   │   │   ├── contact/        # Contact page
│   │   │   ├── faq/            # FAQ page
│   │   │   ├── partnerships/   # Partnership signup
│   │   │   ├── legal/          # Legal pages
│   │   │   └── auth/           # Auth pages
│   │   ├── (account)/          # User account area
│   │   └── (admin)/            # Admin panel
│   ├── api/                    # API routes
│   └── globals.css
├── components/
│   ├── layout/                 # Header, Footer, AuthProvider
│   ├── quiz/                   # Quiz components
│   ├── gifts/                  # Gift card components
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── ai/                     # AI provider abstraction
│   ├── auth/                   # Session management
│   ├── email/                  # Email sender
│   ├── firebase/               # Firebase client
│   ├── i18n/                   # Internationalization
│   ├── quiz/                   # Quiz logic
│   └── prisma.ts               # Prisma client
├── messages/                   # Translation files
│   ├── en.json
│   └── ru.json
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seeder
└── public/                     # Static assets
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero and features |
| `/quiz` | Interactive gift quiz |
| `/results` | Personalized gift recommendations |
| `/blog` | Gift guides and articles |
| `/about` | About the platform |
| `/contact` | Contact form |
| `/faq` | Frequently asked questions |
| `/partnerships` | Partnership/affiliate signup |
| `/legal/terms` | Terms of Service |
| `/legal/privacy` | Privacy Policy |
| `/legal/cookies` | Cookie Policy |
| `/legal/affiliate-disclosure` | Affiliate Disclosure |
| `/account` | User dashboard |
| `/account/history` | Quiz history |
| `/account/favorites` | Saved gifts |
| `/admin` | Admin dashboard |
| `/admin/quiz` | Manage quiz questions |
| `/admin/gifts` | Manage gift templates |
| `/admin/posts` | Manage blog posts |
| `/admin/pages` | Manage static pages |
| `/admin/partners` | View partnership requests |
| `/admin/users` | Manage users |

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/quiz/submit` | POST | Submit quiz answers, get AI recommendations |
| `/api/quiz/results` | GET | Fetch quiz results by session ID |
| `/api/auth/user` | POST | Sync Firebase user to database |
| `/api/partnership` | POST | Submit partnership request |
| `/api/contact` | POST | Submit contact form |
| `/api/account/history` | GET | Get user's quiz history |
| `/api/account/favorites` | GET/POST/DELETE | Manage favorites |
| `/api/admin/*` | Various | Admin CRUD operations |

## Database Schema

Main models:
- **User**: Firebase users synced to PostgreSQL
- **QuizSession**: Quiz submissions with answers and AI parameters
- **GiftIdea**: Individual gift recommendations per session
- **GiftTemplate**: Admin-managed gift catalog
- **BlogPost**: Blog articles with categories
- **BlogCategory**: Blog post categories
- **StaticPage**: Editable legal/static pages
- **PartnerRequest**: Partnership form submissions
- **UserFavorite**: User-saved gifts
- **QuizQuestion**: Admin-managed quiz questions

## Deployment

### Railway (Recommended)

1. Create a new Railway project
2. Add a PostgreSQL database
3. Connect your GitHub repository
4. Set environment variables in Railway dashboard
5. Deploy

### Vercel

1. Import your repository to Vercel
2. Add environment variables
3. Deploy
4. Note: You'll need an external PostgreSQL database (Railway, Neon, Supabase)

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Adding Languages

1. Create a new translation file in `messages/` (e.g., `messages/es.json`)
2. Add the locale to `lib/i18n/request.ts`:
   ```typescript
   export const locales = ['en', 'ru', 'es'] as const;
   ```
3. Update the language switcher in `components/layout/Header.tsx`

## Customization

### AI Provider

Set `GIFT_AI_PROVIDER` to:
- `openai` - Uses GPT-4
- `gemini` - Uses Gemini Pro
- `claude` - Uses Claude 3

### Theme Colors

Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  gift: {
    purple: '#8B5CF6',
    pink: '#EC4899',
    // ...
  }
}
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio
npx prisma db push   # Push schema changes
npx prisma db seed   # Seed database
```

## License

MIT License - See LICENSE file for details.

## Support

For issues and feature requests, please open an issue on GitHub.

---

Built with love for gift-giving
