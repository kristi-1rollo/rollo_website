import { useState, useCallback, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Briefcase } from "lucide-react";
import { usePublishedCareerPosts, type CareerPost } from "@/hooks/useCareerPosts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section, SectionTag } from "@/components/ui/section";
import DOMPurify from "dompurify";

const Career = () => {
  const { data: careerPosts } = usePublishedCareerPosts();
  const [selectedPost, setSelectedPost] = useState<CareerPost | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Dynamic hero overlay opacity based on scroll position
  useEffect(() => {
    let rafId: number;

    const updateHeroOpacity = () => {
      if (!heroRef.current) return;

      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Calculate opacity: 0 at top, 1 when scrolled past hero
      // Starts fading at 30% of hero height, fully opaque at 80%
      const fadeStart = heroHeight * 0.3;
      const fadeEnd = heroHeight * 0.8;
      const opacity = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

      // Update CSS variable for smooth rendering
      heroRef.current.style.setProperty('--hero-overlay-opacity', opacity.toString());
    };

    const handleScroll = () => {
      // Cancel previous frame if it exists
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Schedule update for next frame
      rafId = requestAnimationFrame(updateHeroOpacity);
    };

    // Initial calculation
    updateHeroOpacity();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

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
    <>
      {/* Fixed Hero Section - stays in place while scrolling */}
      <header
        ref={heroRef}
        className="section-glow-top fixed top-0 left-0 w-full h-screen flex items-center overflow-hidden z-0"
        style={{ '--hero-overlay-opacity': '0' } as React.CSSProperties}
      >
        {/* Hero background image */}
        <picture>
          <img
            src="/team/team-hero.png"
            alt="Rollo robotics team"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '50% center' }}
            fetchpriority="high"
          />
        </picture>

        {/* Base overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Mobile: gradient for better text contrast */}
        <div className="absolute inset-y-0 left-0 md:hidden w-full bg-[linear-gradient(90deg,rgba(2,6,13,0.85)_0%,rgba(2,6,13,0.6)_35%,rgba(2,6,13,0.2)_70%,rgba(2,6,13,0)_100%)]" />

        {/* Dynamic overlay - fades in on scroll using CSS variable */}
        <div
          className="absolute inset-0 bg-[#050912] transition-opacity duration-200"
          style={{ opacity: 'var(--hero-overlay-opacity)' }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full space-y-6 py-24">
          <SectionTag>Career</SectionTag>

          <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-2xl">
            Join the Future of Autonomous Robotics
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl">
            We're building the world's most advanced autonomous security robots. If you're
            passionate about robotics, AI, and creating technology that matters, we want to
            hear from you.
          </p>
        </div>
      </header>

      {/* Main content - scrolls over fixed hero */}
      <main className="relative z-10 pt-[100vh]">
        <div className="bg-[#050912] pb-16">

      {/* Why Join Rollo & Open Positions Section */}
      <section>
        <Section className="section-glow-top py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
      </Section>
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
      </main>
    </>
  );
};

export default Career;
