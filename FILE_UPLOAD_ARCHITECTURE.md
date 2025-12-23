# File Upload Architecture - CRITICAL FIX DOCUMENTATION

## 🚨 THE BUG THAT WAS FIXED

### What Was Wrong?
**Location**: `frontend/src/app/dashboard/dossiers/create/page.tsx:431`

```typescript
// ❌ WRONG - This was the bug!
uploaded_files: JSON.stringify(uploadedFiles)
```

**The Problem**: The frontend was converting file metadata into a JSON string and sending it to the backend. This caused:
1. Files were **already uploaded to disk** via multipart/form-data
2. Then their metadata was **stringified** and sent again
3. Backend tried to process the stringified data instead of referencing actual files
4. Admin received text strings instead of actual file references

---

## ✅ THE CORRECT ARCHITECTURE

### File Upload Flow (3-Step Process)

```
┌──────────────┐     1. Multipart Upload     ┌──────────────┐
│   Frontend   │ ──────────────────────────> │   Backend    │
│              │    (FormData with files)    │   (Multer)   │
└──────────────┘                              └──────┬───────┘
                                                     │
                                              2. Save to Disk
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │   Disk/      │
                                              │   uploads/   │
                                              └──────────────┘
                                                     │
                                              3. Store Path
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │  PostgreSQL  │
                                              │  (metadata)  │
                                              └──────────────┘
```

### Step 1: Frontend Upload (FormData)

**Location**: `frontend/src/app/dashboard/dossiers/create/page.tsx`

```typescript
// ✅ CORRECT: Use FormData for multipart uploads
const allFormData = new FormData();

// Add files from Step 2 (Personal documents)
if (step2Data?.formData) {
  for (let pair of step2Data.formData.entries()) {
    allFormData.append(pair[0], pair[1]); // Actual File objects
  }
}

// Upload to server
const uploadResponse = await fetch('http://localhost:5000/api/files/upload-documents', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: allFormData // Send as multipart/form-data
});

const uploadedFiles = await uploadResponse.json();
// Returns: { files: [{ fieldname, originalname, filename, path, size, mimetype }] }
```

### Step 2: Backend Processing (Multer + Disk Storage)

**Location**: `backend/src/middleware/upload.ts`

```typescript
// ✅ CORRECT: Multer saves files to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save to uploads/documents/
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    cb(null, `${nameWithoutExt}-${uniqueSuffix}${ext}`);
    // Result: carte_identite-1703267890123-456789.jpg
  },
});

export const uploadDocument = multer({
  storage,
  fileFilter, // Only jpg, png, pdf
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 10, // Max 10 files
  },
});
```

### Step 3: Database Storage (ONLY Metadata)

**Location**: `backend/src/controllers/fileController.ts`

```typescript
// ✅ CORRECT: Store only file path and metadata
const docResult = await pool.query(
  `INSERT INTO documents 
   (file_id, document_type, file_name, file_path, file_size, mime_type, uploaded_by)
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id`,
  [
    newFileId,
    docType,
    fileInfo.originalname,     // "carte_identite.jpg"
    filePath,                  // "/uploads/documents/carte_identite-1234567890.jpg"
    fileInfo.size,             // 1048576 (bytes)
    fileInfo.mimetype,         // "image/jpeg"
    userId
  ]
);
```

**Database Schema**: `backend/database/create_documents_table.sql`

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  file_name VARCHAR(255),      -- Original name
  file_path VARCHAR(500),      -- Path on disk (NOT file content!)
  file_size INTEGER,           -- Size in bytes
  mime_type VARCHAR(100),      -- "image/jpeg", "application/pdf"
  -- ...other metadata
);
```

---

## 🛡️ WHY FILES MUST NEVER BE STORED AS TEXT

### 1. Database Bloat
```
5MB image → 7MB+ base64 → Slow queries + Expensive storage
```

### 2. Memory Issues
```
Loading 50 files (250MB) as strings → Heap overflow → Server crash
```

### 3. Performance
- Disk I/O: Optimized for binary files (streaming, caching)
- Database: Optimized for structured data (indexing, joining)
- Mixing them = Worst of both worlds

### 4. Data Corruption
```
Image → Base64 → JSON.stringify → Database → JSON.parse → Base64 decode
     ↑ Each step risks corruption ↑
