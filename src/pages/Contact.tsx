import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Building2, Briefcase } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useContactForm, DEPLOYMENT_AREA_OPTIONS } from "@/hooks/useContactForm";
import { usePublishedCareerPosts, type CareerPost } from "@/hooks/useCareerPosts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DOMPurify from "dompurify";

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

  const { data: careerPosts } = usePublishedCareerPosts();
  const [selectedPost, setSelectedPost] = useState<CareerPost | null>(null);

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
          <p className="text-base md:text-lg text-white leading-relaxed max-w-prose">
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
            <div className="rounded-2xl border border-[#B4FF33]/30 bg-[#B4FF33]/5 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
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
          <p className="text-base md:text-lg text-white max-w-2xl">
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
            <ul className="space-y-3 text-sm text-white">
              {[
                "Work on cutting-edge robotics and AI technology",
                "Join a team with 10+ years of shared robotics experience",
                "Impact real-world security and safety challenges",
                "Competitive compensation and equity opportunities",
                "Flexible work environment and continuous learning",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#B4FF33] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Open Positions */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#B4FF33]/10 border border-[#B4FF33]/20">
                <Briefcase className="w-5 h-5 text-[#B4FF33]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Open Positions</h3>
            </div>

            {careerPosts && careerPosts.length > 0 ? (
              <ul className="space-y-2">
                {careerPosts.map((post) => (
                  <li key={post.id}>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="w-full text-left rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 hover:border-[#B4FF33]/30 transition group"
                    >
                      <span className="text-sm font-medium text-[#B4FF33] group-hover:underline">
                        {post.title}
                      </span>
                      <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
                        <span>{post.location}</span>
                        <span>·</span>
                        <span>{post.type}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="text-sm text-white">
                  We're always looking for talented people. Even if you don't see a specific
                  opening, we'd love to hear from you.
                </p>
                <a
                  href="mailto:join@1rollo.com"
                  className="inline-flex text-sm text-[#B4FF33] underline decoration-[#B4FF33]/60 underline-offset-4 transition hover:text-[#B4FF33]/90"
                >
                  Send your CV to join@1rollo.com
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Career Post Modal */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border-white/10 text-white">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {selectedPost.title}
                </DialogTitle>
                <div className="flex items-center gap-3 text-sm text-white/60 pt-1">
                  <span>{selectedPost.location}</span>
                  <span>·</span>
                  <span>{selectedPost.type}</span>
                </div>
              </DialogHeader>

              {selectedPost.poster_url && (
                <div className="my-4 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={selectedPost.poster_url}
                    alt={`${selectedPost.title} poster`}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div
                className="prose prose-invert prose-sm max-w-none mt-4 [&>p]:mb-4 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:mt-6 [&>h1]:mb-3 [&>h2]:text-lg [&>h2]:font-bold [&>h2]:mt-5 [&>h2]:mb-2 [&>h3]:text-base [&>h3]:font-bold [&>h3]:mt-4 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ul>li]:mb-1 [&>ol>li]:mb-1 [&>blockquote]:border-l-2 [&>blockquote]:border-[#B4FF33]/40 [&>blockquote]:pl-4 [&>blockquote]:italic [&>a]:text-[#B4FF33] [&>a]:underline"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedPost.content),
                }}
              />

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex px-5 py-2.5 rounded-lg bg-[#B4FF33] text-black text-sm font-bold uppercase tracking-wider hover:bg-[#B4FF33]/90 transition"
                >
                  {emailCopied ? "Copied!" : "Apply — join@1rollo.com"}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
