# Server Status Checker
# Run this script to check if both servers are running

Write-Host "🔍 Checking ElectroFacilite Server Status..." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check Backend
Write-Host "🔵 Backend Server (Port 5000):" -NoNewline
$backend = netstat -ano | findstr ":5000" | findstr "LISTENING"
if ($backend) {
    Write-Host " ✅ RUNNING" -ForegroundColor Green
    $backendPID = ($backend -split '\s+')[-1]
    Write-Host "   Process ID: $backendPID" -ForegroundColor Gray
} else {
    Write-Host " ❌ NOT RUNNING" -ForegroundColor Red
    Write-Host "   Run: .\start-backend.ps1" -ForegroundColor Yellow
}

Write-Host ""

# Check Frontend (3000)
Write-Host "🟢 Frontend Server (Port 3000):" -NoNewline
$frontend3000 = netstat -ano | findstr ":3000" | findstr "LISTENING"
if ($frontend3000) {
    Write-Host " ✅ RUNNING" -ForegroundColor Green
    $frontendPID = ($frontend3000 -split '\s+')[-1]
    Write-Host "   Process ID: $frontendPID" -ForegroundColor Gray
    Write-Host "   URL: http://localhost:3000" -ForegroundColor Cyan
} else {
    # Check 3001 as fallback
    Write-Host " ❌" -ForegroundColor Red
    Write-Host "🟢 Frontend Server (Port 3001):" -NoNewline
    $frontend3001 = netstat -ano | findstr ":3001" | findstr "LISTENING"
    if ($frontend3001) {
        Write-Host " ✅ RUNNING" -ForegroundColor Green
        $frontendPID = ($frontend3001 -split '\s+')[-1]
        Write-Host "   Process ID: $frontendPID" -ForegroundColor Gray
        Write-Host "   URL: http://localhost:3001" -ForegroundColor Cyan
    } else {
        Write-Host " ❌ NOT RUNNING" -ForegroundColor Red
        Write-Host "   Run: .\start-frontend.ps1" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan

# Overall status
if ($backend -and ($frontend3000 -or $frontend3001)) {
    Write-Host "✅ All servers are running properly!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Access the application at:" -ForegroundColor Cyan
    if ($frontend3000) {
        Write-Host "   http://localhost:3000" -ForegroundColor White
    } else {
        Write-Host "   http://localhost:3001" -ForegroundColor White
    }
} elseif ($backend -and -not ($frontend3000 -or $frontend3001)) {
    Write-Host "⚠️  Backend is running but Frontend is NOT!" -ForegroundColor Yellow
    Write-Host "   This is why the page appears 'disappeared'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick fix: Run .\start-frontend.ps1" -ForegroundColor Cyan
} elseif (-not $backend -and ($frontend3000 -or $frontend3001)) {
    Write-Host "⚠️  Frontend is running but Backend is NOT!" -ForegroundColor Yellow
    Write-Host "   API calls will fail" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick fix: Run .\start-backend.ps1" -ForegroundColor Cyan
} else {
    Write-Host "❌ No servers are running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Quick fix: Run .\start-all.ps1" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
