# 🔧 Quick Database Setup Guide

## Current Status
✅ **Frontend is LIVE** at http://localhost:3000
❌ **Backend needs database** connection

## Issue
PostgreSQL authentication failed. We need to configure the correct database credentials.

## Solution Options

### Option 1: Find Your PostgreSQL Password (Recommended)

Your PostgreSQL is running with Odoo. The password might be in Odoo's configuration:

1. Look for Odoo config file, usually at:
   - `C:\Program Files\Odoo\server\odoo.conf`
   - OR check Odoo installation folder

2. Find the line with `db_password = ...`

3. Update `backend\.env` file with that password:
   ```
   DB_USER=odoo
   DB_PASSWORD=<password_from_odoo_config>
   ```

### Option 2: Create New PostgreSQL User

If you have pgAdmin or can access PostgreSQL:

```sql
-- Run this in pgAdmin or psql
CREATE USER fcilite WITH PASSWORD 'fcilite123';
ALTER USER fcilite CREATEDB;
```

Then update `backend\.env`:
```
DB_USER=fcilite
DB_PASSWORD=fcilite123
```

### Option 3: Manual Database Creation

If you can access PostgreSQL, manually create the database:

1. Open pgAdmin or connect to PostgreSQL
2. Create new database: `fcilite_electro`
3. Run the SQL from: `backend\database\schema.sql`
4. Optional: Run `backend\database\sample_data.sql` for test data

## After Fixing Database

Run these commands:

```powershell
# Setup database
cd "c:\Users\Quick Tech\Desktop\ElectroFacilite\backend"
npm run db:setup

# Start backend server
npm run dev
```

## Current Working Parts

✅ **Frontend is fully functional** - You can see the interface at http://localhost:3000
✅ **All dependencies installed**
✅ **TypeScript compiled successfully**
✅ **Environment files configured**

🔄 **Just need to connect the database!**

## Default Login Credentials (After Database Setup)

- **Admin:** admin@fcilite.com / admin123
- **POS:** pos@fcilite.com / pos123

---

## Quick Test Without Backend

The frontend loads, showing the login page with the **Fcilite Electro** branding and your requested colors:
- Blue #007bff (primary)
- Light Green #8fd19e (secondary)
- Clean white interface

Just can't login yet without the backend running!
