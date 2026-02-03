import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import RegistrationModal from "./RegistrationModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="1ROLLO" className="h-10 w-auto" />
            <span className="hidden sm:block text-muted-foreground text-sm">
              Your Intelligent Robot Security Guard
            </span>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            Get Early Access
          </Button>
        </div>
      </header>

      <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default Header;
