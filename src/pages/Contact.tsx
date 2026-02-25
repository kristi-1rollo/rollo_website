import { useState } from "react";
import { Mail, MapPin, Building2, Briefcase } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const FUNCTION_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/submit-registration`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    numberOfRobots: "",
    estimatedDemand: "",
    deploymentAreas: [] as string[],
    additionalInfo: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.company || !formData.country) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform data to match RegistrationModal format
      const payload = {
        name: formData.name,
        email: formData.email,
        region: formData.country,
        topics: formData.deploymentAreas.length > 0 ? formData.deploymentAreas : ["Other"],
        message: [
          formData.company && `Company: ${formData.company}`,
          formData.numberOfRobots && `Number of Robots: ${formData.numberOfRobots}`,
          formData.estimatedDemand && `Estimated Demand: ${formData.estimatedDemand}`,
          formData.additionalInfo && `Additional Info: ${formData.additionalInfo}`,
        ].filter(Boolean).join("\n"),
      };

      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as unknown as {
        error?: string;
        details?: string[];
      };

      if (!res.ok || data?.error) {
        const msg = Array.isArray(data?.details)
          ? data.details.join(", ")
          : data?.error;

        toast.error(msg ?? "Something went wrong. Please try again.");
        return;
      }

      toast.success("Thank you for your message! We'll be in touch soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        country: "",
        numberOfRobots: "",
        estimatedDemand: "",
        deploymentAreas: [],
        additionalInfo: ""
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeploymentAreaToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      deploymentAreas: prev.deploymentAreas.includes(area)
        ? prev.deploymentAreas.filter((a) => a !== area)
        : [...prev.deploymentAreas, area],
    }));
  };

  const deploymentAreaOptions = [
    "Public safety in urban environments",
    "Airport security",
    "Hospitals and medical facilities",
    "Hotels and hospitality sector",
    "Mining and construction equipment yards",
    "Industrial plants and manufacturing facilities",
    "Critical infrastructure protection",
    "Oil and gas facilities, refineries, and chemical plants",
    "Corporate and university campuses",
    "Gated communities, resorts, and golf clubs",
    "Smart homes, villas, and luxury estates",
    "Water supply stations and reservoirs",
    "Data centers",
    "Law enforcement and military support",
    "Business investment purposes",
    "Other"
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Contact
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            Let's Talk About Your Security Needs
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-prose">
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#B4FF33]/10 border border-[#B4FF33]/20">
                  <Building2 className="w-6 h-6 text-[#B4FF33]" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-white">Company Details</h3>
                  <div className="space-y-1 text-sm text-slate-300">
                    <p className="font-medium text-slate-200">Rollo Robotics OÜ</p>
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
                  <div className="space-y-1 text-sm text-slate-300">
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
            <div className="rounded-2xl border border-[#B4FF33]/30 bg-[#B4FF33]/5 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Get in Touch
                </h3>
                <p className="text-base text-slate-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
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
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
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
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
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
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
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
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
                      placeholder="Your country"
                    />
                  </div>
                </div>

                {/* Inquiry Details */}
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
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
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
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
                    placeholder="e.g., 20-50 units"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Intended Area of Deployment
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                    {deploymentAreaOptions.map((area) => (
                      <div key={area} className="flex items-start gap-2">
                        <Checkbox
                          id={area}
                          checked={formData.deploymentAreas.includes(area)}
                          onCheckedChange={() => handleDeploymentAreaToggle(area)}
                          className="mt-1 border-white/20 data-[state=checked]:bg-[#B4FF33] data-[state=checked]:border-[#B4FF33] data-[state=checked]:text-black"
                        />
                        <label
                          htmlFor={area}
                          className="text-sm text-slate-300 cursor-pointer leading-tight"
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
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent resize-none"
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

      {/* Career Section */}
      <section
        id="career"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="space-y-4 mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Career
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Join the Future of Autonomous Robotics
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl">
            We're building the world's most advanced autonomous security robots. If you're
            passionate about robotics, AI, and creating technology that matters, we want to
            hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Why Join Us */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#B4FF33]/10 border border-[#B4FF33]/20">
                <Briefcase className="w-5 h-5 text-[#B4FF33]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Why Join Rollo?</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-[#B4FF33] mt-1">•</span>
                <span>Work on cutting-edge robotics and AI technology</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B4FF33] mt-1">•</span>
                <span>Join a team with 10+ years of shared robotics experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B4FF33] mt-1">•</span>
                <span>Impact real-world security and safety challenges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B4FF33] mt-1">•</span>
                <span>Competitive compensation and equity opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B4FF33] mt-1">•</span>
                <span>Flexible work environment and continuous learning</span>
              </li>
            </ul>
          </div>

          {/* Open Positions */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-4">
            <h3 className="text-xl font-semibold text-white">Open Positions</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="text-base font-semibold text-white">Robotics Engineer</h4>
                <p className="text-sm text-slate-400">Full-time • Viljandi, Estonia</p>
                <p className="text-sm text-slate-300">
                  Work on mechanical design, control systems, and hardware integration.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="text-base font-semibold text-white">AI/ML Engineer</h4>
                <p className="text-sm text-slate-400">Full-time • Viljandi, Estonia</p>
                <p className="text-sm text-slate-300">
                  Develop vision systems and autonomous decision-making algorithms.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <h4 className="text-base font-semibold text-white">Software Developer</h4>
                <p className="text-sm text-slate-400">Full-time • Viljandi, Estonia</p>
                <p className="text-sm text-slate-300">
                  Build real-time control systems and cloud integration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply CTA */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#B4FF33]/5 to-transparent p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Don't See Your Role?
              </h3>
              <p className="text-base text-slate-300">
                We're always looking for talented individuals. Send us your CV and tell us
                how you can contribute to the future of autonomous robotics.
              </p>
            </div>
            <div>
              <a
                href="mailto:info@1rollo.com?subject=Career Opportunity"
                className="inline-flex min-h-11 rounded-xl bg-[#B4FF33] px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition"
              >
                Send Application
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
