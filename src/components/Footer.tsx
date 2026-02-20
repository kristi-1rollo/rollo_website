import euLogo from "@/assets/eu-cofunded.png";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/[0.05]">
      <div className="container-premium flex items-center justify-between">
        {/* Left — copyright & legal */}
        <div className="flex items-center gap-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-medium">
            &copy; 2026 ROLLO
          </span>
          <div className="hidden sm:flex items-center gap-5">
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
            <a
              href="#"
              className="text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition-colors font-medium"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Right — EU co-funded logo */}
        <img
          src={euLogo}
          alt="Co-funded by the European Union"
          className="h-[50px] w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        />
      </div>
    </footer>
  );
};

export default Footer;
