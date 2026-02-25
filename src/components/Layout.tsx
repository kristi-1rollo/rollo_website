import { lazy, Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ChevronUp } from "lucide-react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

const Layout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <div className="min-h-screen text-foreground">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />

        {/* Scroll to top button - mobile only */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="md:hidden fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        )}
      </div>
    </Suspense>
  );
};

export default Layout;
