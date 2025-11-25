const Chunk = require('../models/Chunk');
const { embedText, getAnswer } = require('../utils/gemini');
const { cosineSimilarity } = require('../utils/math');

exports.askQuestion = async (req, res) => {
    try {
        const { pdfId, question } = req.body;

        if (!pdfId || !question) {
            return res.status(400).json({ error: "Missing pdfId or question" });
        }

        // 1. Embed Question
        const questionEmbedding = await embedText(question);

        // 2. Fetch Chunks for PDF
        const chunks = await Chunk.find({ pdfId });

        if (chunks.length === 0) {
            return res.status(404).json({ error: "PDF not found or no chunks available" });
        }

        // 3. Calculate Similarity
        const scoredChunks = chunks.map(chunk => ({
            ...chunk.toObject(),
            score: cosineSimilarity(questionEmbedding, chunk.embedding)
        }));

        // 4. Sort & Select Top 5
        scoredChunks.sort((a, b) => b.score - a.score);
        const topChunks = scoredChunks.slice(0, 5);

        // 5. Generate Answer
        const contextText = topChunks.map(c => c.text).join("\n\n");
        const answer = await getAnswer(question, contextText);

        res.json({
            answer,
            sources: topChunks.map(c => ({ text: c.text, score: c.score }))
        });

    } catch (error) {
        console.error("Ask Error:", error);
        res.status(500).json({ error: "Failed to answer question" });
    }
};
