interface RightSideProps {
  results: any;
  isLoading?: boolean;
}

const RightSide: React.FC<RightSideProps> = ({ results, isLoading }) => {
  if (!results) return null;

  return (
    <aside className="w-full md:w-[40%] h-[50vh] md:h-full overflow-y-auto no-scrollbar bg-card p-6 md:p-8 space-y-6">
      {/* Risk Summary Header */}
      <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl">
        <div className="text-4xl font-black text-primary mb-1">{results.overallRiskScore}%</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-text mb-4">Risk Severity Score</div>
        <p className="text-sm text-secondary-text leading-relaxed">{results.summary}</p>
      </div>

      <h3 className="text-xs font-bold uppercase tracking-widest text-main-text mt-8 mb-4">Identified Risks</h3>
      
      {results.risks?.map((risk: any, i: number) => (
        <div key={i} className={`p-6 border rounded-3xl transition-all bg-background hover:shadow-lg ${
          risk.severity === 'high' ? 'border-red-500/30' : 'border-border-line'
        }`}>
          <div className="flex items-center gap-2 mb-3">
             <div className={`w-2 h-2 rounded-full ${risk.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} />
             <h4 className="font-bold text-main-text text-sm capitalize">{risk.severity} Risk</h4>
          </div>
          <p className="text-xs text-main-text font-semibold mb-2 italic">"{risk.clause}"</p>
          <p className="text-xs text-secondary-text mb-4">{risk.explanation}</p>
          <div className="pt-4 border-t border-border-line">
            <span className="text-[10px] font-bold text-primary uppercase">Recommendation:</span>
            <p className="text-[11px] text-main-text mt-1">{risk.actionItem}</p>
          </div>
        </div>
      ))}
    </aside>
  );
};
export default RightSide;