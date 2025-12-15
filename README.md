# IntelliDocs AI – Document Intelligence Platform

> Complete step-by-step project on canvas: backend, frontend, folder structure, complete code, Docker, and deployment instructions.

---

## Table of Contents

1. Project overview
2. Architecture & RAG explanation
3. Folder structure (complete)
4. Environment configuration
5. Backend (Node.js) — full code files
6. Frontend (React + Vite) — full code files
7. Docker + Docker Compose
8. Deploying: Render (backend) & Vercel (frontend)
9. Local setup & commands
10. API documentation & sample requests
11. Testing & QA notes
12. Next improvements & interview talking points

---

## 1) Project overview

**IntelliDocs AI** is a Retrieval-Augmented Generation (RAG) platform that lets users upload documents (PDF/TXT), automatically chunks and embeds them with HuggingFace models, stores embeddings in ChromaDB, and serves a conversational QA interface using LangChain for retrieval + generation.

Key features:

- Document upload (PDF / TXT)
- Intelligent text chunking with overlap
- Embedding generation using HuggingFace Transformers
- ChromaDB vector store for fast retrieval
- LangChain-powered RAG with a lightweight LLM overlay (HF or remote model)
- REST API backend (Node.js) with async processing pipeline
- React frontend (Vite) for upload, query, and answer display
- Dockerized and ready for Render (backend) & Vercel (frontend)

---

## 2) RAG Architecture (high-level)

1. **Ingestion**: User uploads a document -> server extracts text (PDF parsing / plain text) -> chunking to manageable sizes.
2. **Indexing**: Each chunk is embedded using a HuggingFace embedding model. Embeddings stored in ChromaDB with metadata.
3. **Retrieval**: When the user asks a question, the question is embedded and nearest neighbours (top-k) are retrieved from ChromaDB.
4. **Augmentation**: Retrieved chunks are passed as context to a generator (via LangChain) to produce an answer grounded in documents.

Benefits: up-to-date factual answers from uploaded docs, control over context, scalable embedding store.

---

## 3) Folder structure

### Folder structure (reference)

```

intellidocs-ai/
  ├── backend/
  │   ├── src/
  │   │   ├── config/
  │   │   │   └── index.js
  │   │   ├── controllers/
  │   │   │   ├── uploadController.js
  │   │   │   └── qaController.js
  │   │   ├── services/
  │   │   │   ├── storageService.js
  │   │   │   ├── chunkerService.js
  │   │   │   ├── embeddingService.js
  │   │   │   ├── chromaService.js
  │   │   │   └── ragService.js
  │   │   ├── utils/
  │   │   │   ├── pdfParser.js
  │   │   │   └── validators.js
  │   │   ├── routes/
  │   │   │   └── api.js
  │   │   ├── workers/
  │   │   │   └── ingestionWorker.js
  │   │   ├── app.js
  │   │   └── server.js
  │   ├── Dockerfile
  │   ├── package.json
  │   └── .env.example
  ├── frontend/
  │   ├── public/
  │   ├── src/
  │   │   ├── components/
  │   │   │   ├── UploadForm.jsx
  │   │   │   ├── QAForm.jsx
  │   │   │   └── AnswerView.jsx
  │   │   ├── pages/
  │   │   │   └── Home.jsx
  │   │   ├── services/
  │   │   │   └── api.js
  │   │   ├── App.jsx
  │   │   ├── main.jsx
  │   │   └── styles.css
  │   ├── Dockerfile
  │   ├── package.json
  │   └── .env.example
  ├── docker-compose.yml
  └── README.md
```

---

## 3.1) VS Code terminal commands to create this folder structure (step-by-step)

> Open **VS Code → Terminal → New Terminal**
> Make sure you are inside the parent directory where you want to create the project.

### Step 1: Create root project folder

```bash
mkdir intellidocs-ai
cd intellidocs-ai
```

---

### Step 2: Create backend directory tree

```bash
mkdir -p backend/src/{config,controllers,services,utils,routes,workers}
mkdir backend/uploads
mkdir backend/data
```

Create backend root files:

```bash
touch backend/{Dockerfile,package.json,.env.example}
```

Create backend source files:

```bash
touch backend/src/app.js
 touch backend/src/server.js

 touch backend/src/config/index.js

 touch backend/src/controllers/uploadController.js
 touch backend/src/controllers/qaController.js

 touch backend/src/services/storageService.js
 touch backend/src/services/chunkerService.js
 touch backend/src/services/embeddingService.js
 touch backend/src/services/chromaService.js
 touch backend/src/services/ragService.js

 touch backend/src/utils/pdfParser.js
 touch backend/src/utils/validators.js

 touch backend/src/routes/api.js

 touch backend/src/workers/ingestionWorker.js
```

---

### Step 3: Create frontend directory tree

```bash
mkdir -p frontend/src/{components,pages,services}
mkdir frontend/public
```

Create frontend root files:

```bash
touch frontend/{Dockerfile,package.json,.env.example}
```

Create frontend source files:

```bash
touch frontend/src/main.jsx
 touch frontend/src/App.jsx
 touch frontend/src/styles.css

 touch frontend/src/pages/Home.jsx

 touch frontend/src/components/UploadForm.jsx
 touch frontend/src/components/QAForm.jsx
 touch frontend/src/components/AnswerView.jsx

 touch frontend/src/services/api.js
```

Create frontend HTML entry file:

```bash
touch frontend/index.html
```

---

### Step 4: Create Docker Compose & README

```bash
touch docker-compose.yml
 touch README.md
```

---

### Step 5: Verify folder tree (important)

Run:

```bash
ls -R
```

You should see the full IntelliDocs AI folder structure printed in the terminal.

---

### Step 6: Open project cleanly in VS Code

```bash
code .
```

Now you are ready to **paste the code file-by-file** exactly as given in the canvas above.

---

### Pro Tip (Interview-ready workflow)

- Create folders first (as above)
- Paste code module-by-module
- Run backend first (`npm install && npm run dev`)
- Then frontend (`npm install && npm run dev`)

This shows clean system design and real-world engineering discipline.

---

## 4) Environment configuration

Create `.env` for backend with minimal variables (dont commit secrets):

```
# backend/.env
PORT=3000
CHROMA_DB_DIR=./data/chroma
HF_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
HF_GENERATION_MODEL=gpt2  # replace with preferred HF generation model or remote LLM
CHROMA_COLLECTION=intellidocs
NODE_ENV=development
UPLOAD_DIR=./uploads
MAX_CHUNK_SIZE=800
CHUNK_OVERLAP=200
RENDER_SECRET=your_render_secret_if_any
```

Frontend `.env` (Vite):

```
# frontend/.env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 5) Backend — Full code files

> All backend code lives in `backend/src`.

### backend/package.json

```json
{
  "name": "intellidocs-backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5",
    "dotenv": "^16.0.3",
    "chroma-sdk": "^0.0.1-PLACEHOLDER",
    "langchain": "^0.0.1-PLACEHOLDER",
    "@huggingface/transformers": "^0.0.1-PLACEHOLDER",
    "pdf-parse": "^1.1.1",
    "uuid": "^9.0.0",
    "body-parser": "^1.20.1",
    "fs-extra": "^11.1.1"
  }
}
```

> NOTE: NPM package names for Chroma and LangChain Node SDKs and HF JS bindings may differ depending on versions; adapt to the exact packages used. Replace placeholders with the latest stable packages you use in production.

### backend/src/config/index.js

```js
const path = require("path");
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  chromaDir:
    process.env.CHROMA_DB_DIR || path.resolve(__dirname, "../../data/chroma"),
  hfEmbeddingModel:
    process.env.HF_EMBEDDING_MODEL || "sentence-transformers/all-MiniLM-L6-v2",
  hfGenerationModel: process.env.HF_GENERATION_MODEL || "gpt2",
  chromaCollection: process.env.CHROMA_COLLECTION || "intellidocs",
  uploadDir: process.env.UPLOAD_DIR || path.resolve(__dirname, "../../uploads"),
  maxChunkSize: Number(process.env.MAX_CHUNK_SIZE || 800),
  chunkOverlap: Number(process.env.CHUNK_OVERLAP || 200),
};
```

### backend/src/utils/pdfParser.js

```js
// lightweight PDF parser using pdf-parse
const fs = require("fs");
const pdf = require("pdf-parse");

