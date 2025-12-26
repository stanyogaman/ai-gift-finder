# 🚀 HOW TO PUSH TO GITHUB (atelier-samui repository)

Your Atelier Samui website is ready! Follow these simple steps to push it to GitHub.

## Prerequisites

✅ You have a GitHub account
✅ You have the repository created at: https://github.com/stanyogaman/atelier-samui

---

## Step 1: Navigate to the New Project

```bash
cd /home/user/atelier-samui-temp
```

---

## Step 2: Connect to Your GitHub Repository

```bash
# Add your GitHub repository as the remote
git remote add origin https://github.com/stanyogaman/atelier-samui.git

# Rename the branch to 'main' (GitHub's default)
git branch -M main
```

---

## Step 3: Push to GitHub

```bash
# Push all files to GitHub
git push -u origin main
```

**If this is your first time pushing:**
- You'll be asked for GitHub credentials
- Use your GitHub username
- For password, use a **Personal Access Token** (not your GitHub password!)

### How to Create a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Atelier Samui Deploy"
4. Select scopes: ✅ `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## Step 4: Verify on GitHub

Go to: https://github.com/stanyogaman/atelier-samui

You should see all your files! 🎉

---

## Alternative: Push with SSH (If you have SSH keys set up)

If you have SSH keys configured with GitHub:

```bash
cd /home/user/atelier-samui-temp
git remote set-url origin git@github.com:stanyogaman/atelier-samui.git
git push -u origin main
```

---

## What's Included

This repository contains the complete Atelier Samui furniture website:

📄 **Pages:**
- Homepage (/)
- Products Catalog (/products)
- Cost Calculator (/calculator)
- About Us (/about)
- Contact Form (/contact)
- Projects Gallery (/projects)

🎨 **Features:**
- Premium tropical design
- Interactive cost calculator
- Contact form with email integration
- Google Maps integration
- Responsive design
- SEO optimized

📧 **Backend:**
- Contact form API (/api/contact)
- Email service support (SMTP, SendGrid, Resend)
- Environment variables template

---

## Next Steps After Pushing

1. **Deploy to Vercel** (recommended):
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   cd /home/user/atelier-samui-temp
   vercel
   ```

2. **Set up email service** - See EMAIL_SETUP.md

3. **Customize Google Maps** - Add your exact location in contact page

4. **Add product images** - Replace placeholders with actual furniture photos

---

## Troubleshooting

### Error: "repository not found"
- Make sure the repository exists at https://github.com/stanyogaman/atelier-samui
- Create it on GitHub first if it doesn't exist

### Error: "authentication failed"
- Use a Personal Access Token, not your GitHub password
- Make sure the token has `repo` permissions

### Error: "remote already exists"
- Run: `git remote remove origin`
- Then repeat Step 2

---

## Need Help?

The project is now in: `/home/user/atelier-samui-temp`

All files are committed and ready to push. Just run the commands above! 🚀
