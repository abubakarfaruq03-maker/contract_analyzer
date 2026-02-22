import {AlertTriangle, Zap} from "lucide-react";
const RightSide: React.FC = () => { 
    const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
    return(
            <aside className="w-full md:w-[40%] h-[50vh] md:h-full overflow-y-auto no-scrollbar bg-card p-6 md:p-8 space-y-6">
          
          <div className="p-4 md:p-6 bg-primary/5 border border-primary/20 rounded-2xl md:rounded-3xl">
            <div className="flex items-center gap-2 mb-2 md:mb-3 text-primary">
              <Zap size={16} className="fill-primary" />
              <span className="font-black text-[10px] uppercase tracking-widest">Analysis Engine</span>
            </div>
            <p className="text-xs md:text-sm text-secondary-text leading-relaxed">
              Viewing identified risks. Click cards to jump to the relevant page in the source.
            </p>
          </div>

          {/* Jump Button Card */}
          <button 
            onClick={() => scrollToId("term-clause")}
            className="w-full text-left p-5 md:p-6 bg-background border border-border-line rounded-2xl md:rounded-3xl hover:border-red-500 transition-all group"
          >
            <div className="flex items-center gap-3 mb-2 md:mb-3 text-red-500">
<AlertTriangle size={20} className="w-4.5 h-4.5 md:w-5 md:h-5" />         
     <h4 className="font-bold text-sm md:text-base text-main-text group-hover:text-red-500 transition-colors tracking-tight">
                High Risk: Termination Lock
              </h4>
            </div>
            <p className="text-[11px] md:text-xs text-secondary-text leading-relaxed">
              This clause prevents exit for 3 years, which is non-standard for this industry.
            </p>
          </button>

          {/* Dummy insights for scroll */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 md:p-6 border border-border-line rounded-xl md:rounded-2xl opacity-40 bg-background/50">
              <h5 className="text-[10px] font-bold mb-2 uppercase tracking-tighter">Analyzed Clause {i + 1}</h5>
              <div className="h-1.5 w-full bg-secondary-text/10 rounded-full" />
            </div>
          ))}
          
        </aside>
    )
}
export default RightSide;