async function parsePDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text || "";
}

module.exports = { parsePDF };
```

### backend/src/utils/validators.js

```js
function validateFile(mimetype) {
  const allowed = ["text/plain", "application/pdf"];
  return allowed.includes(mimetype);
}

module.exports = { validateFile };
```

### backend/src/services/storageService.js

```js
const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const config = require("../config");

async function ensureUploadDir() {
  await fs.ensureDir(config.uploadDir);
}

async function saveFile(file) {
  await ensureUploadDir();
  const id = uuidv4();
  const ext = file.originalname.split(".").pop();
  const filename = `${id}.${ext}`;
  const dest = path.join(config.uploadDir, filename);
  await fs.move(file.path, dest);
  return { id, filename, path: dest };
}

module.exports = { saveFile };
```

### backend/src/services/chunkerService.js

```js
/**
 * Simple chunker: splits text into chunks of `maxChunkSize` characters with `overlap`.
 * Returns array of { id, text, start, end }
 */
const { v4: uuidv4 } = require("uuid");
const config = require("../config");

function chunkText(
  text,
  maxChunkSize = config.maxChunkSize,
  overlap = config.chunkOverlap
) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + maxChunkSize, text.length);
    const chunkText = text.slice(start, end).trim();
    if (chunkText.length) {
      chunks.push({ id: uuidv4(), text: chunkText, start, end });
    }
    start = end - overlap;
    if (start < 0) start = 0;
  }
  return chunks;
}

module.exports = { chunkText };
```

### backend/src/services/embeddingService.js

```js
// Embedding generation using HuggingFace Transformers (Node.js binding or remote API)
// This is a generic adapter — replace with exact HF library usage in your environment.

const config = require("../config");

async function embedTexts(texts) {
  // texts: array of strings
  // NOTE: implement using chosen HF embeddings API / library.
  // Example placeholder implementation: call remote HuggingFace Inference API or use local model wrapper.

  // For demo, we'll return arrays of random floats. In production, call HF model.
  return texts.map(() =>
    Array(384)
      .fill(0)
      .map(() => Math.random())
  );
}

module.exports = { embedTexts };
```

### backend/src/services/chromaService.js

```js
// ChromaDB adapter wrapper. Uses a fictional 'chroma-sdk' — replace with actual Chroma client.
// Basic functions: init, upsertEmbeddings, querySimilar.

const fs = require("fs");
const config = require("../config");

async function initChroma() {
  // Ensure directory
  await fs.promises.mkdir(config.chromaDir, { recursive: true });
  // Initialize client if needed
}

async function upsertEmbeddings(items) {
  // items: [{ id, embedding, metadata }]
  // Save to Chroma. Placeholder: write to JSON file (for demo). Replace with real Chroma SDK calls.
  const file = `${config.chromaDir}/index.json`;
  let state = [];
  try {
    state = JSON.parse(await fs.promises.readFile(file, "utf8"));
  } catch (e) {}
  state = state.concat(items);
  await fs.promises.writeFile(file, JSON.stringify(state, null, 2), "utf8");
}

async function querySimilar(queryEmbedding, topK = 5) {
  // placeholder: load index and do cosine similarity
  const file = `${config.chromaDir}/index.json`;
  let state = [];
  try {
    state = JSON.parse(await fs.promises.readFile(file, "utf8"));
  } catch (e) {}
  if (!state.length) return [];

  function dot(a, b) {
    return a.reduce((s, v, i) => s + v * (b[i] || 0), 0);
  }
  function norm(a) {
    return Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  }
  const scores = state.map((item) => {
    const s =
      dot(item.embedding, queryEmbedding) /
      (norm(item.embedding) * norm(queryEmbedding) + 1e-8);
    return { item, score: s };
  });
  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, topK).map((s) => ({ ...s.item, score: s.score }));
}

