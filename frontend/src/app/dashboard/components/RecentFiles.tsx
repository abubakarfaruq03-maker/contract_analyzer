import React, { useState } from "react";
import { FileText, FolderDown, MoreVertical, Clock, Search } from "lucide-react";

interface CachedFile {
  id: string;
  name: string;
  size: string;
  date: string;
  isOffline: boolean;
}

const RecentFiles: React.FC = () => {
    const [recentFiles] = useState<CachedFile[]>([
        { id: "1", name: "NDA_Service_Agreement.pdf", size: "1.2MB", date: "2 mins ago", isOffline: true },
        { id: "2", name: "Employment_Contract_v2.docx", size: "850KB", date: "1 hour ago", isOffline: true },
        { id: "3", name: "Commercial_Lease_Draft.pdf", size: "4.5MB", date: "Yesterday", isOffline: false },
      ]);
    return(
        <div>
  {/* Recent Files Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold text-main-text">Recent Intelligence</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="bg-card border border-border-line rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary w-48 md:w-64 text-main-text"
            />
          </div>
        </div>
        {/* Table Container */}
        <div className="bg-card border border-border-line rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary-text/5 border-b border-border-line">
                <th className="p-4 text-xs uppercase tracking-widest text-secondary-text font-bold">File Name</th>
                <th className="p-4 text-xs uppercase tracking-widest text-secondary-text font-bold">Status</th>
                <th className="p-4 text-xs uppercase tracking-widest text-secondary-text font-bold">Size</th>
                <th className="p-4 text-xs uppercase tracking-widest text-secondary-text font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentFiles.map((file) => (
                <tr key={file.id} className="border-b border-border-line/50 hover:bg-primary/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <FileText size={18} />
                      </div>
                      <span className="font-medium text-main-text truncate max-w-[200px] md:max-w-md">{file.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {file.isOffline ? (
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase tracking-wider bg-green-500/10 w-fit px-2 py-1 rounded">
                        <FolderDown size={12} />
                        Offline Ready
                      </div>
                    ) : (
                      <span className="text-[10px] font-black text-secondary-text uppercase tracking-wider bg-secondary-text/10 w-fit px-2 py-1 rounded">Cloud Sync</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-secondary-text font-mono">{file.size}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-secondary-text hover:text-main-text transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    )
}
export default RecentFiles;