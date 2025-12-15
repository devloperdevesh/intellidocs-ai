// TEMP embedding logic (NO LangChain, NO HF API yet)

function fakeEmbedding(text) {
  // simple numeric vector (demo purpose)
  return text
    .slice(0, 50)
    .split('')
    .map(c => c.charCodeAt(0) / 255);
}

async function embedTexts(chunks) {
  return chunks.map(chunk => fakeEmbedding(chunk));
}

async function embedQuery(query) {
  return fakeEmbedding(query);
}

module.exports = { embedTexts, embedQuery };
