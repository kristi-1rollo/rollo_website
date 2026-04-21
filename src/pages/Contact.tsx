import { useEffect } from "react";
import { Mail, MapPin, Building2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useContactForm, DEPLOYMENT_AREA_OPTIONS } from "@/hooks/useContactForm";

const Contact = () => {
  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleDeploymentAreaToggle,
    handleSubmit,
  } = useContactForm({
    requiredFields: ["company", "country"],
    successMessage: "Thank you for your message! We'll be in touch soon.",
    defaultTopicFallback: true,
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div className="pb-16">
      {/* Hero Section with Video on Right */}
      <section className="section-glow-top relative w-full min-h-[100svh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#020611]" />
        <div className="absolute -top-24 left-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(38,93,214,0.22)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />

        {/* Video positioned on right side - covers right 70% */}
        <div className="absolute left-[30%] top-0 bottom-0 right-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/robot/vid/1Rollo_hallway.mp4" type="video/mp4" />
          </video>
          {/* Gradient fade on left edge of video */}
          <div className="absolute inset-y-0 left-0 w-32 bg-[linear-gradient(90deg,rgba(2,6,13,1)_0%,rgba(2,6,13,0)_100%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full space-y-6 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Contact
          </p>
          <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-2xl">
            Let's Talk About Your Security Needs
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl">
            Whether you're interested in partnerships, pilot programs, deployment planning,
            or joining our team, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#career"
              className="text-sm font-medium text-[#B4FF33] underline decoration-[#B4FF33]/60 underline-offset-4 hover:text-[#B4FF33]/80 transition"
            >
              View Career Opportunities
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-glow-top max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="surface-panel rounded-2xl p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#B4FF33]/10 border border-[#B4FF33]/20">
                  <Building2 className="w-6 h-6 text-[#B4FF33]" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-white">Company Details</h3>
                  <div className="space-y-1 text-sm text-white">
                    <p className="font-medium">Rollo Robotics OÜ</p>
                    <p>Registry code: 17320003</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#B4FF33]/10 border border-[#B4FF33]/20">
                  <MapPin className="w-6 h-6 text-[#B4FF33]" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-white">Address</h3>
                  <div className="space-y-1 text-sm text-white">
                    <p>Viljandi maakond, Viljandi linn</p>
                    <p>Raua tn 16, 71020</p>
                    <p>Estonia</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#B4FF33]/10 border border-[#B4FF33]/20">
                  <Mail className="w-6 h-6 text-[#B4FF33]" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <a
                    href="mailto:info@1rollo.com"
                    className="inline-flex text-sm text-[#B4FF33] underline decoration-[#B4FF33]/60 underline-offset-4 transition hover:text-[#B4FF33]/90"
                  >
                    info@1rollo.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="surface-panel rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="title-halo text-2xl font-bold text-white mb-2">
                  Get in Touch
                </h3>
                <p className="text-base text-white">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-white mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                      placeholder="Your country"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="numberOfRobots" className="block text-sm font-medium text-white mb-2">
                    Number of Robots to Reserve
                  </label>
                  <input
                    type="number"
                    id="numberOfRobots"
                    name="numberOfRobots"
                    min="1"
                    value={formData.numberOfRobots}
                    onChange={handleInputChange}
                    className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                    placeholder="e.g., 5"
                  />
                </div>

                <div>
                  <label htmlFor="estimatedDemand" className="block text-sm font-medium text-white mb-2">
                    Estimated Robot Demand Within the Next 5 Years
                  </label>
                  <input
                    type="text"
                    id="estimatedDemand"
                    name="estimatedDemand"
                    value={formData.estimatedDemand}
                    onChange={handleInputChange}
                    className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                    placeholder="e.g., 20-50 units"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Intended Area of Deployment
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                    {DEPLOYMENT_AREA_OPTIONS.map((area) => (
                      <div key={area} className="flex items-start gap-2">
                        <Checkbox
                          id={`contact-${area}`}
                          checked={formData.deploymentAreas.includes(area)}
                          onCheckedChange={() => handleDeploymentAreaToggle(area)}
                          className="mt-1 border-white/20 data-[state=checked]:bg-[#B4FF33] data-[state=checked]:border-[#B4FF33] data-[state=checked]:text-black"
                        />
                        <label
                          htmlFor={`contact-${area}`}
                          className="text-sm text-white cursor-pointer leading-tight"
                        >
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-white mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none resize-none"
                    placeholder="Any additional details about your inquiry or requirements..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-12 rounded-xl bg-[#B4FF33] px-6 py-3 text-base font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
