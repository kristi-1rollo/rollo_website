import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import euLogo from "@/assets/eu-fund-logo.jpg";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and tagline */}
          <div>
            <img src={logo} alt="1ROLLO" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground">
              Your Intelligent Robot Security Guard
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a 
                href="mailto:info@1rollo.com" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                info@1rollo.com
              </a>
              <a 
                href="tel:+372123456789" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                +372 123 456 789
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Raua 16-2<br />
                  Viljandi, Estonia 71020
                </span>
              </div>
            </div>
          </div>

          {/* EU funding */}
          <div>
            <h3 className="font-semibold mb-4">Co-funded by</h3>
            <img 
              src={euLogo} 
              alt="European Union Regional Development Fund" 
              className="h-16 w-auto rounded bg-foreground p-2"
            />
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} 1ROLLO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
