import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegistrationModal from "./RegistrationModal";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-3xl rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your{" "}
              <span className="text-primary">Security Operations</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join the waitlist for early access and be among the first to experience
              the future of autonomous security
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="text-lg px-10 py-6 animate-cta-pulse bg-primary hover:bg-primary/90"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </section>

      <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default CTASection;
