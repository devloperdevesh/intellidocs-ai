const fs = require('fs');
const pdfParse = require('pdf-parse');

async function parsePDF(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error('PDF file not found at path: ' + filePath);
  }

  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
}

module.exports = { parsePDF };

