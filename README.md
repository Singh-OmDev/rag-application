# RAG PDF Question Answering System

live demo https://rag-application-xi.vercel.app/


<img width="1896" height="870" alt="image" src="https://github.com/user-attachments/assets/d71803e6-00d7-4c20-b23e-8d7dbc1bd5a7" />


This is a MERN stack application that allows users to upload PDFs, processes them using Gemini Embeddings, and answers questions using Gemini Flash.

## Features
- Upload PDF and extract text.
- Chunk text and generate embeddings using `text-embedding-004`.
- Store chunks in MongoDB.
- Answer questions using `gemini-1.5-flash` with RAG (Retrieval-Augmented Generation).
- Clean and modern UI with React and Tailwind CSS.

## Prerequisites
- Node.js installed.
- MongoDB Atlas connection string.
- Google Gemini API Key.

## Setup

### Backend
1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_KEY=your_gemini_api_key
   PORT=5000
   ```
4. Start server:
   ```bash
   node server.js
   ```

### Frontend
1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

## Usage
1. Open frontend (usually `http://localhost:5173`).
2. Upload a PDF file.
3. Wait for processing to complete.
4. Ask questions about the PDF content.
