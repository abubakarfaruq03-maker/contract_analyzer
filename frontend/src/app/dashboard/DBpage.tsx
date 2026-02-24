import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Bell, User, Plus, LogOut } from "lucide-react";
import ThemeToggle from "../../components/Themetoggle";
import UploadSection from "./components/UploadSection";
import RecentFiles from "./components/RecentFiles";
import { useSync } from "../../hook/useSync";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { syncData } = useSync();
    const [userInitial, setUserInitial] = useState<string | null>(null);

    useEffect(() => {
        syncData();
        
        // Retrieve username or user object
        const storedUser = localStorage.getItem("username") || localStorage.getItem("user");
        if (storedUser) {
            setUserInitial(storedUser.charAt(0).toUpperCase());
        }
    }, [syncData]);

    const handleLogout = () => {
        // 1. Clear authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("user");

        // 2. Redirect to login or home
        navigate("/login");
    };

    const handleFileAccepted = (file: File) => {
        navigate("/analyze", { state: { file } });
    };

    return (
        <div className="min-h-screen bg-background transition-colors">
            <nav className="border-b border-border-line bg-card/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <Shield className="text-primary w-6 h-6" />
                        <span className="font-bold text-main-text tracking-tighter text-xl">LEX</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <ThemeToggle />
                        
                        <button className="text-secondary-text hover:text-main-text transition-colors">
                            <Bell size={20} />
                        </button>
                        
                        {/* Logout Button Avatar */}
                        <button 
                            onClick={handleLogout}
                            title="Sign Out"
                            className="group relative h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white border-2 border-border-line shadow-sm hover:scale-105 transition-all"
                        >
                            {/* Shows Initial by default */}
                            <span className="text-sm font-black group-hover:hidden">
                                {userInitial || <User size={18} />}
                            </span>
                            
                            {/* Shows Logout Icon on Hover */}
                            <LogOut size={16} className="hidden group-hover:block" />
                            
                            {/* Tooltip */}
                            <span className="absolute -bottom-10 right-0 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-[10px] py-1 px-2 rounded font-bold">
                                SIGN OUT
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-6 md:p-10">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-main-text">Legal Intelligence</h1>
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