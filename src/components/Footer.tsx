import { Linkedin, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-white/[0.02]">
      <div className="container-premium py-8 md:py-10 space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <div className="space-y-5 text-left">
            <div className="space-y-3">
              <Link
                to="/"
                aria-label="Go to homepage"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex"
              >
                <img
                  src="/logos/rollo_logo_white.png"
                  alt="Rollo Robotics"
                  className="h-7 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
              <p className="text-sm text-slate-300 font-medium">
                Rollo Robotics O&Uuml;
                <span className="text-slate-500 ml-1.5 text-xs">(17320003)</span>
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Viljandi maakond, Viljandi linn,
                <br />
                Raua tn 16, 71020
              </p>
              <a
                href="mailto:info@1rollo.com"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:info@1rollo.com";
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-[hsl(82,100%,60%)] hover:text-[hsl(82,100%,72%)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                info@1rollo.com
              </a>
            </div>

            <div className="space-y-2">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                Quick Links
              </h3>
              <nav className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm">
                <Link className="inline-flex min-h-[44px] items-center py-2 text-slate-300 hover:text-white transition-colors" to="/product">
                  Product
                </Link>
                <Link className="inline-flex min-h-[44px] items-center py-2 text-slate-300 hover:text-white transition-colors" to="/blog">
                  Blog
                </Link>
                <Link className="inline-flex min-h-[44px] items-center py-2 text-slate-300 hover:text-white transition-colors" to="/about">
                  About
                </Link>
                <Link className="inline-flex min-h-[44px] items-center py-2 text-slate-300 hover:text-white transition-colors" to="/funding">
                  Funding
                </Link>
                <a
                  className="inline-flex min-h-[44px] items-center py-2 text-slate-300 hover:text-white transition-colors"
                  href="/about#contact"
                >
                  Contact
                </a>
              </nav>
            </div>

            <div className="space-y-2">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                Follow
              </h3>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/company/rollo-robotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Rollo Robotics on LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-slate-300 hover:bg-white/5 hover:text-[hsl(82,100%,60%)] transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.youtube.com/@RolloRobotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch Rollo Robotics on YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-slate-300 hover:bg-white/5 hover:text-[hsl(82,100%,60%)] transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <div className="space-y-3 text-left">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
              Supported by
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/funding"
                aria-label="Open funding information page"
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <img
                  src="/logos/nextgen_rahastanud_el_nextgeneration_eng_hor_color.jpg"
                  alt="Funded by the European Union - NextGenerationEU"
                  className="h-12 w-full object-contain"
                />
              </Link>
              <Link
                to="/funding"
                aria-label="Open funding information page"
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <img
                  src="/logos/edia-eas.png"
                  alt="Estonian Defence and Aerospace Industry Association"
                  className="h-12 w-full object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] bg-black/20">
        <div className="container-premium py-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-medium">
              &copy; {new Date().getFullYear()} Rollo Robotics O&Uuml;
            </span>
            <a
              href="#"
              className="text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition-colors font-medium"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition-colors font-medium"
            >
              Terms
            </a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
