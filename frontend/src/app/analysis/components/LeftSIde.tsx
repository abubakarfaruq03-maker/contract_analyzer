const LeftSide: React.FC = () => {
    return(
            <div className="w-full md:w-[60%] h-[50vh] md:h-full overflow-y-auto no-scrollbar bg-background p-4 md:p-12 border-b md:border-b-0 md:border-r border-border-line">
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 shadow-2xl p-6 md:p-16 border border-border-line rounded-sm min-h-[1500px]">
            <h1 className="text-2xl md:text-3xl font-serif mb-8 md:mb-12 text-slate-900 dark:text-slate-100 border-b pb-6 md:pb-8">
              Service Agreement
            </h1>
            
            <div className="space-y-8 md:space-y-12 text-slate-700 dark:text-slate-400 leading-relaxed font-serif text-base md:text-lg">
              <p>Section 1: Parties and Effective Date. This document outlines the legal obligations...</p>
              
              {/* Target for Jump - Added scroll-margin for the sticky header */}
              <div 
                id="term-clause" 
                className="p-6 md:p-8 bg-red-500/5 border-l-4 border-red-500 rounded-r-lg my-8 md:my-12 scroll-mt-20"
              >
                <p className="text-slate-900 dark:text-slate-100 font-bold italic text-sm md:text-base">
                  "Termination clause: Client may not terminate for any reason during the first 36 months of this agreement."
                </p>
              </div>

              <div className="h-64 flex items-center justify-center text-secondary-text/20 italic text-center">
                [End of Preview Section]
              </div>
            </div>
          </div>
        </div>
    )
} 
export default LeftSide;