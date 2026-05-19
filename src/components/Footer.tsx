import { Linkedin, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-20 section-glow-top bg-[#050912] bg-gradient-to-b from-white/[0.02] to-transparent">
      {/* MAIN FOOTER */}
      <div className="container-premium py-12 md:py-16 px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 text-center md:text-left items-center md:items-start">

          {/* Contact */}
          <div className="space-y-3 md:space-y-4 md:max-w-[280px]">
            <Link
              to="/"
              aria-label="Go to homepage"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex mx-auto md:mx-0"
            >
              <img
                src="/logos/rollo-logo-white.png"
                alt="Rollo Robotics"
                className="h-9 md:h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </Link>
            <div className="space-y-2.5 max-w-sm mx-auto md:mx-0">
              <p className="hidden md:block text-[15px] text-slate-200 font-medium tracking-tight">
                Rollo Robotics OÜ
              </p>
              <p className="hidden md:block text-[13px] text-slate-400 leading-relaxed">
                Raua 16, Viljandi<br />
                Estonia
              </p>
              <p className="hidden md:block text-xs text-slate-400">Registry code: 17320003</p>
              <a
                href="mailto:info@1rollo.com"
                className="inline-flex items-center justify-center md:justify-start gap-2 text-[15px] font-medium text-[hsl(82,100%,60%)] hover:text-[hsl(82,100%,70%)] transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@1rollo.com
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-slate-400/80 font-semibold">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-[18px] md:gap-y-2.5 text-[15px] items-center md:items-start">
              <Link
                className="text-slate-300 hover:text-white md:hover:translate-x-0.5 transition-all"
                to="/product"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Product
              </Link>
              <Link
                className="text-slate-300 hover:text-white md:hover:translate-x-0.5 transition-all"
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                About Us
              </Link>
              <Link
                className="text-slate-300 hover:text-white md:hover:translate-x-0.5 transition-all"
                to="/blog"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Blog
              </Link>
              <Link
                className="text-slate-300 hover:text-white md:hover:translate-x-0.5 transition-all"
                to="/career"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Career
              </Link>
              <Link
                className="text-slate-300 hover:text-white md:hover:translate-x-0.5 transition-all"
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social & Trust signals */}
          <div className="flex flex-col items-center gap-10 w-full md:w-auto md:items-stretch md:gap-0 md:space-y-6 md:text-right">
            <div className="space-y-4 md:space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-slate-400/80 font-semibold">
                Follow Us
              </h3>
              <div className="flex items-center gap-4 md:gap-2.5 justify-center md:justify-end">
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

            <div className="space-y-4 md:space-y-3 md:pt-2">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-slate-400/80 font-semibold">
                Supported by
              </h3>
              <div className="flex flex-col items-center md:items-end gap-5 md:gap-3">
                <Link to="/funding" className="block group">
                  <img
                    src="/logos/nextgeneration-eu-funded.jpg"
                    alt="Funded by the European Union - NextGenerationEU"
                    className="h-11 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </Link>
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
                    loading="lazy"
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
          <div className="flex items-center justify-center text-center">
            <p className="text-xs text-slate-500 tracking-wide">
              © {new Date().getFullYear()} Rollo Robotics OÜ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
