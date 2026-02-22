import React from "react";
import { 
  ShieldAlert, 
  FileSearch, 
  Zap, 
  Scale, 
  TrendingUp, 
  DollarSign,
}
 from "lucide-react";
import type { LucideIcon } from "lucide-react";

// 2. Define exactly what a Feature looks like
interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Holistic Audit",
    description: "Execute a deep-scan of your entire agreement to generate a high-level executive summary.",
    icon: FileSearch,
  },
  {
    title: "Terminology Decipher",
    description: "Translate dense legalese into actionable insights. Understand your rights in plain English.",
    icon: Scale,
  },
  {
    title: "Risk & Exposure",
    description: "Identify predatory clauses and hidden liabilities before they become expensive mistakes.",
    icon: ShieldAlert,
  },
  {
    title: "Strategic Highlights",
    description: "Prioritize your attention on the 20% of clauses that carry 80% of the contract's impact.",
    icon: Zap,
  },
  {
    title: "Optimized Provisions",
    description: "Receive AI-driven alternatives to strengthen your bargaining position and protective terms.",
    icon: TrendingUp,
  },
  {
    title: "Financial Integrity",
    description: "Validate payment schedules, penalties, and fiscal obligations to protect your bottom line.",
    icon: DollarSign,
  },
];

// 3. Modern React practice: Define props interface (even if empty)
interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  return (
    <section className="bg-background py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
        
        <div className="max-w-3xl mb-16 flex flex-col text-center items-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
            The Lex Intelligence Suite
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-main-text leading-[1.1]">
            Precision analysis. <br /> Absolute clarity.
          </h2>
          <p className="mt-6 text-secondary-text text-lg max-w-xl">
            Our AI doesn't just read contracts; it understands the legal implications for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ title, description, icon: Icon }, index) => (
            <div
              key={title}
              className="group p-8 rounded-3xl border border-border-line bg-card transition-all duration-500 hover:scale-[1.02] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-main-text mb-3 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-secondary-text leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-8 h-[2px] w-8 bg-border-line group-hover:w-full group-hover:bg-primary transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;