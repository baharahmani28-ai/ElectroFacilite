@echo off
echo ============================================
echo   ElectroFacilite - Starting Servers
echo ============================================
echo.

REM Start Backend
echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d c:\Users\Quick Tech\Desktop\ElectroFacilite\backend && npm start"
timeout /t 3 /nobreak >nul

REM Start Frontend
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d c:\Users\Quick Tech\Desktop\ElectroFacilite\frontend && npm run dev"

echo.
echo ============================================
echo   Servers Starting...
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo ============================================
echo.
echo Press any key to exit...
pause >nul
