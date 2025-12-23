@echo off
echo ========================================
echo   Fcilite Electro - Complete Restart
echo ========================================
echo.

echo Step 1: Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 3 /nobreak >nul

echo Step 2: Starting Backend Server...
start "Fcilite Backend (Port 5000)" cmd /k "cd /d %~dp0backend && npm start"
timeout /t 5 /nobreak >nul

echo Step 3: Starting Frontend Server...
start "Fcilite Frontend (Port 3000)" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:3000
echo ========================================
echo.
echo Opening browser in 10 seconds...
timeout /t 10 /nobreak >nul
start http://localhost:3000

exit
