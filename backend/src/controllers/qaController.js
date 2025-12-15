const askHandler = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  return res.json({
    answer: `This is a mock RAG answer for: "${question}"`,
    sources: ["Uploaded Document"]
  });
};

module.exports = { askHandler };
