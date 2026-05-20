import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Building2, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import FadeInView from "@/components/FadeInView";
import { useContactForm, DEPLOYMENT_AREA_OPTIONS } from "@/hooks/useContactForm";


const Contact = () => {
  const {
    formData,
    isSubmitting,
    isSuccess,
    handleInputChange,
    handleDeploymentAreaToggle,
    handleSubmit,
  } = useContactForm({
    requiredFields: ["company", "country"],
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
      {/* Hero Section */}
      <section className="section-glow-top relative w-full min-h-[100svh] overflow-hidden">
        {/* Background image — full bleed on mobile, offset on desktop */}
        <div className="absolute inset-0 md:left-[10%] md:right-0 overflow-hidden">
          <img
            src="/images/1rollo_deploy.webp"
            alt="1Rollo deployment"
            className="h-full w-full object-cover object-[80%_center] md:object-center"
            loading="eager"
          />
        </div>

        {/* Overlays — match AboutUs hero treatment */}
        <div className="absolute inset-0 bg-black/50 md:hidden" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-[radial-gradient(circle_at_24%_42%,rgba(2,6,14,0.85)_0%,rgba(3,8,18,0.72)_28%,rgba(4,10,24,0.4)_54%,rgba(0,0,0,0)_82%)]" />
        <div className="absolute inset-y-0 left-0 md:hidden w-full bg-[linear-gradient(90deg,rgba(2,6,13,0.85)_0%,rgba(2,6,13,0.6)_35%,rgba(2,6,13,0.3)_70%,rgba(2,6,13,0.2)_100%)]" />
        <div className="absolute inset-y-0 left-0 hidden md:block w-32 bg-[linear-gradient(90deg,rgba(2,6,13,1)_0%,rgba(2,6,13,0)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px] items-center px-4 py-20 sm:px-6 md:py-32 lg:px-8 lg:py-40 xl:px-10 2xl:px-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-5 text-center md:mx-0 md:items-start md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              Contact
            </p>
            <h1 className="title-halo max-w-2xl text-3xl font-bold leading-[1.08] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Let's Talk About Your Security Needs
            </h1>
            <p className="max-w-xl text-sm text-foreground/80 sm:text-base md:text-lg">
              Whether you're interested in partnerships, pilot programs, deployment planning,
              or joining our team, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1 md:justify-start">
              <Link
                to="/career"
                className="text-sm font-medium text-primary underline decoration-primary/60 underline-offset-4 transition hover:text-primary/80"
              >
                View Career Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-glow-top max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="surface-panel rounded-[4px] p-5 md:p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-[4px] border border-primary/20 bg-primary/10 p-3">
                  <Building2 className="w-6 h-6 text-primary" />
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
                <div className="rounded-[4px] border border-primary/20 bg-primary/10 p-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-white">Address</h3>
                  <div className="space-y-1 text-sm text-white">
                    <p>Viljandi County, Viljandi</p>
                    <p>Raua St 16, 71020</p>
                    <p>Estonia</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-[4px] border border-primary/20 bg-primary/10 p-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <a
                    href="mailto:info@1rollo.com"
                    className="inline-flex text-sm text-primary underline decoration-primary/60 underline-offset-4 transition hover:text-primary/90"
                  >
                    info@1rollo.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="surface-panel rounded-[4px] p-5 md:p-6">
              <div className="mb-6">
                <h3 className="title-halo text-2xl font-bold text-white mb-2">
                  Get in Touch
                </h3>
                <p className="text-base text-white">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                {/* Honeypot — hidden from real users, often filled by bots */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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
                       className="form-field-deep min-h-11 w-full rounded-[4px] px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
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
                       className="form-field-deep min-h-11 w-full rounded-[4px] px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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
                       className="form-field-deep min-h-11 w-full rounded-[4px] px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
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
                       className="form-field-deep min-h-11 w-full rounded-[4px] px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
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
                     className="form-field-deep min-h-11 w-full rounded-[4px] px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
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
                     className="form-field-deep min-h-11 w-full rounded-[4px] px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
                    placeholder="e.g., 20-50 units"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Intended Area of Deployment
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {DEPLOYMENT_AREA_OPTIONS.map((area) => (
                      <div key={area} className="flex items-start gap-2">
                        <Checkbox
                          id={`contact-${area}`}
                          checked={formData.deploymentAreas.includes(area)}
                          onCheckedChange={() => handleDeploymentAreaToggle(area)}
                           className="mt-1 border-white/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
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
                     className="form-field-deep w-full rounded-[4px] px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none resize-none"
                    placeholder="Any additional details about your inquiry or requirements..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                     className="w-full min-h-12 rounded-[4px] bg-primary px-6 py-3 text-base font-bold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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
