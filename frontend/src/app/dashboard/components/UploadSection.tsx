import React, { useCallback } from "react";
import { UploadCloud, FileWarning } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadSectionProps {
  onFileAccepted: (file: File) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onFileAccepted }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="relative group cursor-pointer mb-16">
      {/* Dynamic Background Glow */}
      <div className={`absolute -inset-1 rounded-[2rem] blur opacity-25 transition duration-1000 
        ${isDragActive ? "bg-primary opacity-60" : "bg-gradient-to-r from-primary/20 to-blue-600/20 group-hover:opacity-50"}`}>
      </div>

      <div className={`relative border-2 border-dashed rounded-[2rem] bg-card p-12 flex flex-col items-center justify-center transition-all duration-300
        ${isDragActive ? "border-primary bg-primary/5" : "border-border-line hover:border-primary/50"}
        ${isDragReject ? "border-red-500 bg-red-500/5" : ""}`}>
        
        <input {...getInputProps()} id="file-upload" />

        <div className={`p-4 rounded-2xl mb-6 transition-transform duration-300 
          ${isDragActive ? "bg-primary text-white scale-110" : "bg-primary/10 text-primary group-hover:scale-105"}`}>
          {isDragReject ? <FileWarning size={48} /> : <UploadCloud size={48} strokeWidth={1.5} />}
        </div>

        <h2 className="text-2xl font-bold text-main-text mb-2 text-center">
          {isDragActive ? "Drop the PDF here" : "Drag and drop your contract here"}
        </h2>

        <p className="text-secondary-text mb-8 text-center">
          {isDragReject 
            ? <span className="text-red-500 font-bold">Only PDF files are supported!</span>
            : <>Supports <span className="text-main-text font-medium">PDF</span> up to 10MB</>
          }
        </p>

        <button 
          type="button"
          className="bg-main-text text-background px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-xl active:scale-95"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
};

export default UploadSection;