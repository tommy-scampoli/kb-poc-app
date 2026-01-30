# Quick Deployment Guide

## 🚀 Get Your App Live in 10 Minutes

### Step 1: Prepare Your Code

1. **Create a GitHub account** if you don't have one: https://github.com
2. **Create a new repository** (name it `kb-poc-app`)
3. **Upload your code** to GitHub:
   ```bash
   cd kb-poc-app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/kb-poc-app.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel (FREE)

1. **Go to** https://vercel.com
2. **Sign up** using your GitHub account
3. **Click "Add New Project"**
4. **Import** your `kb-poc-app` repository
5. **Click "Deploy"** (Vercel auto-configures everything for Next.js)
6. **Wait 2-3 minutes** for deployment to complete
7. **Done!** Your app is live at `https://kb-poc-app.vercel.app`

### Step 3: Add Your Custom Domain (Optional)

#### If you already own a domain:

1. **In Vercel**, go to your project → Settings → Domains
2. **Add your domain** (e.g., `kb.yourdomain.com`)
3. **Copy the DNS records** Vercel provides
4. **Go to your domain registrar** (Namecheap, Google Domains, etc.)
5. **Add the DNS records**:
   - Type: CNAME
   - Name: kb (or whatever subdomain you want)
   - Value: cname.vercel-dns.com
6. **Wait 5-30 minutes** for DNS to propagate
7. **Done!** Access your app at your custom domain

#### If you need to buy a domain:

1. **Go to** Namecheap.com or Google Domains
2. **Search** for your desired domain name
3. **Purchase** ($10-15/year typically)
4. **Follow steps above** to add it to Vercel

### Alternative: Deploy to Netlify

1. **Go to** https://netlify.com
2. **Sign up** with GitHub
3. **Click "Add new site" → "Import an existing project"**
4. **Select** your GitHub repository
5. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. **Click "Deploy"**
7. **Done!**

---

## 🎯 Understanding Your URLs

### Local Development
- URL: `http://localhost:3000`
- Only accessible on your computer

### Vercel Deployment
- Automatic URL: `https://your-project-name.vercel.app`
- Accessible anywhere in the world
- HTTPS included (secure)
- Can add custom domain later

### Custom Domain
- Your choice: `https://kb.yourdomain.com`
- Professional looking
- Requires purchasing a domain ($10-15/year)

---

## 📝 Quick Checklist

**Before deploying:**
- [ ] All files created
- [ ] Code pushed to GitHub
- [ ] package.json exists

**After deploying:**
- [ ] Test login with both accounts
- [ ] Try searching for content
- [ ] Check admin page (admin account only)
- [ ] Verify responsive design on mobile

**For production:**
- [ ] Change JWT_SECRET in environment variables
- [ ] Add proper error handling
- [ ] Set up monitoring/analytics
- [ ] Consider adding a database

---

## 🆘 Common Issues

**Build fails on Vercel:**
- Check Vercel build logs for specific errors
- Usually TypeScript or missing dependency issues
- Fix locally, then push to GitHub again

**App loads but search doesn't work:**
- Check browser console for errors
- Verify API routes are deployed correctly
- Check that data files are included in deployment

**Login fails:**
- Verify users.json is deployed
- Check browser console for error messages
- Make sure you're using correct test credentials

---

## 💡 What You've Built

You now have a fully functional web application with:

✅ Professional UI
✅ User authentication  
✅ Role-based permissions
✅ Multi-source search
✅ Admin dashboard
✅ Live on the internet
✅ HTTPS encryption
✅ Automatic deployments (when you push to GitHub)

**Next steps:**
- Connect to real knowledge base APIs
- Add a proper database (Supabase/PostgreSQL)
- Implement AI-powered search with Claude API
- Add analytics and monitoring
- Invite users to test it out!
