import React, { useEffect, useState } from "react";
import { FileText, CloudCheck, CloudOff, MoreVertical, Clock, Search, AlertCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllAnalyses, deleteAnalysis } from "../../../lib/db";

const RecentFiles: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await getAllAnalyses();
        setFiles(data);
      } catch (error) {
        console.error("Load Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, []);

  const filteredFiles = files.filter((f) => f.fileName.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Delete this analysis?")) return;
    await deleteAnalysis(id);
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  if (loading) return <div className="py-20 text-center animate-pulse text-secondary-text">Loading vault...</div>;

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="text-primary w-5 h-5" />
          <h3 className="text-xl font-bold text-main-text">Recent Intelligence</h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text w-4 h-4" />
          <input
            type="text"
            placeholder="Search history..."
            className="bg-card border border-border-line rounded-xl py-2 pl-10 pr-4 text-sm w-full md:w-64"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border border-border-line rounded-2xl overflow-hidden">
        {filteredFiles.length === 0 ? (
          <div className="p-16 text-center"><p className="text-secondary-text">No analyses found.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary-text/5 border-b border-border-line">
                  <th className="p-4 text-xs font-bold uppercase text-secondary-text">File Name</th>
                  <th className="p-4 text-xs font-bold uppercase text-secondary-text text-center">Risk Score</th>
                  <th className="p-4 text-xs font-bold uppercase text-secondary-text">Sync Status</th>
                  <th className="p-4 text-xs font-bold uppercase text-secondary-text text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => {
                  const score = file.results?.overallRiskScore || 0;
                  return (
                    <tr key={file.id} onClick={() => navigate(`/analyze/${file.id}`)} className="border-b border-border-line/50 hover:bg-primary/[0.02] cursor-pointer group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                            <FileText size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-main-text truncate max-w-[200px]">{file.fileName}</span>
                            <span className="text-[10px] text-secondary-text font-bold">{new Date(file.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${score > 70 ? 'text-red-500 bg-red-500/10' : 'text-green-500 bg-green-500/10'}`}>
                          {score}%
                        </span>
                      </td>
                      <td className="p-4">
                        {file.isSynced ? (
                          <div className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase bg-green-500/10 px-2 py-1 rounded w-fit">
                            <CloudCheck size={12} /> Cloud
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[10px] font-black text-orange-500 uppercase bg-orange-500/10 px-2 py-1 rounded w-fit">
                            <CloudOff size={12} /> Local
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={(e) => handleDelete(file.id, e)} className="p-2 text-secondary-text hover:text-red-500 rounded-lg"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentFiles;