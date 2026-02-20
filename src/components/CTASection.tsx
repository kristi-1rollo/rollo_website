import { useState } from "react";

import RegistrationModal from "./RegistrationModal";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="section relative">
        <div className="container-premium relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-4 font-medium">
              Get Started
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-6 text-white">
              Ready to Transform Your Security Operations?
            </h2>
            <p className="text-lg text-slate-500 mb-12">
              Join the waitlist for early access and be among the first to experience
              the future of autonomous security.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#B4FF33] text-black font-bold uppercase tracking-tight px-8 py-3 rounded-[4px] hover:bg-white transition-all duration-300 border border-[#B4FF33] hover:border-white text-base active:scale-[0.98]"
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
