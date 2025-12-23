# 🖥️ Creating Desktop Shortcuts for Easy Access

## Why Create Shortcuts?
Desktop shortcuts make it super easy to start the application without navigating to the project folder.

## Option 1: Create "Start ElectroFacilite" Shortcut

### Steps:
1. **Right-click on your Desktop** → New → Shortcut
2. **For location, enter:**
   ```
   powershell.exe -ExecutionPolicy Bypass -File "c:\Users\Quick Tech\Desktop\ElectroFacilite\start-all.ps1"
   ```
3. **Click Next**
4. **Name it:** `Start ElectroFacilite`
5. **Click Finish**

### Customize Icon (Optional):
1. Right-click the shortcut → Properties
2. Click "Change Icon"
3. Browse to: `c:\Users\Quick Tech\Desktop\ElectroFacilite\logo\logo.png`

## Option 2: Create "Check Server Status" Shortcut

### Steps:
1. **Right-click on your Desktop** → New → Shortcut
2. **For location, enter:**
   ```
   powershell.exe -ExecutionPolicy Bypass -File "c:\Users\Quick Tech\Desktop\ElectroFacilite\check-status.ps1"
   ```
3. **Click Next**
4. **Name it:** `ElectroFacilite Status`
5. **Click Finish**

## Option 3: Pin to Taskbar

After creating the desktop shortcut:
1. **Right-click** the shortcut
2. Select **"Pin to taskbar"**
3. Now you can start the app with one click from your taskbar!

## Quick Access URLs (Create Browser Bookmarks)

### Frontend (Main Application):
- **URL:** http://localhost:3000
- **Name:** ElectroFacilite - Dashboard

### Backend API:
- **URL:** http://localhost:5000/api/health
- **Name:** ElectroFacilite - API Health

## Troubleshooting Shortcuts

### "Cannot be loaded because running scripts is disabled"
Run this in PowerShell **as Administrator**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Shortcut doesn't work
1. Right-click shortcut → Properties
2. Verify "Target" path is correct
3. Make sure "Start in" is empty or set to: `c:\Users\Quick Tech\Desktop\ElectroFacilite`

## Usage Tips

✅ **Always use "Start ElectroFacilite" shortcut** to launch the app
✅ **Don't close the PowerShell windows** that open (minimize them)
✅ **Use "Check Server Status"** if you're unsure if servers are running
✅ **Bookmark http://localhost:3000** in your browser for quick access

## What Happens When You Use the Shortcut?

1. Two PowerShell windows will open (one for backend, one for frontend)
2. Backend starts on port 5000 (about 2 seconds)
3. Frontend starts on port 3000 (about 8-10 seconds)
4. A message shows the URLs to access
5. Keep the PowerShell windows open while using the app

## Recovery If App Disappears

1. **Don't panic!** The project files are still there
2. Double-click the **"Start ElectroFacilite"** desktop shortcut
3. Wait 10-15 seconds for servers to start
4. Go to http://localhost:3000

## Prevention

⚠️ **The #1 reason the app "disappears" is when the frontend PowerShell window is closed**

**Always minimize** (don't close) the PowerShell windows!
