# ElectroFacilite Complete Startup Script
# This script starts both backend and frontend servers

Write-Host "🚀 Starting ElectroFacilite Application..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Check if backend is already running
$backendProcess = Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*backend*" }
if ($backendProcess) {
    Write-Host "⚠️  Backend server is already running (PID: $($backendProcess.Id))" -ForegroundColor Yellow
} else {
    Write-Host "🔵 Starting Backend Server..." -ForegroundColor Blue
    Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\start-backend.ps1"
    Start-Sleep -Seconds 3
}

# Check if frontend is already running
$frontendRunning = netstat -ano | findstr ":3000" | findstr "LISTENING"
if ($frontendRunning) {
    Write-Host "⚠️  Frontend server is already running on port 3000" -ForegroundColor Yellow
} else {
    Write-Host "🟢 Starting Frontend Server..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\start-frontend.ps1"
    Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✅ ElectroFacilite Application Started!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "📍 Frontend: http://localhost:3000 or http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "ℹ️  Two PowerShell windows have been opened (one for each server)" -ForegroundColor Yellow
Write-Host "ℹ️  Keep them running while using the application" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit this window..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
