# Chat App Startup Script (PowerShell)
# Runs both frontend and backend in separate windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Chat Application..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$rootDir = $PSScriptRoot

# Start Backend (.NET)
Write-Host "[1/2] Starting Backend Server..." -ForegroundColor Yellow
$backendPath = Join-Path $rootDir "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Backend Server (ASP.NET Core)' -ForegroundColor Green; Write-Host '================================' -ForegroundColor Green; dotnet run"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 2

# Start Frontend (Vite + React)
Write-Host "[2/2] Starting Frontend Server..." -ForegroundColor Yellow
$frontendPath = Join-Path $rootDir "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Frontend Server (Vite + React)' -ForegroundColor Green; Write-Host '================================' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Both servers are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Close the terminal windows to stop the servers." -ForegroundColor Gray

