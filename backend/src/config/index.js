require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  uploadDir: process.env.UPLOAD_DIR || "uploads",
  maxChunkSize: Number(process.env.MAX_CHUNK_SIZE || 800),
  chunkOverlap: Number(process.env.CHUNK_OVERLAP || 200),
};
