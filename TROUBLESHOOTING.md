# 🔧 Troubleshooting Guide - Fcilite Electro

## Common Issues and Solutions

---

## 🗄️ Database Issues

### Problem: "Database connection failed"

**Symptoms:**
- Backend won't start
- Error: `ECONNREFUSED` or `password authentication failed`

**Solutions:**

1. **Check PostgreSQL is running:**
   ```powershell
   # Check service status
   Get-Service postgresql*
   
   # Start if stopped
   net start postgresql-x64-14
   ```

2. **Verify database exists:**
   ```sql
   -- In psql or pgAdmin
   \l
   -- Look for fcilite_electro
   
   -- If missing, create it:
   CREATE DATABASE fcilite_electro;
   ```

3. **Check credentials in `.env`:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=fcilite_electro
   DB_USER=postgres
   DB_PASSWORD=your_actual_password  # ← Check this!
   ```

4. **Test connection manually:**
   ```powershell
   psql -U postgres -d fcilite_electro
   # If this fails, your credentials are wrong
   ```

---

### Problem: "Tables don't exist"

**Symptoms:**
- Error: `relation "users" does not exist`
- Can't login even with correct credentials

**Solution:**
```powershell
cd backend
npm run build
npm run db:setup
```

---

### Problem: "Can't login with default credentials"

**Symptoms:**
- Login fails with `admin@fcilite.com / admin123`

**Solutions:**

1. **Run database setup again:**
   ```powershell
   cd backend
   npm run db:setup
   ```

2. **Check users table:**
   ```sql
   -- In psql
   \c fcilite_electro
   SELECT email, role FROM users;
   ```

3. **Manually insert admin user:**
   ```sql
   INSERT INTO users (email, password_hash, full_name, role)
   VALUES (
     'admin@fcilite.com',
     '$2a$10$rKzQxvJxGQVqH7HhN7gk5OX1YKJYXqxJHJCvPJvX8xKQZxZXqGZYi',
     'Admin User',
     'admin'
   );
   ```

---

## 🌐 Network Issues

### Problem: "Port already in use"

**Symptoms:**
- Error: `EADDRINUSE: address already in use :::5000`
- Backend or frontend won't start

**Solution for Backend (Port 5000):**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# You'll see something like:
# TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    12345

# Kill the process (replace 12345 with actual PID)
taskkill /PID 12345 /F
```

**Solution for Frontend (Port 3000):**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### Problem: "Frontend can't connect to backend"

**Symptoms:**
- Login fails silently
- API calls return network errors
- Console shows: `ERR_CONNECTION_REFUSED`

**Solutions:**

1. **Check backend is running:**
   - Open http://localhost:5000/health
   - Should see: `{"status":"OK",...}`

2. **Verify frontend .env.local:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Check CORS settings in backend:**
   - File: `backend/src/index.ts`
   - Should allow `http://localhost:3000`

4. **Restart both servers:**
   ```powershell
   # Kill all Node processes
   taskkill /F /IM node.exe
   
   # Restart from root
   npm run dev
   ```

---

## 📦 Dependency Issues

### Problem: "Module not found"

**Symptoms:**
- Error: `Cannot find module 'express'`
- TypeScript errors everywhere

**Solution:**
```powershell
# Backend
cd backend
rm -rf node_modules
rm package-lock.json
npm install

# Frontend
cd ../frontend
rm -rf node_modules
rm package-lock.json
npm install
```

---

### Problem: "TypeScript errors in IDE"

**Symptoms:**
- Red squiggly lines everywhere
- VS Code shows import errors

**Solutions:**

1. **Reload VS Code:**
   - Press `Ctrl+Shift+P`
   - Type: `Developer: Reload Window`

2. **Install @types packages:**
   ```powershell
   cd backend
   npm install --save-dev @types/node @types/express
   ```

3. **Check tsconfig.json exists:**
   - Should be in both `backend/` and `frontend/`

---

## 🎨 Frontend Issues

### Problem: "Page is blank / white screen"

