import React, { useState } from 'react';
import axios from 'axios';
import { saveAnalysis } from '../lib/db';

const FileUpload = ({ onAnalysisComplete }: { onAnalysisComplete: (data: any) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('contract', file);

    try {
      // 1. Send to Backend
      const response = await axios.post('http://localhost:3000/api/analyzer/analyze', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          setProgress(percent);
        },
      });

      // 2. Save result to IndexedDB (the db.ts part!)
      const savedId = await saveAnalysis(file.name, response.data);
      console.log('Saved to local vault with ID:', savedId);

      // 3. Tell the parent component we are done
      onAnalysisComplete(response.data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Error analyzing file. Check if backend is running.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      
      {file && !uploading && (
        <button 
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Analyze {file.name}
        </button>
      )}

      {uploading && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">AI is auditing your contract... {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;