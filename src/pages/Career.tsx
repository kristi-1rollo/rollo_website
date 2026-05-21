import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, ImagePlus, ArrowRight } from "lucide-react";
import { usePublishedCareerPosts, type CareerPost } from "@/hooks/useCareerPosts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section, SectionIntro, SectionTag } from "@/components/ui/section";
import FadeInView from "@/components/FadeInView";
import DOMPurify from "dompurify";

const teamProfiles = [
  { name: "Arno Kütt", image: "/robot/team/profile/arno_kutt.webp" },
  { name: "Sander Sebastian Agur", image: "/robot/team/profile/sander_sebastjan_agur.webp" },
  { name: "Kristi Vahter", image: "/robot/team/profile/kristi_vahter.webp" },
  { name: "Laido Valdvee", image: "/robot/team/profile/laido_valdvee.webp" },
  { name: "Lauri Hirvesaar", image: "/robot/team/profile/lauri_hirvesaar.webp" },
  { name: "Lauri Laanmets", image: "/robot/team/profile/lauri_laanmets.webp" },
  { name: "Lauri Vaher", image: "/robot/team/profile/lauri_vaher.webp" },
  { name: "Raivo Sulla", image: "/robot/team/profile/raivo_sulla.webp" },
  { name: "Rein Saetalu", image: "/robot/team/profile/rein_saetalu.webp" },
  { name: "Remi Lossov", image: "/robot/team/profile/remi_lossov.webp" },
  { name: "Taavi Varjund", image: "/robot/team/profile/taavi_varjund.webp" },
];

