# CHAT SYSTEM INSTALLATION INSTRUCTIONS

## 1. Database Setup

Run the SQL schema to create chat tables:

```bash
# Connect to PostgreSQL
psql -U openpg -d fcilite_electro -f backend/database/create_chat_system.sql
```

Or manually execute the SQL file in pgAdmin.

## 2. Install Backend Dependencies

```bash
cd backend
npm install socket.io @types/socket.io
```

## 3. Install Frontend Dependencies

```bash
cd frontend
npm install socket.io-client
```

## 4. Restart Servers

After installing dependencies, restart both servers:

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

Or use the PowerShell startup scripts:
```powershell
.\start-all.ps1
```

## 5. Access the Chat

- **Admin**: Navigate to http://localhost:3000/dashboard/chat
- **Branch Users**: Navigate to http://localhost:3000/dashboard/chat

## Features

✅ Real-time messaging with Socket.io
✅ Text messages
✅ Image messages (jpg, png, webp)
✅ File attachments (pdf, docx)
✅ Admin ↔ Branch communication only
✅ NO external services
✅ Images displayed as images (no OCR)
✅ Typing indicators
✅ Unread message counts
✅ File metadata storage

## File Structure

**Backend:**
- `backend/database/create_chat_system.sql` - Database schema
- `backend/src/controllers/chatController.ts` - Chat business logic
- `backend/src/routes/chatRoutes.ts` - Chat API routes
- `backend/src/sockets/chatSocket.ts` - Socket.io real-time logic
- `backend/src/index.ts` - Updated with Socket.io integration
- `backend/uploads/chat/` - Chat file storage

**Frontend:**
- `frontend/src/app/dashboard/chat/page.tsx` - Chat UI
- `frontend/src/lib/api.ts` - Updated with chatAPI

## API Endpoints

- `GET /api/chat/conversations` - Get all conversations (admin)
- `GET /api/chat/conversations/:branchId` - Get/create conversation
- `GET /api/chat/messages/:conversationId` - Get messages
- `POST /api/chat/messages` - Send text message
- `POST /api/chat/messages/file` - Send file/image

## Socket.io Events

- `join_conversation` - Join a conversation room
- `leave_conversation` - Leave a conversation room
- `send_message` - Send a message
- `receive_message` - Receive a message
- `typing` - User is typing
- `stop_typing` - User stopped typing
- `conversation_updated` - Conversation list needs refresh

## Security

- JWT authentication for Socket.io connections
- Role-based access control (admin/branch)
- File type validation
- File size limits (10MB)
- Branch users can only chat with admin
- Admin can chat with any branch

## Important Notes

⚠️ Images are stored as files and displayed as images - NO OCR processing
⚠️ Files are stored in `backend/uploads/chat/` directory
⚠️ Only file URLs and metadata are stored in database
⚠️ No AI processing of any chat content
⚠️ Internal platform chat only - no external services
