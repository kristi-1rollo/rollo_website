import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

const Layout = () => (
  <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
    <div className="min-h-screen text-foreground">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </Suspense>
);

export default Layout;
