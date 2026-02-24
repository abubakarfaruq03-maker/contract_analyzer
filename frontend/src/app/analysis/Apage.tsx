import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ShieldCheck, CloudCheck, RefreshCcw } from "lucide-react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import LeftSide from "./components/LeftSIde";
import RightSide from "./components/RightSide";
import ThemeToggle from "../../components/Themetoggle";
import { getAnalysisById, saveAnalysis } from "../../lib/db";

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'failed';

const AnalysisWorkspace: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');

  // Professional PDF Export using jsPDF
  const handleExport = () => {
    if (!data) return;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(63, 81, 181); // Primary Color
    doc.text("LexiGuard Audit Report", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Document: ${data.fileName || 'Contract'}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 35);

    // Prepare Data - Fixes [object Object] issue
    const formattedRisks = Array.isArray(data.risks)
      ? data.risks.map((r: any) => {
          if (typeof r === 'string') return `• ${r}`;
          // Extract description/risk from object, fallback to stringified object if unknown
          return `• ${r.risk || r.description || r.message || JSON.stringify(r)}`;
        }).join('\n\n')
      : 'No major risks identified';

    const riskScore = data.overallRiskScore || data.riskScore || 0;

    // Table of Results
    autoTable(doc, {
      startY: 45,
      head: [['Section', 'Analysis Details']],
      body: [
        ['Overall Summary', data.summary || 'No summary available'],
        ['Risk Score', `${riskScore}/100`],
        ['Identified Risks', formattedRisks],
        ['Key Clauses', Array.isArray(data.keyClauses) ? data.keyClauses.join('\n\n') : 'N/A'],
      ],
      headStyles: { fillColor: [63, 81, 181] },
      styles: { cellPadding: 5, fontSize: 10, overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: 'bold' },
        1: { cellWidth: 140 }
      }
    });

    doc.save(`Audit_${data.fileName || 'Report'}.pdf`);
  };

  useEffect(() => {
    const processAnalysis = async () => {
      const token = localStorage.getItem('token');
      const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

      // 1. History Load (From IndexedDB)
      if (id) {
        const cachedData = await getAnalysisById(id);
        if (cachedData) {
          setData(cachedData.results || cachedData); // Support nested or flat data
          if (cachedData.file) setFileUrl(URL.createObjectURL(cachedData.file));
          setSyncStatus(cachedData.isSynced ? 'synced' : 'idle');
          setIsInitialLoading(false);
          return;
        }
      }

      // 2. New Upload Load
      const file = location.state?.file as File;
      if (file) {
        const localUrl = URL.createObjectURL(file);
        setFileUrl(localUrl);
        setIsInitialLoading(false); 
        setIsAiProcessing(true);    

        try {
          const formData = new FormData();
          formData.append("contract", file);
          
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/analyzer/analyze`, 
            formData,
            { headers: authHeader }
          );

          // Save to Local DB (Dashboard handles Cloud Sync later)
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
        navigate("/dashboard");
      }
    };

    processAnalysis();
    return () => { if (fileUrl) URL.revokeObjectURL(fileUrl); };
  }, [id, location.state]);

  if (isInitialLoading) return <FullPageLoader />;

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      <header className="h-14 border-b border-border-line flex items-center justify-between px-6 bg-card shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="hover:bg-primary/10 p-2 rounded-full transition-all">
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-[10px] uppercase tracking-widest text-primary flex items-center gap-1.5">
                <ShieldCheck size={12} /> LexiGuard Audit
              </span>
              
              {syncStatus !== 'idle' && (
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase border ${
                  syncStatus === 'synced' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                  syncStatus === 'syncing' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                  'bg-red-500/10 border-red-500/20 text-red-500'
                }`}>
                  {syncStatus === 'synced' ? <CloudCheck size={10} /> : <RefreshCcw size={10} className="animate-spin" />}
                  {syncStatus}
                </div>
              )}
            </div>
            {data?.fileName && <span className="text-[10px] opacity-50 font-medium truncate max-w-[200px]">{data.fileName}</span>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={handleExport}
            disabled={!data}
            className="bg-primary text-white px-5 py-1.5 rounded-full text-xs font-black shadow-lg shadow-primary/20 hover:scale-105 flex items-center gap-2 transition-transform disabled:opacity-50"
          >
            <Download size={14} /> Export Report
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
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-pulse">Securing Workspace</p>
  </div>
);

export default AnalysisWorkspace;