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

  // Scroll spy active section
  const [activeHref, setActiveHref] = useState<string>("#why");

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

  // Active section highlighting (IntersectionObserver)
  useEffect(() => {
    const hrefs = nav.map((n) => n.href);
    const nodes = hrefs
      .map((h) => document.getElementById(h.slice(1)))
      .filter(Boolean) as HTMLElement[];

    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        root: null,
        // tuned for fixed header + reading zone
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.12, 0.2, 0.35],
      }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
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
            ? "bg-[#050505]/75 border-b border-white/[0.06]"
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

            <span className="hidden sm:block text-slate-500 text-[10px] tracking-[0.2em] uppercase select-none border-l border-white/[0.08] pl-3">
              Autonomous Security Robotics
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                aria-current={activeHref === i.href ? "page" : undefined}
                className={[
                  "text-sm transition relative",
                  activeHref === i.href
                    ? "text-white"
                    : "text-slate-400 hover:text-white",
                ].join(" ")}
              >
                {i.label}
                {activeHref === i.href && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#B4FF33]/60 rounded-full" />
                )}
              </a>
            ))}

            <Button
              onClick={openAccessModal}
              className="bg-[#B4FF33] text-black hover:bg-[#B4FF33]/90 h-9 px-4 rounded-[4px] font-bold uppercase tracking-tight"
            >
              Get Rollo Access
            </Button>
          </nav>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={openAccessModal}
              className="bg-[#B4FF33] text-black hover:bg-[#B4FF33]/90 h-10 px-3 rounded-[4px] font-semibold tracking-tight"
            >
              Get Access
            </Button>

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
                  {nav.map((i) => (
                    <a
                      key={i.href}
                      href={i.href}
                      onClick={onNavClick}
                      aria-current={activeHref === i.href ? "page" : undefined}
                      className={[
                        "rounded-lg px-3 py-3 border transition",
                        activeHref === i.href
                          ? "bg-white/[0.07] border-[#B4FF33]/25 text-white"
                          : "bg-white/[0.03] border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      {i.label}
                    </a>
                  ))}

                  <Button
                    onClick={openAccessModal}
                    className="mt-4 bg-[#B4FF33] text-black hover:bg-[#B4FF33]/90 h-11 rounded-[4px] font-bold uppercase tracking-tight"
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
