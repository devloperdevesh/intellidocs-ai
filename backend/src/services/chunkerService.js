function chunkText(text, chunkSize = 800, overlap = 200) {
    if (!text || typeof text !== 'string') return [];
  
    const chunks = [];
    let start = 0;
  
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunk = text.slice(start, end);
  
      if (chunk.trim().length > 0) {
        chunks.push(chunk);
      }
  
      if (end === text.length) break;
  
      start = end - overlap;
      if (start < 0) start = 0;
    }
  
    return chunks;
  }
  
  module.exports = { chunkText };
  