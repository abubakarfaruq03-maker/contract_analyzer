import ThemeToggle from "../../../components/Themetoggle";
export default function Navbar() {
    return (
        <nav className=" text-secondary-text p-6  flex justify-between items-center">
            <div className="flex justify-center items-center space-x-4">
                <h1 className="font-bold text-xl ">Lex Luthor</h1>
                <img src="/images/logo_ai.png" alt="Logo" className="w-10" />
            </div>
            <div className="space-x-4">
                <a href="#" className="hover:underline">Features</a>
                <a href="#" className="hover:underline">Blog</a>
                <a href="#" className="hover:underline">FAQ</a>
            </div>
            <div className="flex justify-center items-center space-x-4 cursor">
                <button className="px-8 py-2 rounded-full border transition-all duration-300
  border-border-line text-main-text bg-background
  hover:border-primary hover:text-primary ">Get Started</button>
                <ThemeToggle />

            </div>
        </nav>
    );
}