import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ onUpload, isUploading }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Upload className="w-6 h-6 text-blue-600" />
                </div>
                Upload PDF
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group relative">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="pdf-upload"
                    />
                    <div className="flex flex-col items-center pointer-events-none">
                        <div className="p-4 bg-gray-100 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {file ? file.name : "Click to select a PDF"}
                        </span>
                        <span className="text-sm text-gray-500 mt-2">Supported format: .pdf</span>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!file || isUploading}
                    className="w-full bg-blue-600 text-white py-3.5 px-6 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-md hover:shadow-lg transform active:scale-[0.98]"
                >
                    {isUploading ? "Processing..." : "Upload & Process"}
                </button>
            </form>
        </div>
    );
};

export default FileUpload;