**Symptoms:**
- http://localhost:3000 shows nothing
- Console shows errors

**Solutions:**

1. **Check browser console:**
   - Press F12
   - Look for errors in Console tab

2. **Clear Next.js cache:**
   ```powershell
   cd frontend
   rm -rf .next
   npm run dev
   ```

3. **Check for build errors:**
   - Look at terminal where frontend is running
   - Fix any compilation errors

---

### Problem: "Tailwind styles not working"

**Symptoms:**
- No styling applied
- Everything looks plain HTML

**Solutions:**

1. **Check tailwind.config.js:**
   ```js
   content: [
     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   ```

2. **Verify globals.css imports:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Restart dev server:**
   ```powershell
   cd frontend
   npm run dev
   ```

---

### Problem: "Images or assets not loading"

**Symptoms:**
- Broken image icons
- 404 errors for assets

**Solution:**
- Place images in `frontend/public/` folder
- Reference as `/image.png` (not `./public/image.png`)

---

## 🔐 Authentication Issues

### Problem: "JWT token expired"

**Symptoms:**
- Suddenly logged out
- Error: "Invalid or expired token"

**Solution:**
- Just login again
- Token expires after 7 days by default
- Change in `backend/.env`: `JWT_EXPIRES_IN=30d`

---

### Problem: "Can't access admin features"

**Symptoms:**
- "Insufficient permissions" error
- Delete buttons don't appear

**Solution:**
- Login with admin account: `admin@fcilite.com`
- Check user role in dashboard (should show "Admin")
- POS users can't delete or approve files

---

## 🐛 General Debugging Tips

### Enable Debug Logs

**Backend:**
```typescript
// Add to backend/src/index.ts
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend:**
```typescript
// Add to API calls
console.log('API Request:', url, data);
console.log('API Response:', response);
```

---

### Check What's Running

```powershell
# List all Node.js processes
Get-Process node

# Check ports in use
netstat -ano | findstr LISTEN
```

---

### Reset Everything

**Nuclear Option** - When nothing else works:

```powershell
# 1. Stop all Node processes
taskkill /F /IM node.exe

# 2. Clean backend
cd backend
rm -rf node_modules dist
npm install
npm run build

# 3. Clean frontend
cd ../frontend
rm -rf node_modules .next
npm install

# 4. Reset database
cd ../backend
npm run db:setup

# 5. Start fresh
cd ..
npm run dev
```

---

## 📱 Browser Issues

### Clear Browser Cache

1. **Chrome/Edge:**
   - Press `Ctrl+Shift+Delete`
   - Select "Cached images and files"
   - Clear

2. **Hard Reload:**
   - Press `Ctrl+Shift+R`

---

## 🔍 Still Having Issues?

### Collect Debug Information

```powershell
# 1. Check Node version
node --version  # Should be v18+

# 2. Check npm version
npm --version

# 3. Check PostgreSQL version
psql --version

# 4. Test database connection
psql -U postgres -d fcilite_electro -c "SELECT 1"

# 5. Check backend health
curl http://localhost:5000/health

# 6. View backend logs
cd backend
npm run dev
# Look for errors
```

### Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| ECONNREFUSED | Can't connect to DB | Check PostgreSQL running |
| EADDRINUSE | Port in use | Kill process on that port |
| 401 Unauthorized | Not logged in | Login again |
| 403 Forbidden | Wrong permissions | Use admin account |
| 404 Not Found | Route doesn't exist | Check API endpoint |
| 500 Internal Error | Backend crashed | Check backend logs |

---

## 💬 Need More Help?

1. Check backend terminal for error messages
2. Check frontend terminal for build errors
3. Check browser console (F12) for JavaScript errors
4. Review [README.md](README.md) and [QUICKSTART.md](QUICKSTART.md)

---

**Remember: Most issues are solved by:**
1. Checking if PostgreSQL is running
2. Verifying .env files are correct
3. Running `npm install` in both folders
4. Running `npm run db:setup` in backend
5. Restarting both servers

Good luck! 🎉
