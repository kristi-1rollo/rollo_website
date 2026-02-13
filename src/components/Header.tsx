import { useState } from "react";

import logo from "@/assets/logo.png";
import RegistrationModal from "./RegistrationModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="1ROLLO" className="h-10 w-auto" />
            <span className="hidden sm:block text-muted-foreground text-sm">
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
