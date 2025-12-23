# 🏢 Branch Account Features & Restrictions

## ✅ What Branch Accounts Can Do:

### 1. **Dashboard (Mon Tableau de Bord)**
- View their own statistics:
  - Total clients in their branch
  - Clients pending approval (En Attente)
  - Approved clients (Approuvés)
  - Total files/dossiers
  - File status breakdown (En Révision, Acceptés, Rejetés, Complétés)

### 2. **Mes Clients (My Customers)**
- View ONLY customers from their own branch
- Add new customers
- Edit customer information
- Submit customer financing requests
- View customer status (pending/approved/rejected)

### 3. **Mes Dossiers (My Files)**
- View ONLY files from their own branch
- Create new financing files/dossiers
- Select products for customers
- Track file status
- View file history

### 4. **Notifications**
- Receive notifications when:
  - Customer request is approved by admin
  - Customer request is rejected by admin
  - Important updates from admin
- View all their notifications
- Mark notifications as read

---

## ❌ What Branch Accounts CANNOT Do:

### Restricted Features (Admin Only):
1. **Produits (Products)** - Cannot add/edit/delete products
2. **Branches** - Cannot manage branches
3. **Import Excel** - Cannot bulk import data
4. **Demandes en Attente** - Cannot approve/reject customer requests
5. **See other branches' data** - Can only see their own branch data

---

## 🔐 Branch Account Login Credentials:

| Branch | Email | Password | Branch Code |
|--------|-------|----------|-------------|
| Batna | batna@fcilite.com | batna123 | BR-001 |
| Constantine | constantine@fcilite.com | constantine123 | BR-002 |
| Sétif | setif@fcilite.com | setif123 | BR-003 |
| Bou Saada | bousaada@fcilite.com | bousaada123 | BR-004 |
| Barika | barika@fcilite.com | barika123 | BR-005 |
| M'Sila | msila@fcilite.com | msila123 | BR-006 |

---

## 📋 Branch Workflow:

### Step 1: Customer Registration
1. Branch logs in to their account
2. Goes to **"Mes Clients"**
3. Clicks **"Ajouter un Client"**
4. Fills in customer information
5. Saves customer

### Step 2: Create Financing File
1. Goes to **"Mes Dossiers"**
2. Clicks **"Créer un Dossier"**
3. Selects the customer
4. **Selects products** (from available products added by admin)
5. Fills in financing details
6. Submits for admin approval

### Step 3: Wait for Admin Approval
1. File status changes to **"pending"**
2. Admin reviews the request
3. Branch receives notification when:
   - **Approved** ✅ - Can proceed with customer
   - **Rejected** ❌ - Receives reason, can resubmit

### Step 4: Track Progress
1. Monitor file status in **"Mes Dossiers"**
2. Check notifications for updates
3. View approved customers in **"Mes Clients"**

---

## 🎯 Main Menu Items (Branch View):

```
📊 Dashboard          - My branch statistics
👥 Mes Clients        - My customers only
📁 Mes Dossiers       - My files only
🔔 Notifications      - My notifications
```

---

## 🔒 Data Isolation:

### Backend Filtering:
- All API calls automatically filter by `branch_id`
- Branch users can ONLY access their own data
- SQL queries include `WHERE branch_id = $1` for POS role
- Admin can see all branches with no filter

### Frontend Restrictions:
- Menu items filtered by role
- Admin-only pages return 403 if branch tries to access
- Navigation prevents access to restricted pages
- UI elements hidden based on user role

---

## 🚀 Next Steps:

1. **Admin adds products** with installment pricing
2. **Products appear in all branches** when creating files
3. **Branches select products** for customer files
4. **Complete file system** will be implemented with:
   - Product selection
   - Installment plan choice
   - Down payment calculation
   - Monthly payment schedule
   - File submission to admin

---

**Status**: ✅ Branch restrictions fully implemented
**Updated**: November 13, 2025
