import React from "react";
import { ArrowLeft, Download, } from "lucide-react";
import LeftSide from "./components/LeftSIde";
import RightSide from "./components/RightSide";
import ThemeToggle from "../../components/Themetoggle";

const AnalysisWorkspace: React.FC = () => {



  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden transition-colors duration-300">

      {/* HEADER */}
      <header className="h-14 border-b border-border-line flex items-center justify-between px-4 md:px-6 bg-card shrink-0 z-50">
        <div className="flex items-center gap-3 md:gap-4 text-main-text">
          <button className="hover:bg-primary/10 p-1.5 rounded-full transition-colors">
            <ArrowLeft size={18} />
          </button>
          <span className="font-black text-[10px] uppercase tracking-widest opacity-80 truncate max-w-[100px] md:max-w-none">
            LexiGuard AI
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <button className="bg-primary text-white px-3 md:px-5 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all hover:scale-105 flex items-center gap-2">
            <Download size={14} />
            <span className="hidden md:inline">Export </span>
            <span className="md:hidden">Export</span>
          </button>
        </div>
      </header>

      {/* 2. SPLIT CONTAINER */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

        {/* LEFT: THE SOURCE */}

        <LeftSide />
        {/* RIGHT: THE INSIGHTS SIDEBAR */}
        <RightSide />

      </div>
    </div>
  );
};

export default AnalysisWorkspace;