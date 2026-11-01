@echo off
title Strydex Community Portal
echo ========================================================
echo        Launching Strydex Community Portal
echo ========================================================
echo.

if not exist node_modules (
    echo [1/2] Installing required dependencies...
    call npm install
) else (
    echo [1/2] Dependencies already installed.
)

echo.
echo [2/2] Starting local development server...
echo.
start http://localhost:5173/
call npm run dev
pause
