# 🚀 Quick Start Guide - Fcilite Electro

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install PostgreSQL
Download and install PostgreSQL from: https://www.postgresql.org/download/windows/

During installation, remember your password!

### Step 2: Create Database

Open **pgAdmin** or **psql** and run:
```sql
CREATE DATABASE fcilite_electro;
```

### Step 3: Install Project

Open PowerShell in the project folder:

```powershell
# Navigate to project
cd "c:\Users\Quick Tech\Desktop\ElectroFacilite"

# Install all dependencies
npm install
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### Step 4: Configure Backend

```powershell
# Copy environment file
cd backend
copy .env.example .env
```

Edit `backend\.env` and update:
- `DB_PASSWORD` - Your PostgreSQL password
- `DB_USER` - Usually "postgres"

### Step 5: Setup Database Tables

```powershell
# Build and setup database
npm run build
npm run db:setup
```

You should see:
```
✅ Database setup completed successfully!
📝 Default users created:
   Admin: admin@fcilite.com / admin123
   POS: pos@fcilite.com / pos123
```

### Step 6: Configure Frontend

```powershell
cd ../frontend
copy .env.example .env.local
```

### Step 7: Run the Application

```powershell
# From root folder
cd ..
npm run dev
```

Wait for both servers to start, then open:
- **Frontend**: http://localhost:3000

### Step 8: Login

Use these credentials:
- **Email**: admin@fcilite.com
- **Password**: admin123

---

## 🎯 What You Can Do

### 1. Manage Clients
- Add new customers with phone, email, address
- Search and filter customers
- Edit customer information
- Delete customers (Admin only)

### 2. Manage Products
- Add products (refrigerators, TVs, phones, etc.)
- Set prices and stock quantities
- Organize by categories
- Update product details

### 3. Create Financing Files
- Select customer and product
- Set total amount and down payment
- Choose installment period
- Track file status (under review/accepted/rejected)
- Admin can approve or reject files

### 4. Dashboard
- View statistics: total clients, files, products
- See file status breakdown
- Quick access to all sections

---

## 🔧 Common Commands

```powershell
# Start both frontend and backend
npm run dev

# Start only backend (from backend folder)
cd backend
npm run dev

# Start only frontend (from frontend folder)
cd frontend
npm run dev

# Build for production
npm run build

# Reset database
cd backend
npm run db:setup
```

---

## 🆘 Having Issues?

### PostgreSQL Not Running?
```powershell
# Start PostgreSQL service
net start postgresql-x64-14
```

### Port Already in Use?
```powershell
# Find process using port 5000
netstat -ano | findstr :5000
# Kill it
taskkill /PID <process_id> /F
```

### Database Connection Error?
- Check PostgreSQL is running
- Verify password in `.env` file
- Ensure database `fcilite_electro` exists

### Can't Login?
- Make sure you ran `npm run db:setup` in backend
- Check backend is running on port 5000
- Try default credentials: admin@fcilite.com / admin123

---

## 📱 Using the System

### As Admin
- Full access to everything
- Approve/reject financing files
- Delete any record
- Manage all sections

### As POS
- Create and view customers
- Create financing files
- View products
- Cannot delete or approve files

---

## 💡 Tips

1. **Always start backend first** - Frontend needs API
2. **Check browser console** - For error details
3. **Use search features** - Find customers/products quickly
4. **File numbers auto-generate** - Based on year and count
5. **Monthly installment auto-calculates** - Based on total and period

---

## 🎉 You're Ready!

Start managing your installment business with Fcilite Electro!

For full documentation, see: [README.md](README.md)
