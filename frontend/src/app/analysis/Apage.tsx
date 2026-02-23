import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import LeftSide from "./components/LeftSIde";

import RightSide from "./components/RightSide";
import ThemeToggle from "../../components/Themetoggle";
import {getAnalysisById, saveAnalysis} from "../../lib/db";
import axios from "axios";

const AnalysisWorkspace: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processAnalysis = async () => {
      // CASE 1: Loading from History
      if (id) {
        const cachedData = await getAnalysisById(id);
        if (cachedData) {
          setData(cachedData);
          // If we saved the actual File object in IndexedDB:
          if (cachedData.file) {
            setFileUrl(URL.createObjectURL(cachedData.file));
          }
          setLoading(false);
          return;
        }
      }

      // CASE 2: New Upload
      const file = location.state?.file as File;
      if (file) {
        // Set local preview immediately
        const localUrl = URL.createObjectURL(file);
        setFileUrl(localUrl);

        try {
          const formData = new FormData();
          formData.append("contract", file);

          const response = await axios.post("http://localhost:5000/api/analyzer/analyze", formData);

          // We save the analysis + the file object itself to IndexedDB
          const savedId = await saveAnalysis(file.name, {
            ...response.data,
            file: file, // Storing the blob in IndexedDB
          });

          setData(response.data);
          window.history.replaceState(null, "", `/analyze/${savedId}`);
        } catch (err) {
          console.error("Analysis failed", err);
          alert("AI Analysis failed. Showing document only.");
        } finally {
          setLoading(false);
        }
      } else if (!id) {
        navigate("/");
      }
    };

    processAnalysis();

    // Cleanup Blob URLs to prevent memory leaks
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [id, location.state]);

  if (loading && !fileUrl) return <LoadingState />;

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden transition-colors duration-300">
      <header className="h-14 border-b border-border-line flex items-center justify-between px-4 md:px-6 bg-card shrink-0 z-50">
        <div className="flex items-center gap-3 md:gap-4 text-main-text">
          <button onClick={() => navigate("/")} className="hover:bg-primary/10 p-1.5 rounded-full transition-colors">
            <ArrowLeft size={18} />
          </button>
          <span className="font-black text-[10px] uppercase tracking-widest opacity-80">
            LexiGuard AI Audit {data?.fileName && `— ${data.fileName}`}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="bg-primary text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 flex items-center gap-2">
            <Download size={14} />
            <span className="hidden md:inline">Export Report</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <LeftSide fileUrl={fileUrl} />
        <RightSide results={data} isLoading={loading} />
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-main-text">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
    <p className="font-bold animate-pulse text-primary tracking-tighter text-xl">LEXIGUARD AI</p>
    <p className="text-secondary-text text-sm">Auditing legal clauses...</p>
  </div>
);

export default AnalysisWorkspace;