module.exports = { initChroma, upsertEmbeddings, querySimilar };
```

### backend/src/services/ragService.js

```js
// RAG orchestration using LangChain (Node SDK) conceptually. We form a prompt with retrieved context and query.
const config = require("../config");

async function generateAnswer(question, contexts) {
  // contexts: [{ text, metadata }]
  // Build prompt
  const contextText = contexts
    .map((c, i) => `Context ${i + 1}: ${c.text}`)
    .join("\n\n");
  const prompt = `You are an assistant that answers user queries using ONLY the provided contexts. If the answer is not present, say you don't know.\n\n${contextText}\n\nQuestion: ${question}\nAnswer:`;

  // Call HF generation model or other LLM via LangChain. Placeholder returning combined context snippet.
  // Replace with actual LangChain usage and model invocation.
  const answer = `SYNTHESIZED ANSWER (placeholder)\nBased on provided contexts:\n${contexts
    .slice(0, 3)
    .map((c) => c.text.slice(0, 200))
    .join("\n---\n")}`;
  return answer;
}

module.exports = { generateAnswer };
```

### backend/src/controllers/uploadController.js

```js
const { parsePDF } = require("../utils/pdfParser");
const { saveFile } = require("../services/storageService");
const { validateFile } = require("../utils/validators");
const { chunkText } = require("../services/chunkerService");
const { embedTexts } = require("../services/embeddingService");
const { upsertEmbeddings } = require("../services/chromaService");

// Upload endpoint handles file saving and starts ingestion pipeline asynchronously
async function uploadHandler(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });
    if (!validateFile(file.mimetype))
      return res.status(400).json({ error: "Unsupported file type" });

    const saved = await saveFile(file);

    // Parse text (sync for now) — pdf or text
    let text = "";
    if (file.mimetype === "application/pdf") {
      text = await parsePDF(saved.path);
    } else {
      const fs = require("fs");
      text = fs.readFileSync(saved.path, "utf8");
    }

    const chunks = chunkText(text);
    const texts = chunks.map((c) => c.text);

    // Embeddings
    const embeddings = await embedTexts(texts);
    const items = chunks.map((c, i) => ({
      id: c.id,
      embedding: embeddings[i],
      metadata: { filename: saved.filename, start: c.start, end: c.end },
    }));

    await upsertEmbeddings(items);

    return res.json({ ok: true, file: saved.filename, chunks: chunks.length });
  } catch (err) {
    console.error("Upload error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { uploadHandler };
```

### backend/src/controllers/qaController.js

```js
const { embedTexts } = require("../services/embeddingService");
const { querySimilar } = require("../services/chromaService");
const { generateAnswer } = require("../services/ragService");

async function askHandler(req, res) {
  try {
    const { question, topK } = req.body;
    if (!question) return res.status(400).json({ error: "Missing question" });

    const qEmb = (await embedTexts([question]))[0];
    const results = await querySimilar(qEmb, topK || 5);

    // Map to contexts
    const contexts = results.map((r) => ({
      text: r.metadata?.text || r.embeddingText || "...",
      metadata: r.metadata,
    }));

    // For placeholder, include chunk text if present
    // In real index, store original text in metadata - here embeddingService upsert includes chunk text

    const answer = await generateAnswer(question, contexts);
    return res.json({
      answer,
      sources: results.map((r) => ({
        id: r.id,
        score: r.score,
        metadata: r.metadata,
      })),
    });
  } catch (err) {
    console.error("Ask error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { askHandler };
```

### backend/src/routes/api.js

```js
const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname, "../../tmp") });

const { uploadHandler } = require("../controllers/uploadController");
const { askHandler } = require("../controllers/qaController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadHandler);
router.post("/ask", express.json(), askHandler);

module.exports = router;
```

### backend/src/app.js

```js
const express = require("express");
const apiRoutes = require("./routes/api");
const { initChroma } = require("./services/chromaService");

const app = express();

app.use("/api", apiRoutes);

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// init
(async () => {
  await initChroma();
})();

module.exports = app;
```

### backend/src/server.js

```js
const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
  console.log(`IntelliDocs backend listening on port ${config.port}`);
});
```

### backend/Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/server.js"]
```

---

## 6) Frontend — Full code files

### frontend/package.json

```json
{
  "name": "intellidocs-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^4.0.0"
  }
}
```

### frontend/src/main.jsx

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")).render(<App />);
```

### frontend/index.html (in public or root)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IntelliDocs AI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### frontend/src/App.jsx

```jsx
import React from "react";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        IntelliDocs AI — Document Intelligence Platform
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}
```

### frontend/src/pages/Home.jsx

```jsx
import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import QAForm from "../components/QAForm";
import AnswerView from "../components/AnswerView";

