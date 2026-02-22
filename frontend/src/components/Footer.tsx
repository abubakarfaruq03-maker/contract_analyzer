import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border-line py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="text-sm text-secondary-text">
          Contract Analyzer, {new Date().getFullYear()}. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a href="#" className="text-sm text-secondary-text hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-secondary-text hover:text-primary transition-colors">
            Privacy
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;