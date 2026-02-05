@echo off
title Stop Chat App
color 0C

echo ========================================
echo   Stopping Chat Application...
echo ========================================
echo.

:: Kill node processes (frontend)
echo Stopping Frontend (Node.js)...
taskkill /F /IM node.exe 2>nul
if %errorlevel%==0 (
    echo   Frontend stopped.
) else (
    echo   No frontend process found.
)

:: Kill dotnet processes (backend)
echo Stopping Backend (dotnet)...
taskkill /F /IM dotnet.exe 2>nul
if %errorlevel%==0 (
    echo   Backend stopped.
) else (
    echo   No backend process found.
)

echo.
echo ========================================
echo   All servers stopped!
echo ========================================
echo.
pause

