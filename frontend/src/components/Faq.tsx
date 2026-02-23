import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { HelpCircle, Shield, FileText, Scale, Zap, ChevronDown, Mail} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: LucideIcon;
}


const faqs: FAQItem[] = [
  {
    icon: Scale,
    question: "Is Lex Intelligence a replacement for a lawyer?",
    answer: "No. Our tool is an AI-powered intelligence layer designed to summarize terms and highlight risks. It does not provide legal recommendations, draft binding documents, or offer representation. Always consult a qualified professional for final legal decisions.",
  },
  {
    icon: HelpCircle,
    question: "What exactly is the Contract Analyzer?",
    answer: "It is a sophisticated AI engine that parses complex legal documents, extracting key obligations, financial terms, and potential predatory clauses into a simplified, actionable dashboard.",
  },
  {
    icon: Zap,
    question: "Do I need legal knowledge to use this tool?",
    answer: "Not at all. The system is designed to translate 'legalese' into plain English, making it accessible for founders, freelancers, and business owners who aren't trained in law.",
  },
  {
    icon: FileText,
    question: "What specific insights does the analysis provide?",
    answer: "The analyzer identifies termination rights, renewal dates, payment penalties, non-compete scopes, and hidden liabilities that are often buried in fine print.",
  },
  {
    icon: Shield,
    question: "How secure is my sensitive data?",
    answer: "We use AES-256 bank-grade encryption. Your documents are processed in a secure environment and are never used to train public AI models. Data is deleted according to your plan's retention policy.",
  },
  {
    icon: FileText,
    question: "What file formats are supported?",
    answer: "Currently, we support PDF, DOCX, and TXT files. For best results with scanned documents, ensure the text is legible for our OCR engine.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-background py-24 transition-colors" id="faq">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        
        {/* Top Centered Icon */}
        <div className="mb-6 p-4 bg-primary/10 rounded-full text-primary">
          <HelpCircle size={32} strokeWidth={1.5} />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-main-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl">
            Everything you need to know about our contract analysis intelligence.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-border-line rounded-2xl bg-card/50 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <faq.icon className="text-primary shrink-0" size={20} />
                  <span className="font-bold text-main-text md:text-lg">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown 
                  className={`text-secondary-text transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} 
                  size={20} 
                />
              </button>

              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-secondary-text leading-relaxed border-t border-border-line/30">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/20 text-center w-full">
          <h3 className="text-xl font-bold text-main-text mb-2">Still have questions?</h3>
          <p className="text-secondary-text mb-6">We're here to help you navigate your legal intelligence.</p>
          <button className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
            <Mail size={18} />
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;