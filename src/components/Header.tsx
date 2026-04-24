import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const RegistrationModal = lazy(() => import("./RegistrationModal"));

const nav = [
  { label: "Home", to: "/" },
  { label: "Product", to: "/product" },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Career", to: "/career" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOpenAccess = () => {
      setMobileMenuOpen(false);
      setIsModalOpen(true);
    };

    window.addEventListener("rollo:open-access", onOpenAccess as EventListener);
    return () => {
      window.removeEventListener("rollo:open-access", onOpenAccess as EventListener);
    };
  }, []);

  const onNavClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            ? "bg-[#050505]/90 border-b border-white/[0.10]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="focus:outline-none transition-transform active:scale-95 flex items-center p-0 m-0"
              aria-label="Home"
            >
              <img src={logo} alt="ROLLO" className="h-10 w-auto block" />
            </Link>

            <span className="hidden sm:block text-slate-500 text-[10px] tracking-[0.2em] uppercase select-none border-l border-white/[0.08] pl-3">
              Autonomous Security Robotics
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((i) => {
              const isActive = location.pathname === i.to;
              return (
                <Link
                  key={i.to}
                  to={i.to}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "text-sm transition relative",
                    isActive
                      ? "text-white"
                      : "text-white hover:text-white/80",
                  ].join(" ")}
                >
                  {i.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#B4FF33]/60 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 text-white" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-[#050505] border-white/[0.06] text-white"
              >
                <SheetHeader>
                  <SheetTitle className="text-white">ROLLO</SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-3">
                  {nav.map((i) => {
                    const isActive = location.pathname === i.to;
                    return (
                      <Link
                        key={i.to}
                        to={i.to}
                        onClick={onNavClick}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "rounded-lg px-3 py-3 border transition",
                          isActive
                            ? "bg-white/[0.07] border-[#B4FF33]/25 text-white"
                            : "bg-white/[0.03] border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.06]",
                        ].join(" ")}
                      >
                        {i.label}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <Suspense fallback={null}>
          <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </Suspense>
      )}
    </>
  );
};

export default Header;
