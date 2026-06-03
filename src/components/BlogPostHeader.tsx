import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface BlogPostHeaderProps {
  title: string;
  imageUrl: string | null;
  category: string;
  videoUrl?: string | null;
}

type VideoKind = "file" | "youtube" | "vimeo" | null;

const detectVideoKind = (url?: string | null): VideoKind => {
  if (!url) return null;
  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(url)) return "file";
  if (/(?:youtube\.com|youtu\.be|youtube-nocookie\.com)/i.test(url)) return "youtube";
  if (/vimeo\.com/i.test(url)) return "vimeo";
  return "file"; // assume direct file by default
};

const toYouTubeEmbed = (url: string, muted: boolean): string => {
  // Extract video id from any YouTube URL form
  const idMatch =
    url.match(/(?:youtube-nocookie\.com|youtube\.com)\/embed\/([A-Za-z0-9_-]+)/) ||
    url.match(/youtu\.be\/([A-Za-z0-9_-]+)/) ||
    url.match(/[?&]v=([A-Za-z0-9_-]+)/);
  const id = idMatch?.[1] ?? "";
  const params = new URLSearchParams({
    autoplay: "1",
    mute: muted ? "1" : "0",
    loop: "1",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    playsinline: "1",
    showinfo: "0",
    disablekb: "1",
    fs: "0",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
};

const toVimeoEmbed = (url: string, muted: boolean): string => {
  const idMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  const id = idMatch?.[1] ?? "";
  const params = new URLSearchParams({
    autoplay: "1",
    muted: muted ? "1" : "0",
    loop: "1",
    background: "1",
    controls: "0",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
};

const BlogPostHeader = ({ title, imageUrl, category, videoUrl }: BlogPostHeaderProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const kind = detectVideoKind(videoUrl);
  const [muted, setMuted] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const toggleMute = () => {
    setMuted((m) => !m);
    setInteracted(true);
  };

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

        <div className="relative aspect-video w-full overflow-hidden border border-white/10">
          {kind === "file" && videoUrl ? (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                poster={imageUrl ?? undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={toggleMute}
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 surface-panel rounded-[4px] px-3 py-2 text-xs font-medium text-white/90 transition hover:text-primary hover:border-primary/40"
                title={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {!interacted && muted && <span>Click to unmute</span>}
              </button>
            </>
          ) : kind === "youtube" && videoUrl ? (
            <>
              <iframe
                key={muted ? "yt-muted" : "yt-unmuted"}
                src={toYouTubeEmbed(videoUrl, muted)}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                frameBorder={0}
              />
              {/* Top bar to mask YouTube title/share UI */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[#050505]" />
              {/* Bottom-left bar to mask YouTube logo watermark */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-40 bg-[#050505]" />
              <button
                type="button"
                onClick={toggleMute}
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 surface-panel rounded-[4px] px-3 py-2 text-xs font-medium text-white/90 transition hover:text-primary hover:border-primary/40"
                title={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {!interacted && muted && <span>Click to unmute</span>}
              </button>
            </>
          ) : kind === "vimeo" && videoUrl ? (
            <>
              <iframe
                key={muted ? "vm-muted" : "vm-unmuted"}
                src={toVimeoEmbed(videoUrl, muted)}
                title={title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                frameBorder={0}
              />
              <button
                type="button"
                onClick={toggleMute}
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 surface-panel rounded-[4px] px-3 py-2 text-xs font-medium text-white/90 transition hover:text-primary hover:border-primary/40"
                title={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {!interacted && muted && <span>Click to unmute</span>}
              </button>
            </>
          ) : (
            <img
              src={imageUrl ?? "/hero/rollo-street.webp"}
              alt={title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default BlogPostHeader;