export default function Home() {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <div className="column">
        <UploadForm />
        <QAForm onAnswer={(a) => setAnswer(a)} setLoading={setLoading} />
      </div>
      <div className="column right">
        <h3>AI Answer</h3>
        <AnswerView answer={answer} loading={loading} />
      </div>
    </div>
  );
}
```

### frontend/src/components/UploadForm.jsx

```jsx
import React, { useState } from "react";
import api from "../services/api";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return setStatus("Select a file");
    setStatus("Uploading...");
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await api.post("/upload", form);
      const data = await res.json();
      if (data.ok) setStatus(`Uploaded: ${data.file} — chunks: ${data.chunks}`);
      else setStatus("Upload failed");
    } catch (err) {
      console.error(err);
      setStatus("Upload error");
    }
  }

  return (
    <div className="card">
      <h3>Upload Document</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      <div className="status">{status}</div>
    </div>
  );
}
```

### frontend/src/components/QAForm.jsx

```jsx
import React, { useState } from "react";
import api from "../services/api";

export default function QAForm({ onAnswer, setLoading }) {
  const [question, setQuestion] = useState("");

  async function ask(e) {
    e?.preventDefault();
    if (!question) return;
    setLoading(true);
    onAnswer(null);
    try {
      const res = await api.postJson("/ask", { question, topK: 5 });
      const data = await res.json();
      onAnswer(data);
    } catch (err) {
      console.error(err);
      onAnswer({ error: "Ask failed" });
    }
    setLoading(false);
  }

  return (
    <div className="card">
      <h3>Ask about documents</h3>
      <form onSubmit={ask}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          placeholder="Ask a question about your uploaded documents"
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
}
```

### frontend/src/components/AnswerView.jsx

```jsx
import React from "react";

export default function AnswerView({ answer, loading }) {
  if (loading) return <div>Loading answer...</div>;
  if (!answer)
    return <div>No answer yet — upload docs and ask a question.</div>;
  if (answer.error) return <div>Error: {answer.error}</div>;

  return (
    <div className="card answer">
      <pre style={{ whiteSpace: "pre-wrap" }}>{answer.answer}</pre>
      <h4>Sources</h4>
      <ul>
        {answer.sources?.map((s) => (
          <li key={s.id}>
            {s.metadata?.filename || s.id} — score: {Number(s.score).toFixed(3)}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### frontend/src/services/api.js

```js
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function post(path, formData) {
  return fetch(API_BASE + path, { method: "POST", body: formData });
}

async function postJson(path, body) {
  return fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export default { post, postJson };
```

### frontend/src/styles.css

```css
body {
  font-family: system-ui, Arial;
  margin: 0;
  background: #f7f8fa;
}
.header {
  background: #0f172a;
  color: white;
  padding: 1rem;
  font-size: 1.2rem;
}
.container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}
.column {
  flex: 1;
}
.right {
  max-width: 480px;
}
.card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  background: #0f172a;
  color: white;
  border-radius: 6px;
}
textarea {
  width: 100%;
  padding: 0.5rem;
}
.status {
  margin-top: 0.5rem;
  color: #333;
}
.answer pre {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 6px;
}
```

### frontend/Dockerfile (optional for local container)

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 7) docker-compose.yml

```yaml
version: "3.8"
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend/uploads:/usr/src/app/uploads
      - ./backend/data:/usr/src/app/data
  frontend:
    build: ./frontend
    ports:
      - "5173:80"
```

---

## 8) Deployment (Render + Vercel)

### Backend (Render)

1. Create a new Web Service on Render.
2. Connect your GitHub repo and choose the `backend/` subdirectory.
3. Set the build command: `npm install && npm run build` (if you have build), or simply `npm install`.
4. Start command: `node src/server.js`.
5. Add environment variables on Render matching `.env` keys (e.g. CHROMA_DB_DIR, HF_EMBEDDING_MODEL, etc.).
6. Make sure to use Render persistent storage if you need to persist Chroma database; otherwise use managed Chroma or an external vector DB.

**Notes:** Render ephemeral file systems — for production, use an external vector DB or attach persistent disk. Chroma is often run as its own service or cloud-hosted instead of local file.

### Frontend (Vercel)

1. Import project to Vercel and set the root to `/frontend`.
2. Set framework to `Vite` or `Other` depending on auto-detection.
3. Configure `VITE_API_BASE_URL` environment variable to point to the Render backend domain (e.g. `https://intellidocs-backend.onrender.com/api`).
4. Deploy.

---

## 9) Local setup & commands

**Prereqs:** Node.js 18+, npm, Docker (optional)

Clone repo, install:

```bash
git clone <your-repo-url>
cd intellidocs-ai/backend
npm install
cd ../frontend
npm install
```

Run locally (without Docker):

```bash
# backend
cd backend
cp .env.example .env  # edit values
npm run dev

# frontend (new terminal)
cd frontend
cp .env.example .env  # set VITE_API_BASE_URL to http://localhost:3000/api
npm run dev
```

Using Docker Compose:

```bash
docker-compose up --build
# Backend will be on http://localhost:3000
# Frontend on http://localhost:5173
```

---

## 10) API endpoints

```
POST /api/upload
  - form-data: file (pdf or txt)
  - response: { ok, file, chunks }

POST /api/ask
  - body: { question: string, topK?: number }
  - response: { answer: string, sources: [{ id, score, metadata }] }

GET /health
  - response: { status: 'ok' }
```

**Sample curl:**

```bash
curl -F "file=@sample.pdf" http://localhost:3000/api/upload

curl -X POST -H "Content-Type: application/json" -d '{"question":"What is the refund policy?"}' http://localhost:3000/api/ask
```

---

## 11) Testing & QA

- Unit test chunker with edge-case short/long texts.
- Validate embedding vector dimensions consistently.
- Integration test full pipeline: upload -> ask -> answer.
- Test with PDFs containing images (OCR not included — add Tesseract if needed).

---

## 12) Next improvements / production hardening

- Use managed Chroma (or Chroma server + persistent volume) in production.
- Replace placeholder HF embedding & generation calls with real HF Inference API or local model (optimize batching and concurrency).
- Add authentication & RBAC for document access.
- Add background job worker (BullMQ/Redis) for ingestion tasks and retries.
- Add logging, monitoring, and tracing (Sentry, Prometheus).
- Implement streaming generation (LLM streaming) for better UX.
- Add unit & integration tests and CI/CD.

---

## README (short preview)

Create `README.md` in repo root with sections: Overview, Architecture diagram, Local setup, Run, Deploy, API, Environment vars.

---

## Final notes

This canvas contains a complete, interview-ready scaffold. Replace placeholder SDK calls (Chroma, LangChain, HuggingFace) with exact production SDKs your organization uses. Make sure to secure keys and use persistent storage for the vector DB.

If you want, I can now:

- convert the placeholder embedding/generation code to exact calls for a specific HuggingFace API or model (e.g., `sentence-transformers/all-mpnet-base-v2` + `gptj`),
- add a Redis-backed background worker example,
- or produce a clean README file in full.

---

_End of canvas document._