const Career = () => {
  const { data: careerPosts } = usePublishedCareerPosts();
  const [selectedPost, setSelectedPost] = useState<CareerPost | null>(null);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();
  const heroRef = useRef<HTMLElement>(null);

  const handleOpenTeamMember = (index: number) => setSelectedTeamIndex(index);
  const handleCloseTeamMember = () => setSelectedTeamIndex(null);
  const handleTeamNavigate = (direction: 1 | -1) => {
    if (selectedTeamIndex === null) return;
    setSelectedTeamIndex((selectedTeamIndex + direction + teamProfiles.length) % teamProfiles.length);
  };
  const selectedTeamMember = selectedTeamIndex !== null ? teamProfiles[selectedTeamIndex] : null;


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
      {/* Fixed Hero Section - stays in place while scrolling on desktop */}
      <header
        ref={heroRef}
        className="section-glow-top relative flex min-h-[100svh] items-center overflow-hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-full z-0"
        style={{ '--hero-overlay-opacity': '0' } as React.CSSProperties}
      >
        {/* Hero background image */}
        <picture>
          <img
            src="/team/team-hero.webp"
            alt="1Rollo robotics team"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '50% center' }}
            fetchPriority="high"
          />
        </picture>

        {/* Base overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Mobile: gradient for better text contrast */}
        <div className="absolute inset-y-0 left-0 md:hidden w-full bg-[linear-gradient(90deg,rgba(2,6,13,0.85)_0%,rgba(2,6,13,0.6)_35%,rgba(2,6,13,0.2)_70%,rgba(2,6,13,0)_100%)]" />

        {/* Dynamic overlay - fades in on scroll using CSS variable */}
        <div
          className="absolute inset-0 bg-background transition-opacity duration-200"
          style={{ opacity: 'var(--hero-overlay-opacity)' }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto w-full px-4 py-20 sm:px-6 md:py-32 lg:px-8 lg:py-40 xl:px-10 2xl:px-12">
          <div>
            <SectionIntro centered className="mx-auto flex max-w-3xl flex-col items-center space-y-5 text-center md:mx-0 md:items-start md:text-left">
              <SectionTag>Career</SectionTag>

              <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-2xl">
                Join the Future of Autonomous Robotics
              </h1>

              <p className="max-w-xl text-sm text-foreground/80 sm:text-base md:text-lg">
                We're building the world's most advanced autonomous security robots. If you're
                passionate about robotics, AI, and creating technology that matters, we want to
                hear from you.
              </p>
            </SectionIntro>
          </div>
        </div>
      </header>

      {/* Main content - scrolls over fixed hero */}
      <main className="relative z-10 pt-0 md:pt-[100vh]">
      <div className="bg-background pb-16">




      {/* Why Join 1Rollo & Open Positions Section */}
      <section>
        <Section className="section-glow-top py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Why Join Us */}
          <div className="-mx-5 md:mx-0 blue-card-glow rounded-[4px] p-4 md:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-[4px] border border-primary/20 bg-primary/10 p-2.5">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white">Why Join 1Rollo?</h3>
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
                  <span className="mt-1 text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Open Positions */}
          <div className="-mx-5 md:mx-0 blue-card-glow rounded-[4px] p-4 md:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-[4px] border border-primary/20 bg-primary/10 p-2.5">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white">Open Positions</h3>
            </div>

            {careerPosts && careerPosts.length > 0 ? (
              <ul className="space-y-2">
                {careerPosts.map((post) => (
                  <li key={post.id}>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="surface-panel group w-full rounded-[4px] px-4 py-3 text-left transition hover:border-primary/30"
                    >
                        <span className="text-sm font-medium text-primary group-hover:underline">
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
                   className="inline-flex text-sm text-primary underline decoration-primary/60 underline-offset-4 transition hover:text-primary/90"
                >
                  Send your CV to join@1rollo.com
                </a>
              </>
            )}
          </div>
        </div>
        <div className="mt-8 md:mt-10 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-white/70">
            Don't see your role? Reach out anytime.
          </p>
          <a
            href="mailto:join@1rollo.com"
            className="mt-2 inline-flex text-base font-semibold text-primary underline decoration-primary/60 underline-offset-4 transition hover:text-primary/90"
          >
            join@1rollo.com
          </a>
        </div>
      </Section>
      </section>

      {/* Team Gallery Section */}
      <section
        className="section-glow-top relative w-full border-t border-white/10 py-12 sm:py-16 md:py-20 lg:py-32"
        style={{
          background:
            "radial-gradient(ellipse 1100px 700px at 70% 50%, rgba(6, 32, 96, 0.08), transparent 70%), linear-gradient(180deg, rgba(0, 11, 24, 0.7) 0%, rgba(0, 0, 0, 1) 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <FadeInView>
            <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
              <SectionTag>Team</SectionTag>
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                We&apos;re engineers, builders and problem-solvers
              </h2>
              <p className="text-sm text-white/70 sm:text-base md:text-lg">
                Everyone here works hands-on with the product from idea to real-world testing.
              </p>
            </div>

            <div className="team-marquee mx-auto max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px]">
              <div className="team-marquee__edge team-marquee__edge--left" />
              <div className="team-marquee__edge team-marquee__edge--right" />
              <div className="team-marquee__track">
                {[...teamProfiles, ...teamProfiles].map((member, index) => (
                  <button
                    key={`${member.name}-${index}`}
                    type="button"
                    onClick={() => handleOpenTeamMember(index % teamProfiles.length)}
                    className="team-marquee__item group relative aspect-square overflow-hidden rounded-[4px] border border-white/10 bg-white/5 text-left"
                    aria-label={`Open ${member.name} profile photo`}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.02)_0%,rgba(3,8,18,0.08)_42%,rgba(3,8,18,0.42)_100%)]" />
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/72">
                      <span>View</span>
                      <ImagePlus className="h-3.5 w-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>


      {/* Career Post Modal */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-white/10 bg-background text-white">
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
                 <div className="photo-depth-frame my-4 overflow-hidden rounded-[4px] border border-white/10">
                  <img
                    src={selectedPost.poster_url}
                    alt={`${selectedPost.title} poster`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              )}

              <div
                className="prose prose-invert prose-sm mt-4 max-w-none [&>a]:text-primary [&>a]:underline [&>blockquote]:border-l-2 [&>blockquote]:border-primary/40 [&>blockquote]:pl-4 [&>blockquote]:italic [&>h1]:mb-3 [&>h1]:mt-6 [&>h1]:text-xl [&>h1]:font-bold [&>h2]:mb-2 [&>h2]:mt-5 [&>h2]:text-lg [&>h2]:font-bold [&>h3]:mb-2 [&>h3]:mt-4 [&>h3]:text-base [&>h3]:font-bold [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol>li]:mb-1 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedPost.content),
                }}
              />

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={handleCopyEmail}
                   className="inline-flex rounded-[4px] bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
                >
                  {emailCopied ? "Copied!" : "Apply — join@1rollo.com"}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Team Member Modal */}
      <Dialog open={selectedTeamIndex !== null} onOpenChange={(open) => !open && handleCloseTeamMember()}>
        <DialogContent className="max-w-5xl border-white/10 bg-[#020813]/95 p-0 text-white">
          {selectedTeamMember && (
            <div className="overflow-hidden rounded-[4px]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary/85">Team</p>
                  <DialogTitle className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    {selectedTeamMember.name}
                  </DialogTitle>
                </div>
                <p className="hidden text-xs uppercase tracking-[0.18em] text-white/38 sm:block">
                  Drag left or right
                </p>
              </div>

              <div className="relative bg-[radial-gradient(ellipse_at_center,rgba(33,94,221,0.12)_0%,rgba(2,8,19,0)_70%)] p-4 sm:p-6">
                <button
                  type="button"
                  onClick={() => handleTeamNavigate(-1)}
                  className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-background/75 text-white/85 transition hover:border-primary/30 hover:text-primary sm:flex"
                  aria-label="Previous team photo"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>

                <button
                  type="button"
                  onClick={() => handleTeamNavigate(1)}
                  className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-background/75 text-white/85 transition hover:border-primary/30 hover:text-primary sm:flex"
                  aria-label="Next team photo"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>

                <motion.div
                  key={selectedTeamMember.image}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x <= -80) handleTeamNavigate(1);
                    else if (info.offset.x >= 80) handleTeamNavigate(-1);
                  }}
                  initial={{ opacity: 0.8, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mx-auto max-w-3xl cursor-grab active:cursor-grabbing"
                >
                  <div className="overflow-hidden rounded-[4px] border border-white/10 bg-[#09111f] shadow-[0_28px_80px_rgba(1,6,16,0.42)]">
                    <img
                      src={selectedTeamMember.image}
                      alt={selectedTeamMember.name}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
        </div>
      </main>
    </>

  );
};

export default Career;
