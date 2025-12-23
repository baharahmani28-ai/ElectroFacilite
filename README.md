# Fcilite Electro - For Installments

<div align="center">
  <h3>Complete Electronic Installment Platform</h3>
  <p>Manage customers, financing requests, and products with ease</p>
</div>

---

## 🎯 Overview

**Fcilite Electro** is a comprehensive electronic installment management system similar to i-Yusr. It allows businesses to manage customer financing requests, track installment payments, and maintain product inventories.

### ✨ Key Features

- 🔐 **Authentication System** - Secure login with JWT tokens
- 👥 **Customer Management** - Add, edit, and manage customer profiles
- 📄 **Financing Files** - Create and track installment requests with multiple statuses
- 📦 **Product Catalog** - Manage products (TVs, phones, refrigerators, etc.)
- 🎨 **Modern UI** - Clean interface with Tailwind CSS
- 🔒 **Role-Based Access** - Admin and POS user permissions
- 📊 **Dashboard Analytics** - Overview of files, customers, and products

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
cd "c:\Users\Quick Tech\Desktop\ElectroFacilite"
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Database Setup

#### Create PostgreSQL Database

Open PostgreSQL (psql or pgAdmin) and run:

```sql
CREATE DATABASE fcilite_electro;
```

#### Configure Backend Environment

Create a `.env` file in the `backend` folder:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your PostgreSQL credentials:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fcilite_electro
DB_USER=postgres
DB_PASSWORD=your_actual_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### Run Database Schema

```bash
# From the backend folder
npm run build
npm run db:setup
```

This will create all tables and insert default users:
- **Admin**: `admin@fcilite.com` / `admin123`
- **POS**: `pos@fcilite.com` / `pos123`

### 4. Configure Frontend Environment

Create a `.env.local` file in the `frontend` folder:

```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🎮 Running the Application

> ⚠️ **IMPORTANT**: If you experience "project disappeared" issues, see **[STARTUP_GUIDE.md](STARTUP_GUIDE.md)** for troubleshooting and prevention tips.

### Option 1: Use PowerShell Startup Scripts (Easiest - Windows)

Simply double-click `start-all.ps1` in the project root, or run:

```powershell
.\start-all.ps1
```

This will:
- ✅ Check if servers are already running
- ✅ Start backend server in a new window
- ✅ Start frontend server in another window
- ✅ Display access URLs

**Individual scripts:**
- `start-backend.ps1` - Start only backend
- `start-frontend.ps1` - Start only frontend

### Option 2: Run Everything Together (Manual)

From the root directory:

```bash
npm run dev
```

This will start both backend (port 5000) and frontend (port 3000) simultaneously.

### Option 2: Run Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/health

### Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@fcilite.com | admin123 |
| POS | pos@fcilite.com | pos123 |

⚠️ **IMPORTANT**: Change these passwords in production!

---

## 📁 Project Structure

```
ElectroFacilite/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & validation
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   └── index.ts        # Entry point
│   ├── database/
│   │   └── schema.sql      # Database schema
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js pages
│   │   │   ├── dashboard/  # Dashboard pages
│   │   │   ├── login/      # Login page
│   │   │   └── layout.tsx  # Root layout
│   │   └── lib/            # Utilities & API
│   ├── package.json
│   └── tailwind.config.js
└── package.json            # Root package.json
```

---

## 🔑 User Roles & Permissions

### Admin
- Full access to all features
- Manage customers, products, and files
- Update file statuses (accept/reject)
- Delete records

### POS (Point of Sale)
- Create and view customers
- Create and view financing files
- Manage products
- Cannot delete records or update file statuses

---

## 📊 Database Schema

### Tables

1. **users** - System users with roles
2. **customers** - Customer information
3. **products** - Product catalog
4. **financing_files** - Installment requests
5. **payments** - Payment tracking (future feature)

### Key Relationships

- `financing_files` → `customers` (many-to-one)
- `financing_files` → `products` (many-to-one, optional)
- All tables → `users` (created_by)

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #007bff | Buttons, links, accents |
| Light Green | #8fd19e | Success states, secondary actions |
| White | #ffffff | Background, cards |
| Gray | #f5f7fa | Page background |

### Typography

- Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/change-password` - Change password

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer (Admin only)
- `GET /api/customers/search?query=` - Search customers

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (Admin only)
- `GET /api/products/search?query=` - Search products
- `GET /api/products/category/:category` - Get by category

### Financing Files
- `GET /api/files` - Get all files
- `GET /api/files?status=accepted` - Filter by status
- `GET /api/files/:id` - Get file by ID
- `POST /api/files` - Create financing file
- `PUT /api/files/:id` - Update file
- `PATCH /api/files/:id/status` - Update file status (Admin only)
- `DELETE /api/files/:id` - Delete file (Admin only)
- `GET /api/files/stats` - Get file statistics

---

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
# Windows
net start postgresql-x64-14

# Verify connection
psql -U postgres -d fcilite_electro
```

### Port Already in Use

```bash
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 🚢 Production Deployment

### Backend Deployment

1. Set environment variables
2. Build the application: `npm run build`
3. Start with: `npm start`

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar platform

### Environment Variables

⚠️ **Never commit `.env` files!**

Update these for production:
- Change `JWT_SECRET` to a strong random string
- Update database credentials
- Change default user passwords
- Set `NODE_ENV=production`

---

## 📝 License

This project is created for internal business use.

---

## 👨‍💻 Support

For issues or questions, contact the development team.

---

## 🎉 Features Roadmap

- [ ] Payment tracking and history
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Advanced analytics dashboard
- [ ] Mobile responsive improvements
- [ ] Multi-language support (Arabic/French)
- [ ] Export data to Excel
- [ ] Customer payment reminders

---

**Made with ❤️ for Fcilite Electro**
