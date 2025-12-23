# 🚨 SOLUTION: "PROJECT DISAPPEARED" PROBLEM - COMPLETE FIX

## ✅ **PROBLEM SOLVED**

Your ElectroFacilite application is now running correctly on:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

Both servers are **ACTIVE** and ready to use!

---

## 🔍 What Was The Problem?

The **frontend server was not running**, which made the application appear "disappeared". The backend was running, but users access the application through the frontend interface.

### Why It Happened:
1. Frontend server was closed or crashed
2. Only one PowerShell window was running (backend only)
3. No automatic restart mechanism was in place

---

## 🛡️ PERMANENT PREVENTION SOLUTION

I've created **4 PowerShell scripts** to prevent this from ever happening again:

### 1. **start-all.ps1** ⭐ (MAIN SCRIPT - USE THIS)
- **What it does**: Starts BOTH backend AND frontend servers
- **How to use**: Double-click the file or run `.\start-all.ps1`
- **Result**: Two PowerShell windows open (one for each server)

### 2. **start-backend.ps1**
- **What it does**: Starts only the backend server
- **When to use**: When only backend needs to restart

### 3. **start-frontend.ps1**
- **What it does**: Starts only the frontend server
- **When to use**: When only frontend needs to restart

### 4. **check-status.ps1** 🔍 (DIAGNOSTIC TOOL)
- **What it does**: Shows if servers are running or not
- **How to use**: Double-click when you're unsure about server status
- **Shows**: 
  - ✅ Which servers are running
  - ❌ Which servers are NOT running
  - 🔗 URLs to access the app
  - 💡 Quick fix commands

---

## 📖 HOW TO USE (Step by Step)

### **Every Time You Want To Start The Application:**

1. **Navigate** to: `c:\Users\Quick Tech\Desktop\ElectroFacilite`
2. **Double-click**: `start-all.ps1`
3. **Two windows will open**:
   - Window 1: Backend server (port 5000)
   - Window 2: Frontend server (port 3000)
4. **Wait 10-15 seconds** for both to start
5. **Open browser** and go to: http://localhost:3000
6. **Login** with:
   - Admin: admin@fcilite.com / admin123
   - Or any branch account

### **IMPORTANT RULES:**

