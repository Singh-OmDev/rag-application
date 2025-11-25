import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import AskPage from './pages/AskPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/ask" element={<AskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
