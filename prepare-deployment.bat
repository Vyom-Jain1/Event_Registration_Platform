@echo off
echo ========================================
echo   Event Registration - Deployment Prep
echo ========================================
echo.

echo [1/5] Checking if git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)
echo Git is installed!

echo.
echo [2/5] Initializing Git repository...
if not exist ".git" (
    git init
    echo Repository initialized!
) else (
    echo Repository already initialized!
)

echo.
echo [3/5] Creating deployment branch...
git checkout -b main 2>nul
echo Branch ready!

echo.
echo [4/5] Staging all files...
git add .
echo Files staged!

echo.
echo [5/5] Showing deployment checklist...
echo.
echo ========================================
echo   DEPLOYMENT CHECKLIST
echo ========================================
echo.
echo BACKEND READY:
echo  [X] Dockerfile updated to Java 21
echo  [X] DataInitializer creates admin user
echo  [X] H2 database configured
echo  [X] CORS configuration ready
echo.
echo FRONTEND READY:
echo  [X] .env.production template created
echo  [X] Build command configured
echo  [X] API URL placeholder ready
echo.
echo DOCUMENTATION:
echo  [X] DEPLOYMENT.md - Step-by-step guide
echo  [X] README.md - Project overview
echo  [X] .gitignore - Deployment files
echo.
echo ========================================
echo   NEXT STEPS
echo ========================================
echo.
echo 1. Commit your code:
echo    git commit -m "Ready for Render deployment"
echo.
echo 2. Create GitHub repository at:
echo    https://github.com/new
echo.
echo 3. Add remote and push:
echo    git remote add origin YOUR_GITHUB_URL
echo    git push -u origin main
echo.
echo 4. Deploy to Render following DEPLOYMENT.md
echo.
echo ========================================
echo.
pause
