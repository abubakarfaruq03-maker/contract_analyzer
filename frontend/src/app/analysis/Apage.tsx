import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ShieldCheck } from "lucide-react";
import axios from "axios";

import LeftSide from "./components/LeftSIde";
import RightSide from "./components/RightSide";
import ThemeToggle from "../../components/Themetoggle";
import { getAnalysisById, saveAnalysis } from "../../lib/db";

const AnalysisWorkspace: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  useEffect(() => {
    const processAnalysis = async () => {
      // 1. History Load
      if (id) {
        const cachedData = await getAnalysisById(id);
        if (cachedData) {
          setData(cachedData);
          if (cachedData.file) setFileUrl(URL.createObjectURL(cachedData.file));
          setIsInitialLoading(false);
          return;
        }
      }

      // 2. New Upload Load
      const file = location.state?.file as File;
      if (file) {
        const localUrl = URL.createObjectURL(file);
        setFileUrl(localUrl);
        setIsInitialLoading(false); // Reveal PDF viewer immediately
        setIsAiProcessing(true);    // Start RightSide blinking

        try {
          const formData = new FormData();
          formData.append("contract", file);
          const response = await axios.post("http://localhost:3000/api/analyzer/analyze", formData);

          const savedId = await saveAnalysis(file.name, {
            ...response.data,
            file: file,
          });

          setData(response.data);
          window.history.replaceState(null, "", `/analyze/${savedId}`);
        } catch (err) {
          console.error("Analysis Error:", err);
        } finally {
          setIsAiProcessing(false);
        }
      } else if (!id) {
        navigate("/");
      }
    };

    processAnalysis();
    return () => { if (fileUrl) URL.revokeObjectURL(fileUrl); };
  }, [id, location.state]);

  if (isInitialLoading) return <FullPageLoader />;

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden transition-colors duration-300">
      <header className="h-14 border-b border-border-line flex items-center justify-between px-6 bg-card shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="hover:bg-primary/10 p-2 rounded-full transition-all">
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col">
            <span className="font-black text-[10px] uppercase tracking-widest text-primary flex items-center gap-1.5">
              <ShieldCheck size={12} /> LexiGuard Audit
            </span>
            {fileUrl && <span className="text-[10px] opacity-50 font-medium truncate max-w-[150px]">Document Active</span>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="bg-primary text-white px-5 py-1.5 rounded-full text-xs font-black shadow-lg shadow-primary/20 hover:scale-105 flex items-center gap-2 transition-transform">
            <Download size={14} /> <span className="hidden md:inline">Download Report</span>
          </button>
        </div>
      </header>

      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <LeftSide fileUrl={fileUrl} />
        <RightSide results={data} isLoading={isAiProcessing} />
      </main>
    </div>
  );
};

const FullPageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background space-y-4">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-pulse">Initializing Workspace</p>
  </div>
);

export default AnalysisWorkspace;