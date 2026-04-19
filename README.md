# Automated Quiz Engine

Full-stack quiz application with authentication, quiz attempts, and PDF certificate generation.

## Tech Stack
- Frontend: React.js (Vite)
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Authentication: JWT
- PDF Generation: pdfkit

## Folder Structure
- `server/` - backend API server
- `client/` - React frontend

## Setup

### Backend
1. Open terminal in `server/`
2. Copy `.env.example` to `.env`
3. Set `MONGO_URI` and `JWT_SECRET`
4. Install and start:
   ```powershell
   npm install
   npm run dev
   ```

### Frontend
1. Open terminal in `client/`
2. Install and start:
   ```powershell
   npm install
   npm run dev
   ```

### Notes
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- The server seeds a sample quiz question bank automatically on startup if there are no questions.
