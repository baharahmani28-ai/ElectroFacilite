# 📋 Fcilite Electro - Product Management Guide

## 🎯 Overview
Your system has **TWO WAYS** to add products:

### 1️⃣ Manual Entry (One by One)
- For adding individual products
- Good for occasional updates
- Each branch can add products through the Products page

### 2️⃣ Excel Bulk Import (Hundreds at Once)
- For adding many products quickly
- Upload Excel file with all products
- Only Admins can access this feature

---

## 🏢 Branch Access System

### Your 6 Branches:
1. **Batna** (BR-001) - Centre Ville, Batna
2. **Constantine** (BR-002) - Centre Ville, Constantine
3. **Sétif** (BR-003) - Centre Ville, Sétif
4. **Bou Saada** (BR-004) - Centre Ville, Bou Saada
5. **Breika** (BR-005) - Breika
6. **M'Sila** (BR-006) - Centre Ville, M'Sila

### User Accounts:
- **Admin Account**: admin@fcilite.com / admin123
  - Can see ALL products from ALL branches
  - Can use Bulk Import
  - Can manage everything

- **Branch Managers** (To be created):
  - batna@fcilite.com
  - constantine@fcilite.com
  - setif@fcilite.com
  - bousaada@fcilite.com
  - breika@fcilite.com
  - msila@fcilite.com
  
  Each branch manager will:
  - Add products for their branch only
  - See products for their branch only (when filtering is implemented)
  - Manage customers and financing files for their branch

---

## 🖼️ How Product Images Work

### Option 1: Use Image URLs (Current System)
Products have an `image_url` field where you paste direct links to images:

**Example Image URLs:**
```
https://www.condor.dz/images/products/refrigerator-450l.jpg
https://www.lg.com/dz_fr/images/televisions/lg-55-oled.png
https://example.com/images/samsung-galaxy-a54.jpg
```

**Steps:**
1. Find product image online (manufacturer website, store website)
2. Right-click on image → "Copy Image Address"
3. Paste the URL in the "Image URL" field
4. Image will display automatically in product cards

### Option 2: Upload Images (Future Enhancement)
Currently NOT implemented, but can be added:
- Upload image files directly
- Store images in your server's `uploads` folder
- Automatic image optimization

---

## 📝 Manual Product Entry

### How Each Branch Adds Products:

1. **Login** to the system
2. Go to **Products** page
3. Click **"Add Product"** button
4. Fill in the form:
   - **Name**: Samsung Galaxy A54 5G 128GB
   - **Category**: Phone
   - **Price**: 45000 DZD
   - **Brand**: Samsung
   - **Color**: Black
   - **Size**: 128GB
   - **Stock**: 15
   - **SKU**: SAM-A54-BLK-128
   - **Branch**: Select your branch
   - **Image URL**: Paste image link
   - **Description**: Optional details
5. Click **"Create"**

### Product Will Display:
- Product image (if URL provided)
- Name and category
- Brand, color, size
- Branch location (📍 Branche Batna)
- Price in DZD
- Stock quantity

---

## 📊 Excel Bulk Import (Recommended for Hundreds of Products)

### Step-by-Step Process:

#### Step 1: Download Template
1. Login as **Admin**
2. Go to **"Bulk Import"** page (new menu item)
3. Click **"Download Template"**
4. Excel file will download: `products_template.xlsx`

#### Step 2: Fill Excel File
The template has these columns:

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| name | Product name | Samsung Galaxy A54 5G 128GB | ✅ Yes |
| category | Product type | Phone | ✅ Yes |
| price | Price in DZD | 45000 | ✅ Yes |
| brand | Manufacturer | Samsung | ⚠️ Optional |
| color | Product color | Black | ⚠️ Optional |
| size | Size/capacity | 128GB | ⚠️ Optional |
| stock_quantity | Available units | 15 | ⚠️ Optional |
| sku | Product code | SAM-A54-BLK-128 | ⚠️ Optional |
| branch_code | Branch code | BR-001 | ✅ Yes |
| image_url | Image link | https://... | ⚠️ Optional |
| description | Extra details | Latest 5G phone with... | ⚠️ Optional |

**Branch Codes:**
- BR-001 = Batna
- BR-002 = Constantine
- BR-003 = Sétif
- BR-004 = Bou Saada
- BR-005 = Breika
- BR-006 = M'Sila

#### Step 3: Sample Products in Template

The template includes 3 sample products:

**Example 1: Refrigerator**
```
Name: Refrigerator Condor 450L No Frost
Category: Refrigerator
Price: 120000
Brand: Condor
Color: Silver
Size: 450L
Stock: 10
SKU: COND-REF-450
Branch: BR-001
Image: https://example.com/condor-ref.jpg
Description: Energy efficient refrigerator with No Frost technology
```

**Example 2: TV**
```
Name: LG Smart TV OLED 55 inch 4K
Category: Television
Price: 250000
Brand: LG
Color: Black
Size: 55 inch
Stock: 5
SKU: LG-TV-55-OLED
Branch: BR-002
Image: https://example.com/lg-tv.jpg
Description: OLED display with smart features
```

