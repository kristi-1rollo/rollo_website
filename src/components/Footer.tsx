import React from "react";
import logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full overflow-hidden mt-24">
      {/* Background animation (ultra-subtle, does NOT tint base color) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Only a very soft moving sheen, no white fade overlay */}
        <div className="absolute -inset-x-24 -inset-y-10 opacity-[0.05] blur-3xl footer-sheen" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between gap-8">
          <img
            src={logo}
            alt="1ROLLO"
            className="h-12 md:h-14 w-auto object-contain"
            loading="lazy"
          />

          <nav className="flex items-center gap-6 text-sm text-white/65">
            <a href="/about" className="transition-colors hover:text-white">
              About
            </a>
            <a href="/contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </nav>
        </div>

        {/* Divider above copyright only */}
        <div className="mt-8 border-t border-white/10" />

        <div className="mt-6 flex justify-center">
          <div className="text-[10px] tracking-wide text-white/35">
            © rollo robotics oü 2026
          </div>
        </div>
      </div>

      <style>{`
        .footer-sheen {
          /* Neutral sheen (no green, no white tint wash) */
          background:
            radial-gradient(520px 240px at 25% 40%, rgba(255,255,255,0.08), transparent 62%),
            radial-gradient(560px 260px at 75% 70%, rgba(255,255,255,0.06), transparent 62%);
          animation: footerSheen 18s ease-in-out infinite;
          mix-blend-mode: soft-light;
        }

        @keyframes footerSheen {
          0%   { transform: translate3d(-2%, -2%, 0) scale(1.02); opacity: 0.05; }
          50%  { transform: translate3d( 2%,  2%, 0) scale(1.04); opacity: 0.07; }
          100% { transform: translate3d(-2%, -2%, 0) scale(1.02); opacity: 0.05; }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-sheen { animation: none; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
