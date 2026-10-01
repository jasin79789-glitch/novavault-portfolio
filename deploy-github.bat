@echo off
title NovaVault - 1-Click Deploy Live to GitHub Pages
color 0b
setlocal enabledelayedexpansion

cd /d "%~dp0"
set "PATH=%PATH%;C:\Users\m9890\AppData\Local\Programs\MinGit\cmd;C:\Users\m9890\AppData\Local\Programs\gh;C:\Program Files\nodejs"

echo ===============================================================================
echo                NOVAVAULT - 1-CLICK GITHUB & GITHUB PAGES DEPLOY
echo ===============================================================================
echo.
echo [STEP 1/3] Compiling high-performance production build...
call npm.cmd run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [FAIL] Build error occurred.
    pause
    exit /b 1
)
echo [OK] Production bundle built successfully in ./dist
echo.

echo [STEP 2/3] Checking GitHub CLI Authentication...
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Opening browser to connect your GitHub account...
    echo (Press Enter in your browser when prompted to Authorize)
    echo.
    call gh auth login --web -p https
)

echo.
echo [STEP 3/3] Creating/Connecting GitHub Repository...
git remote -v | findstr "origin" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Creating public repository 'novavault-portfolio' on your GitHub...
    call gh repo create novavault-portfolio --public --source=. --remote=origin --push
) else (
    echo Pushing latest code to GitHub repository...
    git push -u origin main
)

echo.
echo Deploying compiled site to GitHub Pages branch...
call npm.cmd run deploy

echo.
echo ===============================================================================
echo [CONGRATULATIONS!] Your NovaVault Portfolio is now LIVE on GitHub Pages!
echo Check your GitHub repository settings under 'Pages' to view the live link.
echo ===============================================================================
echo.
pause
