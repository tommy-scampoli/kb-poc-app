# Git Branching Strategy Guide

## Overview

We'll use a two-branch strategy:
- **`main`** (production) - Always stable, deployed to production
- **`develop`** (development) - Active development, deployed to staging/preview

## Initial Setup

### Step 1: Initialize Git Repository

```bash
cd kb-poc-app

# Initialize git
git init

# Create .gitignore if not exists (already created)
# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Knowledge Base POC app"
```

### Step 2: Create Development Branch

```bash
# Create and switch to develop branch
git checkout -b develop

# Verify you're on develop
git branch
# You should see:
# * develop
#   main
```

### Step 3: Connect to GitHub

```bash
# Create a new repository on GitHub (go to github.com)
# Don't initialize with README (we already have code)
# Copy the repository URL

# Add remote
git remote add origin https://github.com/YOUR-USERNAME/kb-poc-app.git

# Push both branches
git push -u origin main
git push -u origin develop
```

## Daily Workflow

### Making Changes

```bash
# 1. Always start from develop branch
git checkout develop

# 2. Pull latest changes
git pull origin develop

# 3. Create a feature branch (optional but recommended)
git checkout -b feature/new-feature-name

# 4. Make your changes
# ... edit files ...

# 5. Stage and commit
git add .
git commit -m "Add: descriptive message about what you changed"

# 6. Push to GitHub
git push origin feature/new-feature-name
```

### Merging to Development

```bash
# Option A: Merge feature branch into develop locally
git checkout develop
git merge feature/new-feature-name
git push origin develop

# Option B: Create Pull Request on GitHub (recommended)
# 1. Push your feature branch
# 2. Go to GitHub
# 3. Click "New Pull Request"
# 4. Base: develop <- Compare: feature/new-feature-name
# 5. Review and merge
```

### Deploying to Production

```bash
# Only when develop is stable and tested!

# 1. Switch to main
git checkout main

# 2. Pull latest
git pull origin main

# 3. Merge develop into main
git merge develop

# 4. Tag the release (optional but recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# 5. Push to GitHub
git push origin main
git push origin --tags
```

## Deployment Setup

### Two Environments on Vercel

#### Environment 1: Development (Auto-deploy from develop)

1. Go to Vercel
2. Import your GitHub repository
3. **Important Settings:**
   - Production Branch: `develop`
   - This will be your staging environment
   - URL: `kb-poc-app-dev.vercel.app`

#### Environment 2: Production (Auto-deploy from main)

1. In Vercel, go to Project Settings
2. Git → Production Branch
3. Change to: `main`
4. Add a custom domain (optional): `kb.yourdomain.com`
5. URL: `kb-poc-app.vercel.app`

**OR create two separate Vercel projects:**
- Project 1: "kb-poc-dev" → watches `develop` branch
- Project 2: "kb-poc-prod" → watches `main` branch

### Alternative: Netlify Setup

#### Development Environment:
1. Site 1: Connect to `develop` branch
2. Deploy settings: Build from `develop`
3. URL: `kb-poc-dev.netlify.app`

#### Production Environment:
1. Site 2: Connect to `main` branch
2. Deploy settings: Build from `main`
3. URL: `kb-poc-app.netlify.app`
4. Add custom domain here

## Branch Protection Rules (GitHub)

Protect your main branch from accidental changes:

1. Go to GitHub → Repository → Settings → Branches
2. Add rule for `main`:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

3. Optional: Add rule for `develop` too

## Common Git Commands Reference

```bash
# Check current branch
git branch

# Switch branches
git checkout develop
git checkout main

# See what changed
git status
git diff

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename.ts
git reset --hard HEAD  # WARNING: destroys all local changes

# Update from remote
git fetch origin
git pull origin develop

# Delete feature branch (after merging)
git branch -d feature/feature-name
git push origin --delete feature/feature-name
```

## Commit Message Best Practices

Use clear, descriptive commit messages:

```bash
# Good examples:
git commit -m "Add: user authentication with JWT"
git commit -m "Fix: search not returning results for admin users"
git commit -m "Update: improve search relevance algorithm"
git commit -m "Remove: deprecated API endpoint"
git commit -m "Refactor: extract search logic into separate service"

# Bad examples:
git commit -m "changes"
git commit -m "fix bug"
git commit -m "update"
```

**Prefix conventions:**
- `Add:` - New feature
- `Fix:` - Bug fix
- `Update:` - Modify existing feature
- `Remove:` - Delete code/feature
- `Refactor:` - Code restructuring
- `Docs:` - Documentation changes
- `Style:` - Formatting, no code change
- `Test:` - Add or modify tests

## Workflow Example

Here's a complete workflow example:

```bash
# Day 1: Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/add-categories-filter

# ... make changes to add category filtering ...

git add .
git commit -m "Add: category filter to search interface"
git push origin feature/add-categories-filter

# Create Pull Request on GitHub: feature/add-categories-filter -> develop

# Day 2: Feature approved, merge to develop
# (Done via GitHub PR or locally:)
git checkout develop
git merge feature/add-categories-filter
git push origin develop

# Develop automatically deploys to staging environment
# Test on staging: kb-poc-app-dev.vercel.app

# Day 3: Everything works, ready for production
git checkout main
git pull origin main
git merge develop
git tag -a v1.0.1 -m "Release: Add category filtering"
git push origin main
git push origin --tags

# Main automatically deploys to production
# Live on: kb-poc-app.vercel.app or your custom domain
```

## Emergency Hotfix Workflow

If you need to fix a critical bug in production:

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# 2. Make the fix
# ... fix the bug ...

git add .
git commit -m "Fix: critical authentication bug in production"

# 3. Merge to main
git checkout main
git merge hotfix/critical-bug-fix
git tag -a v1.0.2 -m "Hotfix: Authentication bug"
git push origin main
git push origin --tags

# 4. Also merge to develop so it has the fix
git checkout develop
git merge hotfix/critical-bug-fix
git push origin develop

# 5. Delete hotfix branch
git branch -d hotfix/critical-bug-fix
```

## Troubleshooting

### Merge Conflicts

```bash
# If you get conflicts during merge:
git merge develop
# Auto-merging file.ts
# CONFLICT (content): Merge conflict in file.ts

# 1. Open conflicting files
# 2. Look for conflict markers:
#    <<<<<<< HEAD
#    your changes
#    =======
#    their changes
#    >>>>>>> develop

# 3. Manually resolve (keep what you need)
# 4. Remove conflict markers
# 5. Stage the resolved files
git add file.ts

# 6. Complete the merge
git commit -m "Merge: resolve conflicts from develop"
```

### Accidentally Committed to Wrong Branch

```bash
# If you committed to main instead of develop:

# 1. Undo the commit (keep changes)
git reset --soft HEAD~1

# 2. Stash your changes
git stash

# 3. Switch to correct branch
git checkout develop

# 4. Apply your changes
git stash pop

# 5. Commit to correct branch
git add .
git commit -m "Your message"
```

## Summary

**Development Flow:**
1. Work on `develop` or feature branches
2. Test locally
3. Push to GitHub
4. Auto-deploys to staging environment
5. Test on staging

**Production Flow:**
1. Merge `develop` → `main` when stable
2. Tag release
3. Push to GitHub
4. Auto-deploys to production
5. Monitor production

**Key Rules:**
- Never commit directly to `main`
- Always test on `develop` first
- Use pull requests for code review
- Tag all production releases
- Keep commit messages clear and descriptive

---

Need help with any of these steps? Just ask!
