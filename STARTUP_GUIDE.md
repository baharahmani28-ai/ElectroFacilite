# 🚨 PREVENTING "PROJECT DISAPPEARED" ISSUE

## Problem
The application appears to "disappear" or become inaccessible when the frontend server stops running.

## Root Cause
- Backend server (port 5000) runs independently
- Frontend server (port 3000/3001) must also be running to access the UI
- If frontend crashes or is closed, the page becomes inaccessible

## Solution - Quick Start Scripts

### ✅ **Recommended: Use start-all.ps1**
Double-click `start-all.ps1` in the project root. This will:
- Check if servers are already running
- Start backend in a new PowerShell window
- Start frontend in another PowerShell window
- Show you the URLs to access the application

### Individual Scripts
- `start-backend.ps1` - Start only backend server (port 5000)
- `start-frontend.ps1` - Start only frontend server (port 3000)

## How to Check If Servers Are Running

### Check Backend (Port 5000)
```powershell
netstat -ano | findstr ":5000" | findstr "LISTENING"
```
Should show: `TCP    0.0.0.0:5000`

### Check Frontend (Port 3000 or 3001)
```powershell
netstat -ano | findstr ":3000" | findstr "LISTENING"
netstat -ano | findstr ":3001" | findstr "LISTENING"
```
Should show: `TCP    0.0.0.0:3000` or `TCP    0.0.0.0:3001`

## Manual Start Commands

### Backend
```powershell
cd "c:\Users\Quick Tech\Desktop\ElectroFacilite\backend"
npx tsc
npm start
```

### Frontend
```powershell
cd "c:\Users\Quick Tech\Desktop\ElectroFacilite\frontend"
npm run dev
```

## Troubleshooting

### Frontend Not Starting
1. **Port already in use**: Frontend auto-selects 3001 if 3000 is busy
2. **Check for errors**: Look at the PowerShell window for error messages
3. **Reinstall dependencies**: 
   ```powershell
   cd frontend
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

### Backend Not Starting
1. **Check .env file exists** in backend directory
2. **Verify PostgreSQL is running**
3. **Check database credentials** in backend/.env

### Both Servers Running But Page Won't Load
1. Clear browser cache (Ctrl + Shift + Delete)
2. Try incognito/private browsing mode
3. Check browser console for errors (F12)
4. Verify URLs:
   - Backend: http://localhost:5000/api/health
   - Frontend: http://localhost:3000 (or 3001)

## Prevention Tips

✅ **Always keep both PowerShell windows open** while using the application
✅ **Don't close terminal windows** - minimize them instead
✅ **Use start-all.ps1** to ensure both servers start correctly
✅ **Check server status** before reporting issues

## Quick Recovery
If the page disappears:

1. Open PowerShell in project root
2. Run: `.\start-all.ps1`
3. Wait for both servers to start (5-10 seconds)
4. Access: http://localhost:3000

## Access URLs
- **Frontend (User Interface)**: http://localhost:3000 or http://localhost:3001
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432 (Odoo PostgreSQL)

## Credentials
**Admin Account:**
- Email: admin@fcilite.com
- Password: admin123

**Branch Accounts:**
- Batna: batna@fcilite.com / batna123
- Constantine: constantine@fcilite.com / constantine123
- Sétif: setif@fcilite.com / setif123
- Bou Saada: bousaada@fcilite.com / bousaada123
- Barika: barika@fcilite.com / barika123
- M'Sila: msila@fcilite.com / msila123
