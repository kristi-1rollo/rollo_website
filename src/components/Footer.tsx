import { Linkedin, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-white/[0.02]">
      <div className="container-premium py-12 md:py-16">
        {/* Main grid: stacked on mobile, 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1 — Contact */}
          <div className="space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
              Contact
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-slate-300 font-medium">
                Rollo Robotics O&Uuml;
                <span className="text-slate-500 ml-1.5 text-xs">(17320003)</span>
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
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
                className="inline-flex items-center gap-1.5 text-sm text-[hsl(82,100%,60%)] hover:text-[hsl(82,100%,72%)] transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                info@1rollo.com
              </a>
            </div>
          </div>

          {/* Column 2 — Social (centered on desktop) */}
          <div className="space-y-4 md:flex md:flex-col md:items-center">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/rollo-robotics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Rollo Robotics on LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-[4px] border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@RolloRobotics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch Rollo Robotics on YouTube"
                className="flex items-center justify-center w-9 h-9 rounded-[4px] border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3 — Partner / Sponsor Logos */}
          <div className="space-y-4 md:flex md:flex-col md:items-end">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
              Supported By
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <img
                src="/logos/nextgen_rahastanud_el_nextgeneration_eng_hor_color.jpg"
                alt="Funded by the European Union – NextGenerationEU"
                className="h-11 w-auto object-contain object-left md:object-right opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
              <img
                src="/logos/edia-eas.png"
                alt="Estonian Defence and Aerospace Industry Association"
                className="h-10 w-auto object-contain object-left md:object-right opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="container-premium py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-medium">
            &copy; {new Date().getFullYear()} Rollo Robotics O&Uuml;
          </span>
          <div className="flex items-center gap-5">
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
      </div>
    </footer>
  );
};

export default Footer;
