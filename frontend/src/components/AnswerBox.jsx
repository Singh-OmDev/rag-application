import React from 'react';
import { Bot, ChevronDown, ChevronUp } from 'lucide-react';

import ReactMarkdown from 'react-markdown';

const AnswerBox = ({ answer, sources }) => {
    const [showSources, setShowSources] = React.useState(false);

    if (!answer) return null;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-8 animate-fade-in-up">
            <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-md flex-shrink-0">
                    <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-800">AI Answer</h3>
                    <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                        <ReactMarkdown>{answer}</ReactMarkdown>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                    onClick={() => setShowSources(!showSources)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-blue-50"
                >
                    {showSources ? (
                        <>
                            <ChevronUp className="w-4 h-4" /> Hide Sources
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" /> Show Sources
                        </>
                    )}
                </button>

                {showSources && (
                    <div className="mt-4 space-y-3 pl-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Context Used</h4>
                        {sources.map((source, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 border border-gray-200 hover:border-blue-200 transition-colors">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Chunk {index + 1}</span>
                                    <span className="text-xs font-medium text-gray-400">Relevance: {(source.score * 100).toFixed(1)}%</span>
                                </div>
                                <p className="leading-relaxed">{source.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnswerBox;
