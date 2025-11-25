const mongoose = require('mongoose');

const chunkSchema = new mongoose.Schema({
    pdfId: { type: mongoose.Schema.Types.ObjectId, ref: 'PDF', required: true },
    chunkIndex: { type: Number, required: true },
    text: { type: String, required: true },
    embedding: { type: [Number], required: true },
});

module.exports = mongoose.model('Chunk', chunkSchema);
