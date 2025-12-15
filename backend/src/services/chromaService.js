const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/embeddings.json');

function ensureDB() {
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
}

function saveEmbeddings(records) {
  ensureDB();
  const existing = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const updated = existing.concat(records);
  fs.writeFileSync(DB_PATH, JSON.stringify(updated, null, 2));
}

function searchEmbeddings(queryEmbedding, topK = 3) {
  ensureDB();
  const records = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  return records.slice(0, topK); // simple retrieval (demo)
}

module.exports = { saveEmbeddings, searchEmbeddings };
