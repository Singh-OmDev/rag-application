import React, { useState } from 'react';
import axios from 'axios';
import { Send, ArrowLeft, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import AnswerBox from '../components/AnswerBox';

const AskPage = () => {
    const [question, setQuestion] = useState('');
    const [answerData, setAnswerData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const pdfId = localStorage.getItem('currentPdfId');

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!question.trim() || !pdfId) return;

        setIsLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/api/ask`, {
                pdfId,
                question
            });
            setAnswerData(response.data);
        } catch (error) {
            console.error("Ask failed", error);
            alert("Failed to get answer.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!pdfId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                    <p className="mb-6 text-gray-600 text-lg">No PDF selected.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Go to Upload
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors font-medium"
                >
                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md mr-3 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    Upload New PDF
                </button>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                        Ask a Question
                    </h2>
                    <form onSubmit={handleAsk} className="flex gap-4">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="What would you like to know about the document?"
                            className="flex-1 p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg placeholder:text-gray-400"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !question.trim()}
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold text-lg shadow-md hover:shadow-lg active:scale-95"
                        >
                            {isLoading ? <Spinner /> : <Send className="w-5 h-5" />}
                            {isLoading ? "Thinking..." : "Ask"}
                        </button>
                    </form>
                </div>

                {answerData && (
                    <AnswerBox answer={answerData.answer} sources={answerData.sources} />
                )}
            </div>
        </div>
    );
};

export default AskPage;
