import React from "react";
import { Shield, AlertCircle, CheckCircle2 } from "lucide-react";

interface RightSideProps {
  results: any;
  isLoading?: boolean;
}

const RightSide: React.FC<RightSideProps> = ({ results, isLoading }) => {
  // 1. LOADING STATE (The Blinking Shield)
  if (isLoading) {
    return (
      <aside className="w-full md:w-[450px] lg:w-[550px] h-full flex flex-col items-center justify-center bg-card p-8 text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative bg-background p-5 rounded-3xl border border-border-line shadow-xl animate-bounce">
            <Shield className="text-primary w-8 h-8" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-main-text font-bold tracking-tight text-lg">AI Legal Audit in Progress</h3>
          <p className="text-secondary-text text-xs font-medium animate-pulse">
            Processing every clause... this might take a while.
          </p>
        </div>
      </aside>
    );
  }

  // 2. EMPTY STATE
  if (!results) {
    return (
      <aside className="w-full md:w-[450px] lg:w-[550px] h-full flex items-center justify-center bg-card p-8 text-secondary-text">
        <p className="text-sm font-medium italic">Upload a contract to begin analysis.</p>
      </aside>
    );
  }

  // 3. SUCCESS STATE (Results Display)
  return (
    <aside className="w-full md:w-[450px] lg:w-[550px] h-full overflow-y-auto no-scrollbar bg-card p-6 md:p-8 space-y-8 border-l border-border-line">
      {/* Risk Summary Header */}
      <div className="p-8 bg-primary/[0.03] border border-primary/10 rounded-[2rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Shield size={64} className="text-primary" />
        </div>
        <div className="relative z-10">
          <div className="text-5xl font-black text-primary mb-1">{results.overallRiskScore}%</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 mb-6">Risk Severity Score</div>
          <p className="text-sm text-main-text/80 leading-relaxed font-medium">{results.summary}</p>
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary-text mb-6 flex items-center gap-2">
          <AlertCircle size={14} /> Identified Risks ({results.risks?.length || 0})
        </h3>
        
        <div className="space-y-4">
          {results.risks?.map((risk: any, i: number) => (
            <div key={i} className={`p-6 border rounded-[2rem] transition-all bg-background hover:shadow-xl hover:-translate-y-1 ${
              risk.severity.toLowerCase() === 'high' ? 'border-red-500/30' : 'border-border-line'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${
                     risk.severity.toLowerCase() === 'high' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-yellow-500'
                   }`} />
                   <h4 className="font-bold text-main-text text-[11px] uppercase tracking-wider">{risk.severity} Risk</h4>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-xs text-main-text font-bold leading-snug italic opacity-90">"{risk.clause}"</p>
                <p className="text-xs text-secondary-text leading-relaxed">{risk.explanation}</p>
              </div>

              <div className="mt-5 pt-5 border-t border-border-line/50">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Legal Recommendation</span>
                    <p className="text-[11px] text-main-text font-medium mt-1 leading-relaxed">{risk.actionItem}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSide;