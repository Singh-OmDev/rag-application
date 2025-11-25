const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const embedder = genAI.getGenerativeModel({ model: "text-embedding-004" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function embedText(text) {
    const result = await embedder.embedContent(text);
    return result.embedding.values;
}

async function getAnswer(question, contextText) {
    const prompt = `
You are an expert PDF assistant.
Use ONLY the following context to answer.
If answer is not in context, say 'Not found in PDF'.

Format your answer using Markdown.
- Use bullet points for lists.
- Use bold text for key terms.
- Use headings if the answer is long.
- Do not output a single block of text.

Context:
${contextText}

Question: ${question}
`;

    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "No answer generated.";
}

module.exports = { embedText, getAnswer };
