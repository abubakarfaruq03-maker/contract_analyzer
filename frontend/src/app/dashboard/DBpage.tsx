import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Bell, User, Plus } from "lucide-react";
import ThemeToggle from "../../components/Themetoggle";
import UploadSection from "./components/UploadSection";
import RecentFiles from "./components/RecentFiles";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    // Triggered when a file is dropped or selected
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
                        <div className="h-8 w-8 rounded-full bg-linear-to-tr from-primary to-blue-600 flex items-center justify-center text-white border-2 border-border-line">
                            <User size={18} />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-6 md:p-10">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-main-text">Legal Intelligence</h1>
                        <p className="text-secondary-text mt-1">Deploy analysis on your local documents.</p>
                    </div>
                    {/* Triggering a manual click on the hidden input in UploadSection is a common pattern */}
                    <button 
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus size={20} />
                        New Analysis
                    </button>
                </div>

                <UploadSection onFileAccepted={handleFileAccepted} />
                <RecentFiles />
            </main>
        </div>
    );
};

export default Dashboard;