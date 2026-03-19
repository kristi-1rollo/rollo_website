import { motion, useScroll, useSpring } from "framer-motion";

interface BlogPostHeaderProps {
  title: string;
  imageUrl: string | null;
  category: string;
  focalX?: number | null;
  focalY?: number | null;
  zoom?: number | null;
}

const BlogPostHeader = ({ title, imageUrl, category, focalX, focalY, zoom }: BlogPostHeaderProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="section-glow-top relative w-full overflow-hidden">
      <motion.div
        className="fixed inset-x-0 top-0 z-[100] h-px bg-[#99FF00] origin-left"
        style={{ scaleX }}
      />

      <div className="container-premium pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="mb-5 flex flex-wrap gap-2.5 opacity-80">
          <span className="mono-spec border border-white/20 px-2.5 py-1 text-[10px]">
            DOC_TYPE: STRATEGIC_DISPATCH
          </span>
          <span className="mono-spec border border-[#99FF00]/30 px-2.5 py-1 text-[10px] text-[#99FF00]">
            STATUS: VERIFIED
          </span>
          <span className="mono-spec border border-white/20 px-2.5 py-1 text-[10px]">
            SECURITY_LEVEL: UNCLASSIFIED
          </span>
          <span className="mono-spec border border-white/20 px-2.5 py-1 text-[10px]">
            CATEGORY: {category || "GENERAL"}
          </span>
        </div>

        <h1 className="title-halo mb-8 max-w-5xl text-4xl font-extrabold leading-[0.95] tracking-tight text-white uppercase md:text-6xl lg:text-7xl">
          {title}
        </h1>

        <div className="photo-depth-frame relative aspect-[21/9] w-full overflow-hidden border border-white/10 bg-black/20 cyber-frame scan-lines">
          <img
            src={imageUrl ?? "/hero/rollo-street.png"}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default BlogPostHeader;
