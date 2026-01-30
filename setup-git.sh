#!/bin/bash

# Knowledge Base POC - Git Setup Script
# This script initializes the repository with proper branching

echo "🚀 Knowledge Base POC - Git Setup"
echo "=================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already a git repository
if [ -d .git ]; then
    echo "⚠️  This is already a Git repository."
    echo "   Current branches:"
    git branch
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    # Initialize git repository
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Repository initialized"
    echo ""
fi

# Create initial commit on main
echo "📝 Creating initial commit on main branch..."
git add .
git commit -m "Initial commit: Knowledge Base POC application" 2>/dev/null || echo "   (Files already committed)"
echo "✅ Initial commit created"
echo ""

# Create develop branch
echo "🌿 Creating develop branch..."
git checkout -b develop 2>/dev/null || git checkout develop
echo "✅ Develop branch created and checked out"
echo ""

# Show current status
echo "📊 Current Git Status:"
echo "   Active branch: $(git branch --show-current)"
echo "   Available branches:"
git branch
echo ""

# Prompt for GitHub remote
echo "🔗 GitHub Remote Setup"
echo "====================="
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "2. DO NOT initialize with README, .gitignore, or license"
echo "3. Copy the repository URL"
echo ""
read -p "Do you want to add a GitHub remote now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your GitHub repository URL: " repo_url
    
    # Check if origin already exists
    if git remote | grep -q "origin"; then
        echo "⚠️  Remote 'origin' already exists. Removing it..."
        git remote remove origin
    fi
    
    git remote add origin "$repo_url"
    echo "✅ Remote 'origin' added"
    echo ""
    
    read -p "Push both branches to GitHub now? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📤 Pushing main branch..."
        git push -u origin main
        echo ""
        echo "📤 Pushing develop branch..."
        git push -u origin develop
        echo ""
        echo "✅ Both branches pushed to GitHub!"
    fi
fi

echo ""
echo "🎉 Git Setup Complete!"
echo "====================="
echo ""
echo "Your repository structure:"
echo "  main    - Production branch (stable releases)"
echo "  develop - Development branch (active development)"
echo ""
echo "Quick commands:"
echo "  Switch to develop: git checkout develop"
echo "  Switch to main:    git checkout main"
echo "  See all branches:  git branch"
echo ""
echo "📖 For detailed workflow, see: GIT-WORKFLOW.md"
echo ""
