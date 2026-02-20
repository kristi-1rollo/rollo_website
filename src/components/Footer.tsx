import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="section-dark py-12 border-t border-white/5">
      <div className="container mx-auto px-8 flex justify-between items-center">
        
        {/* FOOTER LOGO - KLIKITAV JA SUUR */}
        <button 
          onClick={scrollToTop}
          className="focus:outline-none transition-transform active:scale-95 flex items-center p-0 m-0 border-none bg-transparent"
        >
          <img 
            src={logo} 
            alt="ROLLO" 
            className="h-10 w-auto block" 
          />
        </button>

        {/* LINGID - TÄPSELT NAGU ALGUSES */}
        <div className="flex gap-8">
          <a href="#" className="text-white/50 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium">
            About
          </a>
          <a href="#" className="text-white/50 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;