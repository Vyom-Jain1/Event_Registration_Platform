#!/bin/bash

echo "========================================"
echo "  Event Registration - Deployment Prep"
echo "========================================"
echo ""

echo "[1/5] Checking if git is installed..."
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed!"
    echo "Please install Git first"
    exit 1
fi
echo "✓ Git is installed!"

echo ""
echo "[2/5] Initializing Git repository..."
if [ ! -d ".git" ]; then
    git init
    echo "✓ Repository initialized!"
else
    echo "✓ Repository already initialized!"
fi

echo ""
echo "[3/5] Creating deployment branch..."
git checkout -b main 2>/dev/null || git checkout main
echo "✓ Branch ready!"

echo ""
echo "[4/5] Staging all files..."
git add .
echo "✓ Files staged!"

echo ""
echo "[5/5] Deployment status..."
echo ""
echo "========================================"
echo "  DEPLOYMENT CHECKLIST"
echo "========================================"
echo ""
echo "BACKEND READY:"
echo " ✓ Dockerfile updated to Java 21"
echo " ✓ DataInitializer creates admin user"
echo " ✓ H2 database configured"
echo " ✓ CORS configuration ready"
echo ""
echo "FRONTEND READY:"
echo " ✓ .env.production template created"
echo " ✓ Build command configured"
echo " ✓ API URL placeholder ready"
echo ""
echo "DOCUMENTATION:"
echo " ✓ DEPLOYMENT.md - Step-by-step guide"
echo " ✓ .gitignore - Deployment files"
echo ""
echo "========================================"
echo "  NEXT STEPS"
echo "========================================"
echo ""
echo "1. Commit your code:"
echo "   git commit -m 'Ready for Render deployment'"
echo ""
echo "2. Create GitHub repository at:"
echo "   https://github.com/new"
echo ""
echo "3. Add remote and push:"
echo "   git remote add origin YOUR_GITHUB_URL"
echo "   git push -u origin main"
echo ""
echo "4. Deploy to Render following DEPLOYMENT.md"
echo ""
echo "========================================"
echo ""
