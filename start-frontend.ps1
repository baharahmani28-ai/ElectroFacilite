# ElectroFacilite Frontend Startup Script
Write-Host "🚀 Starting ElectroFacilite Frontend Server..." -ForegroundColor Cyan

# Navigate to frontend directory
Set-Location -Path "$PSScriptRoot\frontend"

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host "✅ Starting frontend server (will auto-select port 3000 or 3001)..." -ForegroundColor Green
npm run dev
