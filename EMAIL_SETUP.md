# Email Service Setup Guide

This guide will help you configure email sending for the Atelier Samui contact form.

## Quick Start

1. Copy the environment variables template:
   ```bash
   cd apps/frontend
   cp .env.example .env.local
   ```

2. Choose an email service and follow the setup instructions below
3. Restart your development server

## Email Service Options

### Option 1: Gmail SMTP (Recommended for Development)

**Pros:** Free, easy to set up, reliable
**Cons:** Daily sending limits (500 emails/day), requires app password

#### Setup Steps:

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to Google Account Settings → Security → 2-Step Verification

2. **Create an App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Configure environment variables** in `.env.local`:
   ```env
   EMAIL_SERVICE=smtp
   CONTACT_EMAIL=your-business-email@gmail.com
   FROM_EMAIL=your-business-email@gmail.com

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-business-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

4. **Install Nodemailer:**
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

5. **Uncomment the Nodemailer code** in `apps/frontend/app/api/contact/route.ts`

---

### Option 2: SendGrid (Recommended for Production)

**Pros:** Reliable, good free tier (100 emails/day), excellent deliverability
**Cons:** Requires account verification

#### Setup Steps:

1. **Create a SendGrid account:**
   - Go to https://signup.sendgrid.com/
   - Verify your email

2. **Verify your sender email/domain:**
   - Go to Settings → Sender Authentication
   - Complete Single Sender Verification (quick) or Domain Authentication (better deliverability)

3. **Create an API key:**
   - Go to Settings → API Keys → Create API Key
   - Choose "Full Access"
   - Copy the API key (you won't see it again!)

4. **Configure environment variables** in `.env.local`:
   ```env
   EMAIL_SERVICE=sendgrid
   CONTACT_EMAIL=info@atelier-samui.com
   FROM_EMAIL=noreply@atelier-samui.com
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
   ```

5. **Install SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```

6. **Uncomment the SendGrid code** in `apps/frontend/app/api/contact/route.ts`

---

### Option 3: Resend (Modern Alternative)

**Pros:** Modern API, generous free tier, great DX
**Cons:** Newer service

#### Setup Steps:

1. **Create a Resend account:**
   - Go to https://resend.com/signup

2. **Verify your domain** (or use their onboarding.resend.dev for testing):
   - Go to Domains → Add Domain
   - Add the DNS records they provide

3. **Create an API key:**
   - Go to API Keys → Create API Key
   - Copy the API key

4. **Configure environment variables** in `.env.local`:
   ```env
   EMAIL_SERVICE=resend
   CONTACT_EMAIL=info@atelier-samui.com
   FROM_EMAIL=noreply@atelier-samui.com
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
   ```

5. **Install Resend:**
   ```bash
   npm install resend
   ```

6. **Uncomment the Resend code** in `apps/frontend/app/api/contact/route.ts`

---

## Testing Email Configuration

### Development Mode (No Email Service)

If you don't configure any email service, the contact form will:
- Still accept submissions successfully
- Log email content to the console
- Show success message to users

This is perfect for development!

### Testing with Real Email Service

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/contact

3. Fill out the contact form

4. Check:
   - ✅ You should receive an email at `CONTACT_EMAIL`
   - ✅ The customer should receive an auto-reply
   - ✅ The form should reset and show success message

### Troubleshooting

**Gmail "Less secure app access" error:**
- Make sure you're using an App Password, not your regular password
- Ensure 2FA is enabled on your Google account

**SendGrid not sending:**
- Verify your sender email/domain is verified in SendGrid
- Check your API key has "Full Access" permissions
- Look for emails in the SendGrid Activity Feed

**"Network error" in form:**
- Check your `.env.local` file is in `apps/frontend/` directory
- Restart your Next.js development server
- Check the browser console for detailed errors

---

## Production Deployment

### Vercel/Netlify

Add environment variables in your hosting dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy your application

### Railway/Heroku

Use CLI or dashboard to set environment variables:
```bash
# Railway
railway variables set EMAIL_SERVICE=sendgrid
railway variables set SENDGRID_API_KEY=your-key

# Heroku
heroku config:set EMAIL_SERVICE=sendgrid
heroku config:set SENDGRID_API_KEY=your-key
```

---

## Email Templates

The contact form sends two emails:

1. **To Business (CONTACT_EMAIL):**
   - Subject: "New Project Inquiry: [Project Type]"
   - Contains all form data in formatted HTML

2. **To Customer (Auto-Reply):**
   - Subject: "Thank you for contacting Atelier Samui"
   - Confirmation with submission details

You can customize these templates in:
`apps/frontend/app/api/contact/route.ts`

---

## Security Best Practices

1. **Never commit `.env.local` to Git** - it's in `.gitignore` by default
2. **Use different credentials** for development and production
3. **Rotate API keys regularly** (every 3-6 months)
4. **Monitor email sending limits** to avoid service disruptions
5. **Set up SPF and DKIM records** for better deliverability (SendGrid/Resend handle this)

---

## Cost Comparison

| Service | Free Tier | Paid Plans |
|---------|-----------|------------|
| **Gmail SMTP** | 500 emails/day | Not recommended for production |
| **SendGrid** | 100 emails/day | $15/mo for 40k emails |
| **Resend** | 3,000 emails/mo | $20/mo for 50k emails |

For Atelier Samui's contact form, the free tier of any service should be sufficient unless you receive 100+ inquiries per day.

---

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check your server logs (terminal running `npm run dev`)
3. Verify environment variables are loaded: `console.log(process.env.EMAIL_SERVICE)`
4. Test with development mode first (no EMAIL_SERVICE set)
