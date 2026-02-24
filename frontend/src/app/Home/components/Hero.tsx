import TrustElement from "../../../components/Trustelement";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Next-Gen Legal Intelligence
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-main-text mb-6">
            Stop reading fine print. <br />
            <span className="text-primary">Start making moves.</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary-text mb-10 max-w-2xl leading-relaxed">
            Empower your decision-making with Lex Luthor. Our AI-powered contract analyzer 
            extracts risks, summarizes clauses, and protects your interests in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 ">
            <Link to="/login">
            <button className="px-8 py-2 bg-main-text text-white dark:text-background rounded-full font-bold text-lg hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-primary/25">
              Start analyzing
            </button>
            </Link>

            
          <a href="#faq">
              <button className="px-8 py-2 bg-transparent border border-border-line text-main-text rounded-full font-bold text-lg hover:bg-input-bg transition-all">
              Learn more
            </button>
          </a>
          </div>

          <TrustElement />

        </div>
      </div>
    </section>
  );
}