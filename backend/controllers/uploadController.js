const PDF = require('../models/PDF');
const Chunk = require('../models/Chunk');
const { extractText, chunkText } = require('../utils/pdfProcessor');
const { embedText } = require('../utils/gemini');
const fs = require('fs');

exports.uploadPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const { originalname, path } = req.file;
        const buffer = fs.readFileSync(path);

        // 1. Create PDF entry
        const pdf = new PDF({ filename: originalname });
        await pdf.save();

        // 2. Extract Text
        const text = await extractText(buffer);

        // 3. Chunk Text
        const chunks = chunkText(text);

        // 4. Process Chunks (Embed & Save)
        const chunkPromises = chunks.map(async (chunkText, index) => {
            const embedding = await embedText(chunkText);
            return {
                pdfId: pdf._id,
                chunkIndex: index,
                text: chunkText,
                embedding: embedding
            };
        });

        const chunkDocs = await Promise.all(chunkPromises);
        await Chunk.insertMany(chunkDocs);

        // Cleanup uploaded file
        fs.unlinkSync(path);

        res.json({ message: "PDF processed successfully", pdfId: pdf._id });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Failed to process PDF" });
    }
};
