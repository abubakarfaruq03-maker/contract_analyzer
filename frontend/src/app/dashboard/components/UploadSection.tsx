import { UploadCloud } from "lucide-react";
import type React from "react";

const UploadSection: React.FC = () => {
  return (
    <div className="relative group cursor-pointer mb-16">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative border-2 border-dashed border-border-line rounded-[2rem] bg-card p-12 flex flex-col items-center justify-center transition-all hover:border-primary/50">
        <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-6">
          <UploadCloud size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-main-text mb-2 text-center">
          Drag and drop your contract here
        </h2>
        <p className="text-secondary-text mb-8 text-center">
          Supports <span className="text-main-text font-medium">PDF, DOCX</span> up to 10MB
        </p>
        <button className="bg-main-text text-background px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all">
          Browse Files
        </button>
      </div>
    </div>
  );
};

export default UploadSection;