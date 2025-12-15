const { parsePDF } = require("../utils/pdfParser");
const { chunkText } = require("../services/chunkerService");

async function uploadHandler(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await parsePDF(req.file.path);
    const chunks = chunkText(text);

    return res.json({
      ok: true,
      filename: req.file.originalname,
      chunks: chunks.length,
      preview: text.slice(0, 300),
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
}

module.exports = { uploadHandler };

