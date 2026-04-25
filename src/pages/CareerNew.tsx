import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { usePublishedCareerPosts, type CareerPost } from "@/hooks/useCareerPosts";
import { ArrowRight, Target, Users, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionTag } from "@/components/ui/section";
import DOMPurify from "dompurify";

// Animation variants - mobile-optimized
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const CareerNew = () => {
  const { data: careerPosts } = usePublishedCareerPosts();
  const [selectedPost, setSelectedPost] = useState<CareerPost | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("join@1rollo.com");
      setEmailCopied(true);
      toast({ title: "Email copied to clipboard!" });
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const handleApply = (post: CareerPost) => {
    setSelectedPost(post);
  };

  return (
    <>
      {/* HERO - Mobile-first asymmetric */}
      <header className="section-glow-top relative min-h-[100svh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

        {/* Optional: Hero image placeholder */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content - mobile first */}
        <div className="relative z-10 flex min-h-[100svh] items-center">
          <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                {/* Text - 5 columns on desktop */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="lg:col-span-5"
                >
                  <SectionTag>Careers</SectionTag>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white mb-4 sm:mb-6">
                    Build the future of autonomous security
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-xl">
                    We're building robots that replace human patrol — operating 24/7 in real-world
                    environments where humans can't.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href="#open-roles"
                      className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90 min-h-[48px]"
                    >
                      View open roles
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#how-we-work"
                      className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/10 min-h-[48px]"
                    >
                      See how we build
                    </a>
                  </div>
                </motion.div>

                {/* Hero visual - 7 columns on desktop */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-7"
                >
                  <div className="aspect-video rounded-[4px] border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                    <p className="text-white/30 text-sm">Hero visual placeholder</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10">

        {/* THE PROBLEM - Light background for contrast */}
        <section className="w-full bg-zinc-900/30 py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="mx-auto max-w-3xl text-center"
            >
              <SectionTag>The Problem</SectionTag>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Security hasn't evolved the way the world has
              </h2>

              <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8">
                It's still human-based, expensive and limited.
              </p>

              <div className="space-y-3 sm:space-y-4 text-left max-w-2xl mx-auto text-sm sm:text-base text-white/60">
                <p>24/7 coverage is difficult.</p>
                <p>Dangerous or remote environments are often left unmonitored.</p>
              </div>

              <p className="text-base sm:text-lg font-semibold text-white mt-6 sm:mt-8">
                We believe this needs to change.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE'RE BUILDING - Dark background */}
        <section className="w-full bg-background py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
                <SectionTag>Our Solution</SectionTag>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                  What we're building
                </h2>

                <div className="space-y-4 sm:space-y-6 text-left text-sm sm:text-base">
                  <p className="text-base sm:text-lg text-white/80">
                    Rollo is developing autonomous ground robots designed for real-world patrol
                    and monitoring.
                  </p>

                  <p className="text-white/70">
                    Our robots move, see, hear and react — without constant human control.
                  </p>

                  <p className="text-white/70">
                    Built for both indoor and outdoor environments, they are designed to operate
                    continuously, efficiently and reliably.
                  </p>
                </div>
              </div>

              {/* Robot visual placeholder */}
              <div className="rounded-[4px] border border-white/10 bg-white/5 aspect-video flex items-center justify-center">
                <p className="text-white/30 text-xs sm:text-sm">Robot visual placeholder</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE HARD PART - Accent gradient background */}
        <section className="section-glow-top w-full bg-gradient-to-br from-primary/10 via-background to-background py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
                <SectionTag>The Challenge</SectionTag>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                  The hard part
                </h2>

                <p className="text-base sm:text-lg md:text-xl font-semibold text-primary mb-6 sm:mb-8">
                  This is not a solved problem.
                </p>
              </div>

              {/* Numbered challenge boxes - mobile-first grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 sm:mb-12">
                {[
                  "Stable autonomous movement on a single wheel",
                  "Real-world perception in unpredictable environments",
                  "Reliable operation without constant human input"
                ].map((challenge, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="relative border border-white/10 bg-zinc-900/50 rounded-[4px] p-6 sm:p-8"
                  >
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary/20 mb-3 sm:mb-4 block">
                      0{i + 1}
                    </span>
                    <p className="text-sm sm:text-base text-white/80">
                      {challenge}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="text-base sm:text-lg font-semibold text-white text-center">
                That's what we're solving.
              </p>
            </motion.div>
          </div>
        </section>

        {/* HOW WE WORK - Dark background */}
        <section id="how-we-work" className="w-full bg-background py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="mx-auto max-w-3xl text-center"
            >
              <SectionTag>Culture</SectionTag>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                How we work
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8">
                We're a small team building real hardware.
              </p>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                <p>No layers. No corporate structure.</p>
                <p>Fast iteration. High ownership.</p>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium mt-6 sm:mt-8">
                You don't just design — you build, test and improve.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHO WE'RE LOOKING FOR - Light background */}
        <section className="section-glow-top w-full bg-zinc-900/30 py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <div className="text-center mb-8 sm:mb-12">
                <SectionTag>Who We Need</SectionTag>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Who we're looking for
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
                {/* YOU'LL FIT IN - Clean border design */}
                <motion.div
                  variants={fadeInUp}
                  className="border-2 border-primary/40 bg-primary/5 rounded-[4px] p-5 sm:p-6 md:p-8"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">You'll fit in if you:</h3>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "enjoy solving problems without clear answers",
                      "like building things from scratch",
                      "are comfortable with uncertainty",
                      "want your work to exist in the real world"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-white/80">
                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* YOU WON'T FIT IN - Clean border design */}
                <motion.div
                  variants={fadeInUp}
                  className="border border-white/20 bg-white/5 rounded-[4px] p-5 sm:p-6 md:p-8"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400/80 flex-shrink-0" />
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">You won't fit in if you:</h3>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "need clear structure and constant guidance",
                      "prefer predictable environments",
                      "want slow, incremental work"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-white/60">
                        <span className="text-red-400/60 mt-0.5 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TEAM - Dark background */}
        <section className="w-full bg-background py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
                <SectionTag>Team</SectionTag>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                  We're engineers, builders and problem-solvers
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-white/70">
                  Everyone here works hands-on with the product — from idea to real-world testing.
                </p>
              </div>

              {/* Team photo placeholders - mobile-first grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[4px] border border-white/10 bg-white/5 flex items-center justify-center"
                  >
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white/20" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* LOCATION - Light background */}
        <section className="w-full bg-zinc-900/30 py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="mx-auto max-w-3xl text-center"
            >
              <SectionTag>Location</SectionTag>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Based in Estonia
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-white/70">
                Most of the work happens on-site — where the robots are built and tested.
              </p>
            </motion.div>
          </div>
        </section>

        {/* OPEN ROLES - Dark background */}
        <section id="open-roles" className="section-glow-top w-full bg-background py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <div className="text-center mb-8 sm:mb-12">
                <SectionTag>Open Positions</SectionTag>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Open roles
                </h2>
              </div>

              {careerPosts && careerPosts.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
                >
                  {careerPosts.map((post) => (
                    <motion.button
                      key={post.id}
                      variants={fadeInUp}
                      onClick={() => handleApply(post)}
                      className="group border border-white/10 bg-white/5 hover:border-primary/30 rounded-[4px] p-5 sm:p-6 text-left transition min-h-[140px] flex flex-col"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-primary transition flex-grow">
                        {post.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-white/60 mb-3 sm:mb-4">
                        <span>{post.location}</span>
                        <span>·</span>
                        <span>{post.type}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-primary font-medium">
                        Apply
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
                  <p className="text-sm sm:text-base md:text-lg text-white/70 mb-6">
                    We don't have open positions right now, but we're always looking for strong builders.
                  </p>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90 min-h-[48px]"
                  >
                    {emailCopied ? "Copied!" : "Get in touch — join@1rollo.com"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA - Accent background */}
        <section className="section-glow-top w-full bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <div className="border-2 border-primary/40 bg-primary/5 rounded-[4px] p-6 sm:p-8 md:p-12 text-center max-w-3xl mx-auto">
                <SectionTag>Don't See Your Role?</SectionTag>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
                  If you want to work on problems that don't have clear answers — you'll feel at home here
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90 min-h-[48px]"
                  >
                    {emailCopied ? "Email Copied!" : "Apply Now"}
                  </button>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/10 min-h-[48px]"
                  >
                    Or just reach out
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-white/60">
                  join@1rollo.com
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Job Detail Modal */}
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
                className="prose prose-invert prose-sm mt-4 max-w-none text-white"
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
    </>
  );
};

export default CareerNew;
