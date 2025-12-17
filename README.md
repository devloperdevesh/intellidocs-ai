IntelliDocs AI — Document Intelligence Platform (RAG)

🚀 IntelliDocs AI is a production-grade Retrieval-Augmented Generation (RAG) platform that enables users to upload documents and ask natural-language questions over their content using vector search and Large Language Models.

This project is designed and implemented by Devesh Chauhan, focusing on scalable AI backend engineering and real-world GenAI system design.


---

🔗 Live Demo

Frontend: https://intellidocs-ai.vercel.app

Backend API: https://intellidocs-ai-vzy0.onrender.com



---

🧠 What Problem It Solves

Traditional LLMs hallucinate or lack access to private documents. IntelliDocs AI solves this by:

Indexing user documents into a vector database

Retrieving only the most relevant chunks

Generating grounded answers using RAG architecture



---

✨ Key Features

📄 Upload PDF / TXT documents

✂️ Intelligent chunking with overlap

🔢 Embedding generation (HuggingFace / Transformers)

🧭 Semantic search with ChromaDB (Vector DB)

🤖 Retrieval-Augmented Generation (RAG)

⚡ Async REST APIs (Node.js)

🎨 Clean React + Vite UI

🐳 Dockerized & cloud-deployable



---

🏗️ Architecture Overview (RAG)

User Query
   ↓
Query Embedding
   ↓
Vector Search (ChromaDB)
   ↓
Top-K Relevant Chunks
   ↓
Prompt Augmentation
   ↓
LLM Answer (Grounded)

Why RAG?

Reduces hallucinations

Works with private documents

Scales efficiently for large datasets



---

🧩 Tech Stack

Backend

Node.js (Express)

LangChain (RAG orchestration)

HuggingFace / Transformers

ChromaDB (Vector Database)

Multer (file uploads)


Frontend

React (Vite)

Modern chat-style UI

Environment-based API routing


DevOps

Docker & Docker Compose

Render (Backend)

Vercel (Frontend)

Git & GitHub



---

📂 Project Structure

intellidocs-ai/
 ├── backend/
 │   ├── src/
 │   │   ├── controllers/
 │   │   ├── services/
 │   │   ├── routes/
 │   │   ├── utils/
 │   │   └── server.js
 │   └── Dockerfile
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── services/
 │   │   ├── App.jsx
 │   │   └── main.jsx
 │   └── Dockerfile
 ├── docker-compose.yml
 └── README.md


---

⚙️ Environment Variables

Backend (backend/.env)

PORT=3000
CHROMA_DB_DIR=./data/chroma
HF_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
MAX_CHUNK_SIZE=800
CHUNK_OVERLAP=200

Frontend (frontend/.env)

VITE_API_BASE=https://intellidocs-ai-vzy0.onrender.com


---

▶️ Run Locally

Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev


---

🐳 Docker (Optional)

docker-compose up --build


---

📡 API Endpoints

Upload Document

POST /api/upload

form-data: file


Ask Question

POST /api/ask

{
  "question": "What skills does Devesh have?"
}


---

🚀 Deployment

Backend (Render)

Root Directory: backend

Build Command: npm install

Start Command: node src/server.js


Frontend (Vercel)

Root Directory: frontend

Framework: Vite

Env Variable: VITE_API_BASE



---

📈 Resume Alignment (Why This Project Matters)

This project demonstrates:

Real-world RAG system design

LLM orchestration & prompt grounding

Vector search optimization

Clean API design

Cloud deployment & DevOps discipline


Perfectly aligned with AI Backend Engineer / GenAI Engineer roles.


---

👨‍💻 Author

Devesh Chauhan
📍 Greater Noida, India
📧 deveshchauhandk_cse23@its.edu.in
🔗 LinkedIn
🐙 GitHub
🌐 Portfolio


---

⭐ If you like this project, consider starring the repository!
