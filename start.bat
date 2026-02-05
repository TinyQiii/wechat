@echo off
title Chat App Launcher
color 0B

echo ========================================
echo   Starting Chat Application...
echo ========================================
echo.

:: Get the directory where the script is located
set ROOT_DIR=%~dp0

:: Start Backend in a new window
echo [1/2] Starting Backend Server...
start "Backend - ASP.NET Core" cmd /k "cd /d %ROOT_DIR%backend && echo Backend Server (ASP.NET Core) && echo ================================ && dotnet run"

:: Wait 2 seconds for backend to start
timeout /t 2 /nobreak > nul

:: Start Frontend in a new window
echo [2/2] Starting Frontend Server...
start "Frontend - Vite + React" cmd /k "cd /d %ROOT_DIR%frontend && echo Frontend Server (Vite + React) && echo ================================ && npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo.
echo   Close the terminal windows to stop the servers.
echo.
pause

