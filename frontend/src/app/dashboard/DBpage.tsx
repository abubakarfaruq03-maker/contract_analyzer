import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Bell, User, Plus, LogOut, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

import ThemeToggle from "../../components/Themetoggle";
import UploadSection from "./components/UploadSection";
import RecentFiles from "./components/RecentFiles";
import { useSync } from "../../hook/useSync";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { syncData } = useSync();
    
    const [userInitial, setUserInitial] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sync data and extract user initial
    useEffect(() => {
        syncData();
        const storedUser = localStorage.getItem("username") || localStorage.getItem("user");
        if (storedUser) {
            setUserInitial(storedUser.charAt(0).toUpperCase());
        }
    }, [syncData]);

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Signed out successfully");
        navigate("/login");
    };

    const handleFileAccepted = (file: File) => {
        navigate("/analyze", { state: { file } });
    };

    return (
        <div className="min-h-screen bg-background transition-colors">
            {/* Navbar */}
            <nav className="border-b border-border-line bg-card/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <Shield className="text-primary w-6 h-6" />
                        <span className="font-bold text-main-text tracking-tighter text-xl">LEX</span>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6">
                        <ThemeToggle />
                        <button className="text-secondary-text hover:text-main-text transition-colors">
                            <Bell size={20} />
                        </button>
                        
                        <div className="relative" ref={menuRef}>
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-secondary-text/10 transition-all border border-transparent hover:border-border-line"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
                                    {userInitial || <User size={16} />}
                                </div>
                                <ChevronDown size={14} className={`text-secondary-text transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-card border border-border-line rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in duration-150">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors font-bold"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto p-6 md:p-10">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-main-text">Contract Analyzer</h1>
                        <p className="text-secondary-text mt-1">AI-powered audits for your legal documents.</p>
                    </div>
                    <button 
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus size={20} />
                        New Analysis
                    </button>
                </div>

                <UploadSection onFileAccepted={handleFileAccepted} />

                <div className="mt-12">
                    <h2 className="text-xl font-black mb-6 text-main-text">Recent Documents</h2>
                    <RecentFiles />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;