✅ **DO**: Minimize the PowerShell windows (don't close them!)
✅ **DO**: Use `check-status.ps1` if you're unsure
✅ **DO**: Bookmark http://localhost:3000 in your browser
✅ **DO**: Create desktop shortcuts (see DESKTOP_SHORTCUTS.md)

❌ **DON'T**: Close the PowerShell windows while using the app
❌ **DON'T**: Restart your computer without closing the app properly
❌ **DON'T**: Run multiple instances of the scripts

---

## 🔧 TROUBLESHOOTING

### Problem: "Script cannot be loaded" Error

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Run this **once** in PowerShell as Administrator

---

### Problem: Port Already In Use

**Backend (Port 5000):**
```powershell
# Find process using port 5000
netstat -ano | findstr ":5000"
# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Frontend (Port 3000):**
```powershell
# Find process using port 3000
netstat -ano | findstr ":3000"
# Kill the process
taskkill /PID <PID> /F
```

---

### Problem: Page Shows "Cannot connect to server"

**Check Status:**
```powershell
.\check-status.ps1
```

**If Backend is down:**
```powershell
.\start-backend.ps1
```

**If Frontend is down:**
```powershell
.\start-frontend.ps1
```

---

### Problem: Page is Blank or Shows Error

1. **Clear browser cache**: Ctrl + Shift + Delete
2. **Try incognito mode**: Ctrl + Shift + N
3. **Check browser console**: Press F12, look for errors
4. **Restart both servers**:
   ```powershell
   # Stop all node processes
   taskkill /IM node.exe /F
   
   # Start fresh
   .\start-all.ps1
   ```

---

## 🎯 QUICK REFERENCE COMMANDS

| Task | Command |
|------|---------|
| Start everything | `.\start-all.ps1` |
| Check status | `.\check-status.ps1` |
| Start backend only | `.\start-backend.ps1` |
| Start frontend only | `.\start-frontend.ps1` |
| Stop all servers | `taskkill /IM node.exe /F` |
| Check backend | `netstat -ano \| findstr ":5000"` |
| Check frontend | `netstat -ano \| findstr ":3000"` |

---

## 📍 ACCESS POINTS

| Service | URL | Description |
|---------|-----|-------------|
| **Main Application** | http://localhost:3000 | User interface |
| **Alternative Port** | http://localhost:3001 | If 3000 is busy |
| **Backend API** | http://localhost:5000 | API endpoints |
| **API Health Check** | http://localhost:5000/api/health | Server status |
| **Database** | localhost:5432 | PostgreSQL (Odoo) |

---

## 🔐 LOGIN CREDENTIALS

### Admin Account (Full Control):
- **Email**: admin@fcilite.com
- **Password**: admin123
- **Access**: All branches, approve/reject customers, add products

### Branch Accounts (Limited to own branch):
| Branch | Email | Password |
|--------|-------|----------|
| Batna | batna@fcilite.com | batna123 |
| Constantine | constantine@fcilite.com | constantine123 |
| Sétif | setif@fcilite.com | setif123 |
| Bou Saada | bousaada@fcilite.com | bousaada123 |
| Barika | barika@fcilite.com | barika123 |
| M'Sila | msila@fcilite.com | msila123 |

---

## 📚 ADDITIONAL DOCUMENTATION

- **[STARTUP_GUIDE.md](STARTUP_GUIDE.md)** - Detailed startup procedures
- **[DESKTOP_SHORTCUTS.md](DESKTOP_SHORTCUTS.md)** - Create desktop shortcuts
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - General troubleshooting
- **[README.md](README.md)** - Complete project documentation

---

## ✅ VERIFICATION CHECKLIST

Before reporting "project disappeared" issue again, check:

- [ ] Ran `check-status.ps1` to verify server status
- [ ] Both PowerShell windows are open and running
- [ ] Can access http://localhost:3000 in browser
- [ ] Tried clearing browser cache
- [ ] Tried incognito/private browsing mode
- [ ] Checked for error messages in PowerShell windows
- [ ] Verified PostgreSQL database is running

---

## 🎉 SUCCESS INDICATORS

You know everything is working when:

✅ **check-status.ps1 shows**: "All servers are running properly!"
✅ **Browser shows**: Login page at http://localhost:3000
✅ **Backend responds**: http://localhost:5000/api/health returns "OK"
✅ **Two PowerShell windows** are open and showing no errors
✅ **Can login** with admin@fcilite.com / admin123

---

## 💡 PRO TIPS

1. **Create desktop shortcuts** - See DESKTOP_SHORTCUTS.md
2. **Bookmark the app** - Add http://localhost:3000 to browser favorites
3. **Use check-status.ps1 first** - Before assuming something is wrong
4. **Keep PowerShell windows visible** - Minimize to taskbar, don't close
5. **Run start-all.ps1 at startup** - Add to Windows startup folder if needed

---

## 🆘 EMERGENCY RECOVERY

If everything fails and you can't access the app:

```powershell
# 1. Kill all Node processes
taskkill /IM node.exe /F

# 2. Navigate to project folder
cd "c:\Users\Quick Tech\Desktop\ElectroFacilite"

# 3. Start fresh
.\start-all.ps1

# 4. Wait 15 seconds

# 5. Open browser to http://localhost:3000
```

**If still not working**: Check if PostgreSQL database is running (Odoo service)

---

**Last Updated**: November 11, 2025
**Status**: ✅ FULLY OPERATIONAL
**Current Servers**: Backend (port 5000) ✅ | Frontend (port 3000) ✅
