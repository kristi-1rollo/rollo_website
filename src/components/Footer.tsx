import { Linkedin, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent">
      {/* MAIN FOOTER */}
      <div className="container-premium py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 text-left">

          {/* Contact - spans 5 columns on desktop */}
          <div className="space-y-4 md:col-span-5">
            <Link
              to="/"
              aria-label="Go to homepage"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex"
            >
              <img
                src="/logos/rollo_logo_white.png"
                alt="Rollo Robotics"
                className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="space-y-2.5 max-w-sm">
              <p className="text-[15px] text-slate-200 font-medium tracking-tight">
                Rollo Robotics OÜ
              </p>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                Viljandi maakond, Viljandi linn,<br />
                Raua tn 16, 71020
              </p>
              <p className="text-xs text-slate-500">Registry code: 17320003</p>
              <a
                href="mailto:info@1rollo.com"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:info@1rollo.com";
                }}
                className="inline-flex min-h-[44px] md:min-h-0 items-center gap-2 text-[15px] font-medium text-[hsl(82,100%,60%)] hover:text-[hsl(82,100%,70%)] transition-colors mt-1"
              >
                <Mail className="w-4 h-4" />
                info@1rollo.com
              </a>
            </div>
          </div>

          {/* Quick links - spans 3 columns */}
          <div className="space-y-4 md:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
              Quick Links
            </h3>
            <nav className="space-y-2.5 text-[15px]">
              <Link
                className="flex min-h-[44px] md:min-h-0 items-center text-slate-300 hover:text-white hover:translate-x-0.5 transition-all"
                to="/product"
              >
                Product
              </Link>
              <Link
                className="flex min-h-[44px] md:min-h-0 items-center text-slate-300 hover:text-white hover:translate-x-0.5 transition-all"
                to="/blog"
              >
                Blog
              </Link>
              <Link
                className="flex min-h-[44px] md:min-h-0 items-center text-slate-300 hover:text-white hover:translate-x-0.5 transition-all"
                to="/about"
              >
                About Us
              </Link>
              <Link
                className="flex min-h-[44px] md:min-h-0 items-center text-slate-300 hover:text-white hover:translate-x-0.5 transition-all"
                to="/contact"
              >
                Contact
              </Link>
              <Link
                className="flex min-h-[44px] md:min-h-0 items-center text-slate-300 hover:text-white hover:translate-x-0.5 transition-all"
                to="/contact#career"
              >
                Career
              </Link>
            </nav>
          </div>

          {/* Social & Trust signals - spans 4 columns */}
          <div className="space-y-6 md:col-span-4">
            <div className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
                Follow Us
              </h3>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/company/rollo-robotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Rollo Robotics on LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(82,100%,60%)]/20 text-[hsl(82,100%,60%)] hover:bg-[hsl(82,100%,60%)]/10 hover:border-[hsl(82,100%,60%)]/40 transition-all duration-200"
                >
                  <Linkedin className="h-[19px] w-[19px]" />
                </a>
                <a
                  href="https://www.youtube.com/@RolloRobotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch Rollo Robotics on YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(82,100%,60%)]/20 text-[hsl(82,100%,60%)] hover:bg-[hsl(82,100%,60%)]/10 hover:border-[hsl(82,100%,60%)]/40 transition-all duration-200"
                >
                  <Youtube className="h-[19px] w-[19px]" />
                </a>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
                Supported by
              </h3>
              <div className="space-y-3">
                <div className="block">
                  <img
                    src="/logos/nextgen_rahastanud_el_nextgeneration_eng_hor_color.jpg"
                    alt="Funded by the European Union - NextGenerationEU"
                    className="h-11 w-auto object-contain opacity-85"
                  />
                </div>
                <a
                  href="https://defence.ee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Estonian Defence and Aerospace Industry Association"
                  className="block group"
                >
                  <img
                    src="/logos/edia-eas.png"
                    alt="Estonian Defence and Aerospace Industry Association"
                    className="h-11 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SUBFOOTER - minimal */}
      <div className="border-t border-white/[0.05]">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-left">
            <p className="text-xs text-slate-600 tracking-wide">
              © {new Date().getFullYear()} Rollo Robotics OÜ. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors tracking-wide"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors tracking-wide"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