**Example 3: Phone**
```
Name: Samsung Galaxy A54 5G 128GB
Category: Phone
Price: 45000
Brand: Samsung
Color: Black
Size: 128GB
Stock: 15
SKU: SAM-A54-BLK-128
Branch: BR-001
Image: https://example.com/samsung-a54.jpg
Description: 5G enabled smartphone with excellent camera
```

#### Step 4: Upload File
1. Fill Excel with your products (can have hundreds of rows)
2. Save the file
3. Go to **Bulk Import** page
4. Click **"Select Excel File"**
5. Choose your file
6. Click **"Upload & Import"**

#### Step 5: Review Results
The system will show:
- ✅ **X products imported successfully**
- ❌ **Y products failed** (if any errors)
- Detailed error list (which rows have problems)

**Common Errors:**
- Missing required fields (name, category, price)
- Invalid branch code
- Invalid price format
- Duplicate SKU

---

## 📦 Real Product Categories for Your Business

### Recommended Categories:

1. **Réfrigérateurs** (Refrigerators)
   - Brands: Condor, Samsung, LG, Brandt
   - Sizes: 200L, 300L, 450L, 550L
   - Features: No Frost, Inverter

2. **Machines à Laver** (Washing Machines)
   - Brands: Condor, Samsung, LG, Brandt
   - Sizes: 6kg, 7kg, 8kg, 10kg
   - Types: Front load, Top load

3. **Téléviseurs** (Televisions)
   - Brands: Condor, Samsung, LG, Sony
   - Sizes: 32", 43", 55", 65", 75"
   - Types: LED, OLED, QLED, Smart TV

4. **Climatiseurs** (Air Conditioners)
   - Brands: Condor, Samsung, LG, Midea
   - Sizes: 9000 BTU, 12000 BTU, 18000 BTU
   - Types: Split, Inverter

5. **Cuisinières** (Cookers)
   - Brands: Condor, Brandt, Beko
   - Types: Gas, Electric, Mixed
   - Sizes: 4 feux, 5 feux

6. **Téléphones** (Phones)
   - Brands: Samsung, Oppo, Xiaomi, Condor
   - Storage: 64GB, 128GB, 256GB
   - Types: 4G, 5G

7. **Ordinateurs** (Computers)
   - Brands: HP, Dell, Lenovo, Asus
   - Types: Laptops, Desktops
   - Specs: i3, i5, i7

8. **Meubles** (Furniture)
   - Categories: Salon, Chambre, Cuisine
   - Materials: Wood, Metal, Mixed

---

## 🖼️ Where to Get Product Images

### Option 1: Manufacturer Websites
- **Condor Algeria**: https://www.condor.dz
- **Samsung Algeria**: https://www.samsung.com/dz_fr/
- **LG Algeria**: https://www.lg.com/dz_fr
- Find products, right-click on images, copy link

### Option 2: E-commerce Sites
- **Ouedkniss**: https://www.ouedkniss.com
- **Jumia**: https://www.jumia.dz
- Search for products, copy image URLs

### Option 3: Google Images
1. Search for product: "Samsung Galaxy A54"
2. Click on image
3. Right-click → "Copy Image Address"
4. Make sure it's a direct image link (ends in .jpg or .png)

### Tips for Good Images:
- Use official product photos (clear background)
- Prefer manufacturer images (better quality)
- Make sure URL is direct (https://...image.jpg)
- Test URL by pasting in browser - should show just the image

---

## 🔄 How Branches Will Use the System

### Scenario 1: New Branch Opening
1. Admin creates branch manager account
2. Branch manager logs in
3. Uses **Bulk Import** to add 50-100 products at once
4. Adds special products manually as needed

### Scenario 2: Daily Operations
1. Branch manager logs in
2. Adds new arrivals (1-5 products per day manually)
3. Updates stock when selling products
4. Creates financing files for customers

### Scenario 3: Inventory Restock
1. Received 200 new products
2. Prepare Excel file with all products
3. Use Bulk Import
4. Verify import success

---

## ✅ Next Steps for Your System

### Completed ✅
- Database with branches table (6 locations)
- Products table with brand/color/size/image
- Excel import backend (ready to use)
- Products page with image display
- Bulk Import page with template download

### To Do 📋
1. **Create branch manager accounts** (6 users)
2. **Test bulk import** with sample products
3. **Add branch filtering** (each branch sees only their products)
4. **Print guide** for each branch manager
5. **Training session** for staff

---

## 📞 Support

For technical issues:
- Contact system administrator
- Check error messages in Bulk Import results
- Verify Excel file format matches template

For product questions:
- Verify branch codes are correct
- Ensure image URLs are accessible
- Check price format (numbers only, no currency symbols)

---

## 🎓 Quick Reference

**Login URLs:**
- System: http://localhost:3000/login
- Products: http://localhost:3000/dashboard/products
- Bulk Import: http://localhost:3000/dashboard/import

**Branch Codes:**
BR-001 (Batna) | BR-002 (Constantine) | BR-003 (Sétif)
BR-004 (Bou Saada) | BR-005 (Breika) | BR-006 (M'Sila)

**Admin Account:**
Email: admin@fcilite.com
Password: admin123
