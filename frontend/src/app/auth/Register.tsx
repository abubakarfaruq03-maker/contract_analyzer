import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), 
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Account created successfully. Please sign in.");
        navigate("/login");
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (err) {
      toast.error("Handshake failed. The security server is unreachable.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 font-sans text-main-text">
      {/* Brand Identity */}
      <div className="mb-8 text-center space-y-2">
        <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-2">
          <Shield className="text-primary w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter italic uppercase">LexiGuard</h1>
        <p className="text-secondary-text text-[10px] font-bold uppercase tracking-[0.3em]">Request Auditor Access</p>
      </div>

      <form 
        onSubmit={handleRegister} 
        className="bg-card p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm border border-border-line"
      >
        <div className="space-y-4">
          {/* Username Input */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text group-focus-within:text-primary w-4 h-4 transition-colors" />
            <input 
              required
              type="text" 
              placeholder="Full Name / Username" 
              className="w-full bg-background p-4 pl-12 rounded-2xl border border-border-line focus:outline-none focus:border-primary transition-all text-sm"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text group-focus-within:text-primary w-4 h-4 transition-colors" />
            <input 
              required
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-background p-4 pl-12 rounded-2xl border border-border-line focus:outline-none focus:border-primary transition-all text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text group-focus-within:text-primary w-4 h-4 transition-colors" />
            <input 
              required
              type="password" 
              placeholder="Secure Password" 
              className="w-full bg-background p-4 pl-12 rounded-2xl border border-border-line focus:outline-none focus:border-primary transition-all text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-2xl uppercase text-xs font-black tracking-[0.2em] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Register Auditor <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </div>

        <div className="mt-8 text-center border-t border-border-line pt-6">
          <p className="text-secondary-text text-[11px] font-medium">Already have access?</p>
          <Link 
            to="/login" 
            className="text-primary font-black uppercase text-[11px] tracking-widest hover:underline mt-2 block"
          >
            Return to Vault
          </Link>
        </div>
      </form>

      {/* Trust Badges */}
      <div className="mt-8 grid grid-cols-2 gap-4 opacity-50">
        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-tighter text-secondary-text">
          <CheckCircle2 size={10} className="text-primary" /> End-to-End Encryption
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-tighter text-secondary-text">
          <CheckCircle2 size={10} className="text-primary" /> AI Data Isolation
        </div>
      </div>
    </div>
  );
}