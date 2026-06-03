import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Product = lazy(() => import("./pages/Product"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Career = lazy(() => import("./pages/Career"));
const CareerNew = lazy(() => import("./pages/CareerNew"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const EuFunding = lazy(() => import("./pages/EuFunding"));
const SetPassword = lazy(() => import("./pages/SetPassword"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Global UI */}
      <Toaster />

      {/* Global page wrapper */}
      <div className="min-h-screen text-white antialiased">
        {/* Film grain texture — anodized aluminum depth */}
        <div className="film-grain" />

        <div className="relative">
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/career" element={<Career />} />
                  <Route path="/career-new" element={<CareerNew />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/funding" element={<EuFunding />} />
                  <Route path="/eu-kaasrahastus" element={<EuFunding />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/set-password" element={<SetPassword />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/blog" element={<Admin />} />
                  <Route path="/unsubscribe" element={<Unsubscribe />} />
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
