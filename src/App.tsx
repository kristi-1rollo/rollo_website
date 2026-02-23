import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Product = lazy(() => import("./pages/Product"));
const Blog = lazy(() => import("./pages/Blog"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Global UI */}
      <Toaster />
      <Sonner />

      {/* Global page wrapper */}
      <div className="min-h-screen text-white antialiased">
        {/* Film grain texture — anodized aluminum depth */}
        <div className="film-grain" />

        <div className="relative">
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/about" element={<AboutUs />} />
                </Route>
                {/* Catch-all 404 outside layout */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
