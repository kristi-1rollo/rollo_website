import { useState } from "react";

import RegistrationModal from "./RegistrationModal";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="section section-dark-alt section-divider relative">
        <div className="container-premium relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-white/[0.92]">
              Ready to Transform Your Security Operations?
            </h2>
            <p className="text-lg text-white/70 mb-12">
              Join the waitlist for early access and be among the first to experience
              the future of autonomous security.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#99FF00] text-black font-bold uppercase tracking-tighter px-8 py-3 hover:bg-white transition-all duration-300 border border-[#99FF00] text-base"
            >
              Get Rollo Access
            </button>
          </div>
        </div>
      </section>

      <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default CTASection;
