# Branching Workflow - Visual Guide

## Branch Structure

```
main (production)           o---o---o---o---o---o---o
                             \       \           \
                              \       \           \
develop (development)          o---o---o---o---o---o---o---o
                                \   \       \
                                 \   \       \
feature branches                  o   o       o---o
                                      |
                                  (merged back)
```

## Daily Development Workflow

```
┌─────────────────────────────────────────────────────────┐
│ 1. START: Working on new feature                       │
└─────────────────────────────────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ git checkout develop          │
        │ git pull origin develop       │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ git checkout -b feature/name  │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ Make your changes             │
        │ Edit files, test locally      │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ git add .                     │
        │ git commit -m "Add: feature"  │
        │ git push origin feature/name  │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ Create Pull Request on GitHub │
        │ feature/name → develop        │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ Review & Merge PR             │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ Auto-deploy to STAGING 🎭     │
        │ (develop branch)              │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ Test on staging environment   │
        └───────────────────────────────┘
```

## Production Release Workflow

```
┌─────────────────────────────────────────────────────────┐
│ 2. RELEASE: Deploy to production                       │
└─────────────────────────────────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ Develop branch is stable      │
        │ All features tested           │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ git checkout main             │
        │ git pull origin main          │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ git merge develop             │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ git tag -a v1.0.0 -m "msg"    │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ git push origin main          │
        │ git push origin --tags        │
        └───────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │ Auto-deploy to PRODUCTION 🚀  │
        │ (main branch)                 │
        └───────────────────────────────┘
```

## Environment Flow

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   LOCAL      │      │   STAGING    │      │  PRODUCTION  │
│ DEVELOPMENT  │─────▶│  (develop)   │─────▶│   (main)     │
└──────────────┘      └──────────────┘      └──────────────┘
     Your PC          kb-poc-dev.vercel     kb-poc.vercel
                                            or custom domain

     Work here         Test here            Users see this
     ↓                 ↓                    ↓
     Make changes      Verify features      Stable release
     Test locally      Show stakeholders    Production ready
```

## Typical Week Timeline

```
MONDAY
├─ Create feature/add-export
├─ Work on export functionality
└─ Push to feature branch

TUESDAY  
├─ Continue development
├─ Test locally
└─ Create Pull Request → develop

WEDNESDAY
├─ PR Review & feedback
├─ Make requested changes
└─ PR Merged to develop
    └─ Auto-deploy to STAGING ✓

THURSDAY
├─ Test on staging
├─ Show to team
└─ QA approval ✓

FRIDAY
├─ Merge develop → main
├─ Tag as v1.2.0
└─ Deploy to PRODUCTION 🚀
    └─ Users get new feature! 🎉
```

## Branch Responsibilities

### main (Production Branch)
```
✓ Always deployable
✓ Thoroughly tested code only
✓ Tagged releases (v1.0.0, v1.1.0, etc.)
✓ Protected - no direct commits
✓ Deployed to production environment
✓ What users see and use
```

### develop (Development Branch)
```
✓ Active development
✓ Feature integration
✓ Pre-release testing
✓ Deployed to staging environment
✓ Internal testing and reviews
✓ May have minor bugs (that's ok!)
```

### feature/* (Feature Branches)
```
✓ Short-lived (hours to days)
✓ Specific functionality
✓ Created from develop
✓ Merged back to develop
✓ Deleted after merge
✓ Example: feature/user-export, feature/dark-mode
```

## Deployment Environments Setup

### Option A: Single Vercel Project (Simpler)

```
Vercel Project: "kb-poc-app"
│
├─ Production Branch: main
│  └─ URL: kb-poc-app.vercel.app (or custom domain)
│
└─ Preview Deployments: develop (and all other branches)
   └─ URL: kb-poc-app-git-develop.vercel.app
```

### Option B: Two Vercel Projects (Recommended)

```
Vercel Project 1: "kb-poc-dev"
├─ Branch: develop
└─ URL: kb-poc-dev.vercel.app

Vercel Project 2: "kb-poc-prod"
├─ Branch: main
└─ URL: kb-poc-app.vercel.app (+ custom domain)
```

## Quick Reference Commands

### Daily Work
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# Save work
git add .
git commit -m "Add: my feature"
git push origin feature/my-feature

# After PR merged
git checkout develop
git pull origin develop
git branch -d feature/my-feature
```

### Release to Production
```bash
# Prepare release
git checkout main
git pull origin main
git merge develop
git tag -a v1.0.0 -m "Release v1.0.0"

# Deploy
git push origin main
git push origin --tags

# Update develop
git checkout develop
git pull origin develop
```

### Quick Fixes
```bash
# Hotfix for production
git checkout main
git checkout -b hotfix/critical-bug
# ... fix bug ...
git commit -m "Fix: critical bug"
git checkout main
git merge hotfix/critical-bug
git push origin main
git checkout develop
git merge hotfix/critical-bug
git push origin develop
```

## Key Principles

1. **Never commit directly to main** - Always use develop or feature branches
2. **Test before merging** - Use staging environment
3. **Small, frequent commits** - Easier to track and revert
4. **Descriptive commit messages** - Your future self will thank you
5. **Delete feature branches** - Keep repo clean after merging
6. **Tag all releases** - Easy to track versions and rollback
7. **Pull before push** - Avoid conflicts
8. **Review code** - Use Pull Requests for quality control

---

This workflow scales as your team grows and ensures production stability!
