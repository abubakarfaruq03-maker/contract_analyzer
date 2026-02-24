import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import type { AuthResponse } from './types/auth';
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), 
      });
      
      const data: AuthResponse = await res.json();
      
      if (res.ok && data.token) {
        // Professional LexiGuard Toast
        toast.custom((t) => (
          <div className={`${
            t.visible ? 'animate-in fade-in zoom-in' : 'animate-out fade-out zoom-out'
          } max-w-md w-full bg-card shadow-2xl rounded-2xl pointer-events-auto flex border border-primary/20 overflow-hidden duration-300`}>
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-primary bg-primary/10 p-2 rounded-lg">
                  <Shield size={20} />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-black text-main-text uppercase tracking-wider">Access Granted</p>
                  <p className="text-[10px] text-secondary-text font-medium uppercase">
                    Welcome back, {data.user.username}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ), { duration: 3000 });

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); 
        
        navigate(from, { replace: true });
      } else {
        toast.error(data.error || "Authentication failed");
      }
    } catch (err) {
      toast.error("Security handshake failed. Check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 font-sans text-main-text">
      {/* Branding */}
      <div className="mb-8 text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-2">
          <Shield className="text-primary w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter italic">LEXGUARD</h1>
        <p className="text-secondary-text text-[10px] font-bold uppercase tracking-[0.3em]">Contract Analyzer</p>
      </div>

      <form 
        onSubmit={handleLogin} 
        className="bg-card p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm border border-border-line animate-in fade-in zoom-in-95 duration-500"
      >
        <div className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text group-focus-within:text-primary w-4 h-4 transition-colors" />
            <input 
              required
              type="email" 
              autoComplete="email"
              placeholder="Email Address" 
              className="w-full bg-background p-4 pl-12 rounded-2xl border border-border-line focus:outline-none focus:border-primary transition-all text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text group-focus-within:text-primary w-4 h-4 transition-colors" />
            <input 
              required
              type="password" 
              autoComplete="current-password"
              placeholder="Password" 
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
              <>Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </div>

        <div className="mt-8 text-center border-t border-border-line pt-6">
          <p className="text-secondary-text text-[11px] font-medium">Your First Time?</p>
          <Link 
            to="/register" 
            className="text-primary font-black uppercase text-[11px] tracking-widest hover:underline mt-2 block"
          >
            Create New Account
          </Link>
        </div>
      </form>

      <div className="mt-8 flex items-center gap-2 opacity-40">
        <p className="text-[10px] text-secondary-text font-bold uppercase tracking-widest">
          System Status: Secured
        </p>
        <Zap size={10} className="text-primary animate-pulse" />
      </div>
    </div>
  );
}