```

### 5. Scalability
- Database backups become massive (GBs → TBs)
- Cloud costs skyrocket (PostgreSQL $0.10/GB vs S3 $0.023/GB)

### 6. Security
- Files served via authenticated endpoints with rate limiting
- Binary files can't be SQL injected or XSS attacked

---

## 📋 FILE TYPE VALIDATION

### Frontend Validation
**Location**: `frontend/src/app/dashboard/dossiers/create/Step2_DocumentsPersonnels.tsx`

```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

const validateFile = (file: File): string | null => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Type de fichier non accepté. Utilisez PDF, JPG ou PNG.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'La taille du fichier dépasse 5MB.';
  }
  return null;
};
```

### Backend Validation
**Location**: `backend/src/middleware/upload.ts`

```typescript
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Type non autorisé: ${file.mimetype}`));
  }
};
```

---

## 🖼️ FILE RENDERING (Admin Dashboard)

### Images
**Location**: `frontend/src/app/dashboard/files/DocumentCard.tsx`

```typescript
// ✅ CORRECT: Fetch via secure endpoint, render as <img>
const loadSecureImage = async () => {
  const filename = doc.file_path.split(/[/\\]/).pop();
  const response = await fetch(`http://localhost:5000/api/secure/documents/${filename}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  setImageUrl(url);
};

<img src={imageUrl} alt={doc.file_name} className="..." />
```

### PDFs
```typescript
// ✅ CORRECT: Render in <iframe> or download link
{doc.mime_type === 'application/pdf' && (
  <iframe
    src={imageUrl}
    className="w-full h-full"
    title={doc.file_name}
  />
)}
```

### Download Button
```typescript
const handleDownload = async () => {
  const response = await fetch(`/api/secure/documents/${filename}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = doc.file_name;
  a.click();
};
```

---

## 🔒 SECURITY CONSIDERATIONS

### 1. Authenticated File Serving
```typescript
// backend/src/routes/documentServeRoutes.ts
router.get('/documents/:filename', authenticate, serveDocument);
```

### 2. Path Traversal Prevention
```typescript
const filename = path.basename(req.params.filename); // Remove ../ attacks
const filePath = path.join(uploadsDir, filename);
if (!filePath.startsWith(uploadsDir)) {
  return res.status(403).json({ error: 'Access denied' });
}
```

### 3. MIME Type Validation
```typescript
// Check actual file content, not just extension
const fileType = await FileType.fromFile(filePath);
if (!allowedTypes.includes(fileType?.mime)) {
  return res.status(400).json({ error: 'Invalid file type' });
}
```

---

## 📝 KEY TAKEAWAYS

### ✅ DO:
- Store files on disk or cloud storage (S3, Azure Blob)
- Store only file paths and metadata in database
- Use multipart/form-data for uploads
- Validate file types on both frontend and backend
- Serve files via secure, authenticated endpoints
- Use streaming for large files

### ❌ DON'T:
- Store files as TEXT, BLOB, or BASE64 in database
- Use JSON.stringify() on file data
- Trust client-side validation alone
- Serve files directly from database
- Store file content in API responses
- Mix file storage with database storage

---

## 🎯 TESTING CHECKLIST

- [ ] Upload image (JPG, PNG) - renders as `<img>`
- [ ] Upload PDF - opens in iframe or downloads
- [ ] Try invalid file type (.exe, .zip) - rejected
- [ ] Try oversized file (>10MB) - rejected
- [ ] Verify file exists on disk (`/uploads/documents/`)
- [ ] Verify database has path, not content
- [ ] Admin can view/download files
- [ ] Files require authentication to access
- [ ] Multiple files upload correctly
- [ ] File cleanup on financing file deletion

---

## 🐛 PREVENTING FUTURE BUGS

### Code Review Checklist:
1. Search codebase for `JSON.stringify` near file uploads
2. Check for `base64` or `btoa` with file data
3. Verify no `TEXT` or `BYTEA` columns for file content
4. Ensure multer or similar is used for file uploads
5. Confirm files are served via streaming, not loaded into memory

### Monitoring:
- Track uploads directory size growth
- Alert on database size anomalies
- Monitor API response times for file endpoints
- Log file upload errors with context

---

## 📚 REFERENCES

- [Multer Documentation](https://github.com/expressjs/multer)
- [File Upload Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [PostgreSQL vs File Storage](https://wiki.postgresql.org/wiki/BinaryFilesInDB)
- [AWS S3 for Production](https://aws.amazon.com/s3/)

---

**Last Updated**: December 22, 2025  
**Author**: Senior Full-Stack Engineer  
**Status**: ✅ BUG FIXED - Production Ready
