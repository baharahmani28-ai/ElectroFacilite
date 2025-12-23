# CHAT SYSTEM - QUICK START GUIDE

## ✅ STATUS: Ready to Deploy

All code has been implemented. Follow these steps to activate the chat system:

## Step 1: Create Database Tables

Open **pgAdmin** or your PostgreSQL client and execute this file:
```
backend/database/create_chat_system.sql
```

Or copy and paste the SQL content from that file into your PostgreSQL query tool.

This will create 3 tables:
- `conversations` - Chat conversations between admin and branches
- `messages` - Individual messages
- `attachments` - File/image metadata

## Step 2: Restart Backend Server

The backend code is already updated with Socket.io integration.

Stop the current backend server (Ctrl+C) and restart:

```powershell
cd backend
npm run dev
```

You should see:
```
💬 Socket.io initialized for real-time chat
🚀 Server is running on port 5000
💬 Socket.io available at ws://localhost:5000
```

## Step 3: Restart Frontend Server

Stop the current frontend server (Ctrl+C) and restart:

```powershell
cd frontend
npm run dev
```

Or use the startup script:
```powershell
.\start-all.ps1
```

## Step 4: Access the Chat

### For Admin:
1. Login as admin (admin@fcilite.com / admin123)
2. Navigate to: http://localhost:3000/dashboard/chat
3. You'll see a list of branches
4. Click on any branch to start chatting

### For Branch Users:
1. Login as a branch user (e.g., batna@fcilite.com / branch123)
2. Navigate to: http://localhost:3000/dashboard/chat
3. You'll see the conversation with admin automatically

## Features Available

✅ **Real-time messaging** - Messages appear instantly with Socket.io
✅ **Text messages** - Send and receive text
✅ **Image messages** - Send JPG, PNG, WEBP (displayed as images)
✅ **File attachments** - Send PDF, DOCX files
✅ **Typing indicators** - See when someone is typing
✅ **Unread counts** - See unread message counts (admin view)
✅ **Admin ↔ Branch only** - No branch-to-branch communication
✅ **NO external services** - Everything internal to the platform
✅ **NO AI processing** - Images stay as images, no OCR

## File Storage

Chat files are stored in:
```
backend/uploads/chat/
```

This directory is automatically created when the first file is uploaded.

## Troubleshooting

**If chat doesn't connect:**
1. Check backend console for "Socket.io initialized" message
2. Check frontend console (F12) for Socket.io connection messages
3. Verify both servers are running (backend on 5000, frontend on 3000)

**If images don't display:**
- Images are served from `http://localhost:5000/uploads/chat/`
- Check that the uploads directory exists and has proper permissions

**If file upload fails:**
- Check file size (max 10MB)
- Check file type (only images, PDF, DOCX allowed)
- Check backend logs for error messages

## API Endpoints

All chat endpoints are under `/api/chat`:

- `GET /api/chat/conversations` - Get all conversations (admin)
- `GET /api/chat/conversations/:branchId` - Get/create conversation
- `GET /api/chat/messages/:conversationId` - Get messages
- `POST /api/chat/messages` - Send text message
- `POST /api/chat/messages/file` - Upload and send file

## Security

- JWT authentication required for all chat operations
- Socket.io connections are authenticated
- Branch users can only access their own conversation with admin
- Admin can access all branch conversations
- File upload validation (type and size limits)

## Database Schema

**conversations:**
- Links admin with branch
- Tracks last message timestamp
- One conversation per admin-branch pair

**messages:**
- Stores all messages (text, image, file)
- Links to sender (user) and conversation
- Tracks read status

**attachments:**
- Stores file metadata (name, type, size, URL)
- Links to message
- Used for images and files

---

## ⚠️ IMPORTANT NOTES

1. **Images are NOT processed** - They are stored as files and displayed as images
2. **No OCR** - Image content is never converted to text
3. **No AI** - Chat content is never sent to any AI model
4. **Internal only** - This is NOT connected to WhatsApp, Telegram, or any external service
5. **File URLs only** - Only file paths and metadata are stored in database, not file content

---

## Need to Add Chat Link to Menu?

If you want to add a Chat menu item to the dashboard sidebar, edit:
```
frontend/src/app/dashboard/layout.tsx
```

Add this menu item:
```tsx
{
  href: '/dashboard/chat',
  label: 'Chat',
  icon: MessageCircle, // Import from lucide-react
  adminOnly: false // Both admin and branches can access
}
```

---

**System is ready to use once database tables are created and servers are restarted!**
