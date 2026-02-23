import ThemeToggle from "../../../components/Themetoggle";
import { Shield } from "lucide-react";
export default function Navbar() {
    return (
        <nav className=" text-secondary-text p-6  flex justify-between items-center gap-6">
            <div className="flex justify-center items-center space-x-4">
                <h1 className="font-bold text-xl hidden sm:flex">Lex </h1>
            <Shield className="text-primary w-8 h-8" />
            </div>
            <div className="space-x-4">
                <a href="#features" className="hover:underline">Features</a>
                <a href="#" className="hover:underline">Blog</a>
                <a href="#faq" className="hover:underline">FAQ</a>
            </div>
            <div className="flex justify-center items-center space-x-4 cursor">
                <button className="px-8 py-2 rounded-full border transition-all duration-300
  border-border-line text-main-text bg-background
  hover:border-primary hover:text-primary text-xs sm:text-xl hidden sm:flex ">Get Started</button>
  <button className="px-6 py-0 rounded-full border transition-all duration-300
  border-border-line text-main-text bg-background
  hover:border-primary hover:text-primary text-sm sm:hidden  flex">Sign in</button>
                <ThemeToggle />

            </div>
        </nav>
    );
}