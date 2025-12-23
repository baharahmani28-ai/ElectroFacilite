@echo off
title Fcilite Electro - Status Check
color 0A
echo.
echo ========================================
echo   FCILITE ELECTRO - STATUS CHECK
echo ========================================
echo.

echo [1/4] Checking Node.js processes...
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] Node.js processes are running
    echo.
    tasklist /FI "IMAGENAME eq node.exe" /FO TABLE
) else (
    echo [WARNING] No Node.js processes found
)

echo.
echo [2/4] Checking ports...
netstat -ano | findstr ":3000.*LISTENING" >NUL 2>&1
if "%ERRORLEVEL%"=="0" (
    echo [OK] Frontend is running on port 3000
) else (
    echo [ERROR] Frontend is NOT running on port 3000
)

netstat -ano | findstr ":5000.*LISTENING" >NUL 2>&1
if "%ERRORLEVEL%"=="0" (
    echo [OK] Backend is running on port 5000
) else (
    echo [ERROR] Backend is NOT running on port 5000
)

echo.
echo [3/4] Testing Backend API...
curl -s http://localhost:5000/health >NUL 2>&1
if "%ERRORLEVEL%"=="0" (
    echo [OK] Backend API is responding
    curl -s http://localhost:5000/health
) else (
    echo [ERROR] Backend API is not responding
)

echo.
echo [4/4] Testing Frontend...
curl -s http://localhost:3000 >NUL 2>&1
if "%ERRORLEVEL%"=="0" (
    echo [OK] Frontend is responding
) else (
    echo [ERROR] Frontend is not responding
)

echo.
echo ========================================
echo   STATUS CHECK COMPLETE
echo ========================================
echo.
echo Access your application at:
echo   http://localhost:3000
echo.
echo Admin credentials:
echo   Email: admin@fcilite.com
echo   Password: admin123
echo.
pause
