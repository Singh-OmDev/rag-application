import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileUpload from '../components/FileUpload';
import { FileText, Sparkles } from 'lucide-react';

const UploadPage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleUpload = async (file) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            localStorage.setItem('currentPdfId', response.data.pdfId);
            navigate('/ask');
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-xl w-full">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-xl mb-6 transform hover:scale-105 transition-transform duration-300">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                            <FileText className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        RAG PDF <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Assistant</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                        Unlock insights from your documents. Upload a PDF to start asking questions instantly.
                    </p>
                </div>
                <FileUpload onUpload={handleUpload} isUploading={isUploading} />

                <div className="mt-12 flex justify-center gap-8 text-gray-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span>AI Powered</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Secure Processing</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
