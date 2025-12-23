# 📚 API Documentation - Fcilite Electro

## Base URL
```
http://localhost:5000/api
```

## Authentication

All API requests (except login) require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "admin@fcilite.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@fcilite.com",
    "full_name": "System Administrator",
    "role": "admin",
    "is_active": true
  }
}
```

### Get Profile
**GET** `/auth/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": "uuid",
  "email": "admin@fcilite.com",
  "full_name": "System Administrator",
  "role": "admin",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Change Password
**POST** `/auth/change-password`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "admin123",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

---

## 👥 Customer Endpoints

### Get All Customers
**GET** `/customers`

**Response:**
```json
[
  {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "0555123456",
    "address": "123 Main Street",
    "national_id": "123456789",
    "date_of_birth": "1990-01-01",
    "notes": "VIP Customer",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Customer by ID
**GET** `/customers/:id`

### Create Customer
**POST** `/customers`

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "0555123456",
  "address": "123 Main Street",
  "national_id": "123456789",
  "date_of_birth": "1990-01-01",
  "notes": "VIP Customer"
}
```

### Update Customer
**PUT** `/customers/:id`

**Request Body:** (All fields optional)
```json
{
  "full_name": "John Doe Updated",
  "phone": "0555999999"
}
```

### Delete Customer
**DELETE** `/customers/:id` (Admin only)

### Search Customers
**GET** `/customers/search?query=john`

---

## 📦 Product Endpoints

### Get All Products
**GET** `/products`

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Samsung Galaxy S23",
    "category": "Phone",
    "description": "Latest Samsung flagship",
    "price": 80000.00,
    "stock_quantity": 15,
    "image_url": null,
    "sku": "SAM-S23-001",
    "is_available": true,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Product by ID
**GET** `/products/:id`

### Create Product
**POST** `/products`

**Request Body:**
```json
{
  "name": "Samsung Galaxy S23",
  "category": "Phone",
  "description": "Latest Samsung flagship",
  "price": 80000.00,
  "stock_quantity": 15,
  "sku": "SAM-S23-001",
  "is_available": true
}
```

### Update Product
**PUT** `/products/:id`

### Delete Product
**DELETE** `/products/:id` (Admin only)

### Get Products by Category
**GET** `/products/category/:category`

Example: `/products/category/Phone`

### Search Products
**GET** `/products/search?query=samsung`

---

## 📄 Financing File Endpoints

### Get All Files
**GET** `/files`

**Optional Query Params:**
- `status` - Filter by status (under_review, accepted, rejected, completed)

**Response:**
```json
[
  {
    "id": "uuid",
    "file_number": "2024000001",
    "customer_id": "uuid",
    "customer_name": "John Doe",
    "customer_phone": "0555123456",
    "product_id": "uuid",
    "product_name": "Samsung Galaxy S23",
    "total_amount": 80000.00,
    "down_payment": 20000.00,
    "remaining_amount": 60000.00,
    "installment_period": 12,
    "monthly_installment": 5000.00,
    "status": "under_review",
    "rejection_reason": null,
    "notes": "Customer requested 12 months",
    "created_by_name": "Admin User",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get File by ID
**GET** `/files/:id`

### Create File
**POST** `/files`

**Request Body:**
```json
{
  "customer_id": "uuid",
  "product_id": "uuid",
  "total_amount": 80000.00,
  "down_payment": 20000.00,
  "installment_period": 12,
  "notes": "Customer requested 12 months"
}
```

**Response:** File object with auto-generated:
- `file_number`
- `remaining_amount`
- `monthly_installment`
- `status` (defaults to "under_review")

### Update File
**PUT** `/files/:id`

### Update File Status
**PATCH** `/files/:id/status` (Admin only)

**Request Body:**
```json
{
  "status": "accepted",
  "rejection_reason": "Insufficient documentation"
}
```

**Note:** `rejection_reason` is required when status is "rejected"

### Delete File
**DELETE** `/files/:id` (Admin only)

### Get File Statistics
**GET** `/files/stats`

**Response:**
```json
{
  "under_review": 5,
  "accepted": 12,
  "rejected": 3,
  "completed": 8,
  "total": 28
}
```

---

## 🔒 Role-Based Permissions

### Admin
- All endpoints
- Can delete any record
- Can update file statuses

### POS
- All GET endpoints
- Can POST customers, products, files
- Can PUT customers, products, files
- Cannot DELETE any records
- Cannot update file statuses

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "message": "Full name and phone are required"
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "message": "Customer not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## 📝 Field Validations

### Customer
- `full_name` - Required, string
- `phone` - Required, string
- `email` - Optional, valid email format
- `address` - Optional, string
- `national_id` - Optional, string
- `date_of_birth` - Optional, date
- `notes` - Optional, text

### Product
- `name` - Required, string
- `category` - Required, string
- `price` - Required, decimal (positive)
- `stock_quantity` - Optional, integer (default: 0)
- `description` - Optional, text
- `sku` - Optional, unique string
- `is_available` - Optional, boolean (default: true)

### Financing File
- `customer_id` - Required, valid UUID
- `product_id` - Optional, valid UUID
- `total_amount` - Required, decimal (positive)
- `down_payment` - Optional, decimal (default: 0)
- `installment_period` - Required, integer (positive)
- `notes` - Optional, text

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fcilite.com","password":"admin123"}'
```

### Get Customers
```bash
curl -X GET http://localhost:5000/api/customers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Customer
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "full_name": "John Doe",
    "phone": "0555123456",
    "email": "john@example.com"
  }'
```

---

## 🔄 Status Flow for Financing Files

```
under_review → accepted → completed
            ↘ rejected
```

1. **under_review** - Initial status when file is created
2. **accepted** - Admin approves the financing request
3. **rejected** - Admin rejects with reason
4. **completed** - All installments paid (future feature)

---

**For more information, see [README.md](README.md)**
