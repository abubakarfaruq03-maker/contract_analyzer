import React from "react";
import { Check, Zap, ShieldCheck, Landmark } from "lucide-react";

type PricingTier = {
  name: string;
  price: string;
  credits: string;
  description: string;
  icon: React.ElementType;
  featured?: boolean;
  features: string[];
  cta: string;
};

const tiers: PricingTier[] = [
  {
    name: "Tactical",
    price: "$2",
    credits: "1 Analysis Credit",
    description: "Ideal for a quick audit of a single agreement.",
    icon: Zap,
    features: [
      "Full Risk Red-Flagging",
      "Plain-English Summary",
      "Financial Term Validation",
      "24-hour Data Retention",
    ],
    cta: "Buy 1 Credit",
  },
  {
    name: "Professional",
    price: "$6",
    credits: "4 Analysis Credits",
    description: "Strategic volume for active negotiations.",
    icon: ShieldCheck,
    featured: true,
    features: [
      "Everything in Tactical",
      "Priority AI Queueing",
      "Multi-Doc Comparison",
      "30-day Document Vault",
      "Export to PDF/Docx",
    ],
    cta: "Secure 4 Credits",
  },
  {
    name: "Enterprise",
    price: "$12",
    credits: "10 Analysis Credits",
    description: "Maximum oversight for complex deal flows.",
    icon: Landmark,
    features: [
      "Everything in Professional",
      "Bulk Upload Processing",
      "Custom Risk Parameters",
      "Permanent Secure Storage",
      "Concierge Support",
    ],
    cta: "Secure 10 Credits",
  },
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="bg-background py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
            Pay-Per-Intelligence
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-main-text mt-2">
            No subscriptions. <br className="hidden md:block"/> Just pure analysis.
          </h2>
          <p className="text-secondary-text mt-4 max-w-xl mx-auto">
            Choose the volume of intelligence you require. Credits never expire 
            and can be deployed across any legal document instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                relative flex flex-col p-8 rounded-3xl border transition-all duration-500
                ${tier.featured 
                  ? "bg-card border-primary shadow-2xl shadow-primary/10 scale-105 z-10" 
                  : "bg-card/50 border-border-line hover:border-primary/40"
                }
              `}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] uppercase tracking-widest font-bold py-1 px-4 rounded-full">
                  Best Value
                </div>
              )}

              <div className="mb-8">
                <tier.icon className={`w-10 h-10 mb-4 ${tier.featured ? "text-primary" : "text-secondary-text"}`} />
                <h3 className="text-2xl font-bold text-main-text">{tier.name}</h3>
                <p className="text-sm text-secondary-text mt-1">{tier.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-main-text">{tier.price}</span>
                  <span className="text-secondary-text font-medium">USD</span>
                </div>
                <p className="text-primary font-bold mt-2 text-lg">{tier.credits}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-secondary-text">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`
                  w-full py-4 rounded-xl font-bold transition-all duration-300
                  ${tier.featured 
                    ? "bg-primary text-white hover:opacity-90 hover:scale-[1.02]" 
                    : "bg-main-text text-background hover:bg-primary hover:text-white"
                  }
                `}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-secondary-text opacity-50">
          All transactions are secured via bank-grade encryption. <br/>
          Need more than 50 credits? Contact our corporate desk.
        </p>
      </div>
    </section>
  );
};

export default Pricing;