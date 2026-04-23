import { motion, useScroll, useSpring } from "framer-motion";

interface BlogPostHeaderProps {
  title: string;
  imageUrl: string | null;
  category: string;
}

const BlogPostHeader = ({ title, imageUrl, category }: BlogPostHeaderProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <header className="section-glow-top relative w-full overflow-hidden">
      <motion.div className="fixed inset-x-0 top-0 z-[100] h-px origin-left bg-primary" style={{ scaleX }} />

      <div className="container-premium pt-24 pb-10 md:pt-32 md:pb-14">
        <div className="mb-5 flex flex-wrap gap-2.5 opacity-80">
          <span className="mono-spec border border-white/20 px-2.5 py-1 text-[10px]">
            DOC_TYPE: STRATEGIC_DISPATCH
          </span>
          <span className="mono-spec border border-primary/30 px-2.5 py-1 text-[10px] text-primary">
            STATUS: VERIFIED
          </span>
          <span className="mono-spec border border-white/20 px-2.5 py-1 text-[10px]">
            SECURITY_LEVEL: UNCLASSIFIED
          </span>
        </div>

        <h1 className="title-halo mb-6 max-w-5xl text-left text-3xl font-extrabold leading-[1.08] tracking-tight text-white uppercase md:mb-8 md:text-5xl lg:text-6xl">
          {title}
        </h1>

        <div className="photo-depth-frame cyber-frame scan-lines relative aspect-video md:aspect-[21/9] w-full overflow-hidden border border-white/10 bg-black/20">
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
