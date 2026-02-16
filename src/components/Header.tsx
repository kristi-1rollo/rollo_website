import { useState } from "react";
import logo from "@/assets/logo.png";
import RegistrationModal from "./RegistrationModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            {/* LOGO - TASTATUD SUURUS JA KLIKITAVUS */}
            <button 
              onClick={scrollToTop}
              className="focus:outline-none transition-transform active:scale-95 flex items-center p-0 m-0 border-none bg-transparent"
            >
              <img 
                src={logo} 
                alt="ROLLO" 
                className="h-12 w-auto block" 
              />
            </button>

            {/* SLOOGAN - PUHAS JA STAATILINE */}
            <span className="hidden sm:block text-white/50 text-sm tracking-widest uppercase select-none border-l border-white/10 pl-4">
              Autonomous Security Robotics
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#99FF00] text-black font-bold uppercase tracking-tighter px-6 py-2 hover:bg-white transition-all duration-300 border border-[#99FF00] text-sm"
          >
            Get Rollo Access
          </button>
        </div>
      </header>

      <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default Header;