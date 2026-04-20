import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Briefcase } from "lucide-react";
import { usePublishedCareerPosts, type CareerPost } from "@/hooks/useCareerPosts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DOMPurify from "dompurify";

const team = [
  {
    name: "Mechanical Engineering",
    description: "Structural design, gyroscopic systems, and production-ready hardware for harsh outdoor conditions.",
  },
  {
    name: "Software Development",
    description: "Real-time control systems, cloud integration, and autonomous patrol software.",
  },
  {
    name: "Electronics",
    description: "Sensor integration, power management, and embedded systems for reliable 24/7 operation.",
  },
  {
    name: "Artificial Intelligence",
    description: "Vision stack, threat detection, and autonomous decision-making in complex environments.",
  },
  {
    name: "Product Design",
    description: "Human-centered design for security operators, from dashboard UX to physical form factor.",
  },
  {
    name: "Sales & Production",
    description: "Production launch planning, distribution network, and customer deployment support.",
  },
];

const AboutUs = () => {
  const { data: careerPosts } = usePublishedCareerPosts();
  const [selectedPost, setSelectedPost] = useState<CareerPost | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("join@1rollo.com");
      setEmailCopied(true);
      toast({ title: "Email copied to clipboard!" });
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  }, [toast]);

  return (
    <div className="pb-16">
      {/* A) Hero */}
      <section className="section-glow-top relative w-full min-h-[70vh] overflow-hidden pt-24">
        <picture>
          <img
            src="/robot/F6/1rollo_close.png"
            alt="Rollo autonomous security robot"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-[radial-gradient(circle_at_24%_42%,rgba(2,6,14,0.85)_0%,rgba(3,8,18,0.72)_28%,rgba(4,10,24,0.4)_54%,rgba(0,0,0,0)_82%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.1)_22%,rgba(0,0,0,0)_52%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              About Us
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
              Redefining Autonomous Security
            </h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-prose">
              At Rollo Robotics, we're redefining what autonomous security robots
              mean in the physical world. Our mission is simple yet
              transformative: to bring human-level perception, communication, and
              mobility to environments where traditional human patrols are costly,
              inefficient, or unsafe.
            </p>
          </div>
        </div>
      </section>

      {/* B) About Overview — 3 Pillars */}
      <section className="section-glow-top relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Mission */}
          <div className="blue-card-glow rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              Mission
            </h3>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                To create a future where intelligent machines seamlessly extend
                human capabilities fully autonomously, 24/7, anywhere on Earth.
              </p>
              <p>
                Our founding team has decades of experience building globally
                recognized robotics, logistics, and AI systems, launching
                category-defining innovations and setting new industry standards.
              </p>
              <p>
                We are committed to proving that machines can bring presence,
                performance, and precision to the physical world.
              </p>
            </div>
          </div>

          {/* Technology */}
          <div className="blue-card-glow rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              Technology
            </h3>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                Built on deep engineering innovation, Rollo Robotics combines
                proprietary gyroscope-based stabilization, edge intelligence, and
                hardware–software integration to create the world's first truly
                autonomous monowheel robot.
              </p>
              <p>
                Compact, agile, and self-stabilizing, 1Rollo navigates
                real-world conditions by seeing, hearing, speaking, and moving
                with a level of awareness once reserved for humans.
              </p>
            </div>
          </div>

          {/* Scale */}
          <div className="blue-card-glow rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              Scale
            </h3>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                With rising labor costs and surging demand for continuous
                security and monitoring, we believe cost-efficient form factor is
                the key to scalability.
              </p>
              <p>
                1Rollo replaces inefficiency with intelligence by delivering
                massive operational savings across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* C) Team */}
      <section className="section-glow-top relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            The Team
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Decade of Shared Robotics Experience
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl">
            Over 90% of the team members have 3 to 15 years of prior experience
            working together in robotics development and have achieved remarkable
            results.
          </p>
        </div>

        <div className="mb-12">
          <img
            src="/robot/team/1rollo_team_3.png"
            alt="Rollo robotics team"
            className="w-full h-auto object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />
          {team.map((t) => (
            <div
              key={t.name}
              className="relative blue-card-glow h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {t.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* D) Career Section */}
      <section
        id="career"
        className="section-glow-top max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="space-y-4 mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Career
          </p>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
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
          <div className="blue-card-glow rounded-2xl p-8 space-y-4">
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
          <div className="blue-card-glow rounded-2xl p-8 space-y-4">
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
                      className="surface-panel w-full text-left rounded-lg px-4 py-3 transition group hover:border-[#B4FF33]/30"
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-[#050912] border-white/10 text-white">
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
                <div className="photo-depth-frame my-4 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={selectedPost.poster_url}
                    alt={`${selectedPost.title} poster`}
                    className="w-full h-auto"
                    loading="lazy"
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

export default AboutUs;
