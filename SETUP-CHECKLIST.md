# Setup Checklist - Start Here! ✅

Follow these steps in order to get your development environment set up properly.

## Part 1: Local Setup (5 minutes)

### Step 1: Verify Prerequisites
```bash
# Check Node.js is installed (need 18+)
node --version
# Should show v18.x.x or higher

# Check npm is installed
npm --version
# Should show 9.x.x or higher

# Check git is installed
git --version
# Should show 2.x.x or higher
```

**Don't have these?**
- Node.js: https://nodejs.org (download LTS version)
- Git: https://git-scm.com/downloads

---

### Step 2: Install Dependencies
```bash
# Navigate to project folder
cd kb-poc-app

# Install all packages
npm install

# Wait 1-2 minutes for installation to complete
```

**Expected output:** 
```
added 500+ packages in 1m
```

---

### Step 3: Test Locally
```bash
# Start development server
npm run dev
```

**Expected output:**
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Ready in 2.3s
```

**Open browser:** http://localhost:3000

**Test login:**
- Email: `agent@kbpoc.com`
- Password: `password123`

**✅ If you see the login page, you're good!**

---

## Part 2: Git Setup (10 minutes)

### Step 4: Initialize Git Repository

**Option A: Use the automated script (Recommended)**
```bash
# Make script executable (Mac/Linux)
chmod +x setup-git.sh

# Run the setup script
./setup-git.sh

# Follow the prompts
```

**Option B: Manual setup**
```bash
# Initialize repository
git init

# Create initial commit
git add .
git commit -m "Initial commit: Knowledge Base POC application"

# Create develop branch
git checkout -b develop

# Switch back to main
git checkout main
```

---

### Step 5: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Repository name:** `kb-poc-app` (or your choice)
3. **Important:** Keep it EMPTY
   - ❌ Don't check "Add README"
   - ❌ Don't check "Add .gitignore"
   - ❌ Don't add a license
4. **Click:** "Create repository"
5. **Copy** the repository URL (looks like: `https://github.com/username/kb-poc-app.git`)

---

### Step 6: Connect Local to GitHub

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/kb-poc-app.git

# Push main branch
git push -u origin main

# Push develop branch
git checkout develop
git push -u origin develop

# Verify both branches are on GitHub
git branch -a
```

**Expected output:**
```
* develop
  main
  remotes/origin/develop
  remotes/origin/main
```

**✅ Go to GitHub and verify you see both branches**

---

## Part 3: Deploy to Vercel (10 minutes)

### Step 7: Create Vercel Account

1. **Go to:** https://vercel.com
2. **Click:** "Sign Up"
3. **Choose:** "Continue with GitHub"
4. **Authorize** Vercel to access your repositories

---

### Step 8: Deploy Development Environment

1. **Click:** "Add New Project"
2. **Import** your `kb-poc-app` repository
3. **Framework Preset:** Next.js (auto-detected)
4. **Project Name:** `kb-poc-dev`
5. **Important Settings:**
   - Build & Development Settings: Keep defaults
   - Root Directory: `./`
   - Click "Environment Variables" (optional - skip for now)
6. **Click:** "Deploy"
7. **Wait** 2-3 minutes for deployment

**✅ You'll get a URL like:** `kb-poc-dev.vercel.app`

---

### Step 9: Configure Branch Settings

In Vercel project settings:

1. **Go to:** Settings → Git
2. **Production Branch:** Change from `main` to `develop`
3. **Save**

Now your develop branch deploys automatically!

---

### Step 10: Deploy Production Environment (Optional)

**Option A: Same project, different branch**
- Just use preview URLs for main branch
- Simpler, but less clear separation

**Option B: Separate project (Recommended)**
1. Create another Vercel project: `kb-poc-prod`
2. Import same GitHub repo
3. Production Branch: `main`
4. This is your actual production site

---

## Part 4: Verify Everything Works

### Test Development Workflow

```bash
# 1. Switch to develop
git checkout develop

# 2. Create a test feature
git checkout -b feature/test

# 3. Make a small change (edit README.md, add a line)
echo "Test change" >> README.md

# 4. Commit and push
git add .
git commit -m "Test: verify git workflow"
git push origin feature/test

# 5. Go to GitHub, create Pull Request
# 6. Merge it to develop
# 7. Watch it auto-deploy on Vercel!
```

**✅ Check Vercel dashboard for new deployment**

---

## Your Setup is Complete! 🎉

You now have:

- ✅ Local development environment
- ✅ Git version control
- ✅ Two branches (main & develop)
- ✅ GitHub repository
- ✅ Automatic deployments
- ✅ Staging environment (develop)
- ✅ Production environment (main)

---

## Quick Reference

### URLs
```
Local:       http://localhost:3000
Development: https://kb-poc-dev.vercel.app
Production:  https://kb-poc-prod.vercel.app (if you set it up)
```

### Test Accounts
```
Support Agent:
  Email: agent@kbpoc.com
  Password: password123

Admin:
  Email: admin@kbpoc.com
  Password: password123
```

### Daily Commands
```bash
# Start working
git checkout develop
git pull origin develop

# Create feature
git checkout -b feature/name

# Save work
git add .
git commit -m "Add: description"
git push origin feature/name

# After PR merged, cleanup
git checkout develop
git pull origin develop
git branch -d feature/name
```

---

## Next Steps

Now you're ready to:

1. **Start building features** - Work in feature branches
2. **Test on staging** - Use develop branch
3. **Deploy to production** - Merge to main when ready
4. **Add a custom domain** - See DEPLOYMENT.md
5. **Invite collaborators** - Add team members on GitHub

---

## Need Help?

- 📖 **Detailed Git workflow:** See `GIT-WORKFLOW.md`
- 🌿 **Branching guide:** See `BRANCHING-GUIDE.md`
- 🚀 **Deployment help:** See `DEPLOYMENT.md`
- 📚 **App documentation:** See `README.md`

---

## Troubleshooting

**npm install fails:**
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Git push fails:**
```bash
# Check remote is set
git remote -v

# If missing:
git remote add origin YOUR_GITHUB_URL
```

**Vercel deployment fails:**
- Check Vercel build logs
- Verify package.json exists
- Make sure you pushed to correct branch
- Check for TypeScript errors

**Port 3000 already in use:**
```bash
# Use different port
npm run dev -- -p 3001
```

---

Happy coding! 🚀
