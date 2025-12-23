@echo off
echo.
echo ========================================
echo   Fcilite Electro - Starting Servers
echo ========================================
echo.

echo Starting Backend Server...
start "Backend - Port 5000" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend - Port 3000" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two command windows have opened.
echo Keep them running while using the app.
echo.
pause
