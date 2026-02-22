import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "../../components/Features";
import Pricing from "../../components/Pricing";
import FAQ from "../../components/Faq";
import Footer from "../../components/Footer";
export default function Home() {
  return (
        
        <div className="min-h-screen w-full bg-background bg-[url('/images/bg.png')]  bg-no-repeat">
            <Navbar />
            
            
            <div className="relative z-10">
                <Hero />
                <Features />
                <Pricing />
                <FAQ />
                <Footer />  
            </div>
        </div>
    );
}