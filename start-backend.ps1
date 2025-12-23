# ElectroFacilite Backend Startup Script
Write-Host "🚀 Starting ElectroFacilite Backend Server..." -ForegroundColor Cyan

# Navigate to backend directory
Set-Location -Path "$PSScriptRoot\backend"

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if .env file exists
if (-Not (Test-Path ".env")) {
    Write-Host "❌ ERROR: .env file not found in backend directory!" -ForegroundColor Red
    Write-Host "Please create a .env file with database configuration." -ForegroundColor Red
    exit 1
}

# Compile TypeScript
Write-Host "🔨 Compiling TypeScript..." -ForegroundColor Yellow
npx tsc

# Start the server
Write-Host "✅ Starting backend server on port 5000..." -ForegroundColor Green
npm start
