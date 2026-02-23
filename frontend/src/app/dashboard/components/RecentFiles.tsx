import React, { useEffect, useState } from "react";
import { FileText, FolderDown, MoreVertical, Clock, Search, AlertCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllAnalyses, deleteAnalysis } from "../../../lib/db";

const RecentFiles: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Fetch data from IndexedDB on component mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await getAllAnalyses();
        setFiles(data);
      } catch (error) {
        console.error("Failed to load local history:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, []);

  // 2. Filter logic for the search bar
  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    // Prevent the row click (which navigates to /analyze) from firing
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this analysis? This cannot be undone.")) {
      try {
        // 1. Remove from IndexedDB
        await deleteAnalysis(id);

        // 2. Update UI state (remove the deleted file from the list)
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));

        console.log(`Deleted analysis: ${id}`);
      } catch (error) {
        console.error("Failed to delete:", error);
        alert("Could not delete the file. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center animate-pulse text-secondary-text">
        Synchronizing with local vault...
      </div>
    );
  }

  return (
    <div className="mt-12">
      {/* Header & Search */}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-card border border-border-line rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary w-full md:w-64 text-main-text transition-all"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-card border border-border-line rounded-2xl overflow-hidden shadow-sm">
        {filteredFiles.length === 0 ? (
          <div className="p-16 text-center">
            <AlertCircle className="mx-auto text-secondary-text/30 mb-4" size={48} />
            <p className="text-secondary-text font-medium">
              {searchQuery ? "No matching results found." : "Your legal vault is empty."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary-text/5 border-b border-border-line">
                  <th className="p-4 text-xs uppercase tracking-widest text-secondary-text font-bold">File Name</th>
                  <th className="p-4 text-xs uppercase tracking-widest text-secondary-text font-bold text-center">Risk Score</th>
                  <th className="p-4 text-xs uppercase tracking-widest text-secondary-text font-bold">Status</th>
                  <th className="p-4 text-xs uppercase tracking-widest text-secondary-text font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr
                    key={file.id}
                    onClick={() => navigate(`/analyze/${file.id}`)}
                    className="border-b border-border-line/50 hover:bg-primary/[0.02] transition-colors group cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                          <FileText size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-main-text truncate max-w-[180px] md:max-w-md">
                            {file.fileName}
                          </span>
                          <span className="text-[10px] text-secondary-text uppercase font-bold">
                            {new Date(file.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${file.overallRiskScore > 70 ? 'text-red-500 bg-red-500/10' : 'text-green-500 bg-green-500/10'
                        }`}>
                        {file.overallRiskScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase tracking-wider bg-green-500/10 w-fit px-2 py-1 rounded">
                        <FolderDown size={12} />
                        Offline Ready
                      </div>
                    </td>
                    {/* Find the Actions <td> in your mapping logic */}
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => handleDelete(file.id, e)}
                        className="p-2 text-secondary-text hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all group/btn"
                        title="Delete Analysis"
                      >
                        <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentFiles;