const pdfParse = require('pdf-parse');

async function extractText(buffer) {
    const data = await pdfParse(buffer);
    return data.text;
}

function chunkText(text, size = 400) {
    const words = text.split(/\s+/);
    const chunks = [];
    for (let i = 0; i < words.length; i += size) {
        chunks.push(words.slice(i, i + size).join(" "));
    }
    return chunks;
}

module.exports = { extractText, chunkText };
