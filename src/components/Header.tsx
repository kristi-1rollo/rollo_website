import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import RegistrationModal from "./RegistrationModal";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const nav = [
  { label: "Why", href: "#why" },
  { label: "RaaS", href: "#raas" },
  { label: "Specs", href: "#specs" },
  { label: "Applications", href: "#applications" },
];

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onNavClick = () => {
    setMobileMenuOpen(false);
  };

  const openAccessModal = () => {
    setMobileMenuOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "supports-[backdrop-filter]:backdrop-blur-xl",
          "transition-colors duration-200",
          scrolled
            ? "bg-[#0B0F14]/65 border-b border-white/10"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container-premium h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={scrollToTop}
              className="focus:outline-none transition-transform active:scale-95 flex items-center p-0 m-0 border-none bg-transparent"
              aria-label="Back to top"
              type="button"
            >
              <img src={logo} alt="ROLLO" className="h-10 w-auto block" />
            </button>

            <span className="hidden sm:block text-white/50 text-xs tracking-widest uppercase select-none border-l border-white/10 pl-3">
              Autonomous Security Robotics
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="text-white/70 hover:text-white transition text-sm"
              >
                {i.label}
              </a>
            ))}

            <Button
              onClick={openAccessModal}
              className="bg-[#99FF00] text-black hover:bg-[#99FF00]/90 h-9 px-4 rounded-md font-bold uppercase tracking-tight"
            >
              Get Rollo Access
            </Button>
          </nav>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={openAccessModal}
              className="bg-[#99FF00] text-black hover:bg-[#99FF00]/90 h-10 px-3 rounded-md font-semibold tracking-tight"
            >
              Get Access
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-white/15 bg-white/[0.03] hover:bg-white/[0.06]"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 text-white" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-[#0B0F14] border-white/10 text-white"
              >
                <SheetHeader>
                  <SheetTitle className="text-white">ROLLO</SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-3">
                  {nav.map((i) => (
                    <a
                      key={i.href}
                      href={i.href}
                      onClick={onNavClick}
                      className="rounded-lg px-3 py-3 bg-white/[0.03] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.06] transition"
                    >
                      {i.label}
                    </a>
                  ))}

                  <Button
                    onClick={openAccessModal}
                    className="mt-4 bg-[#99FF00] text-black hover:bg-[#99FF00]/90 h-11 rounded-md font-bold uppercase tracking-tight"
                  >
                    Get Rollo Access
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default Header;
