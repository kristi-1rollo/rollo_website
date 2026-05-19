import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

interface PublicContentRailProps {
  children: ReactNode;
  className?: string;
}

interface SectionIntroProps {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}

export const PUBLIC_SECTION_GUTTER = "px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12";
export const PUBLIC_SECTION_MAX_WIDTH = "max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px]";
export const PUBLIC_CONTENT_RAIL = `${PUBLIC_SECTION_MAX_WIDTH} mx-auto ${PUBLIC_SECTION_GUTTER} text-left`;

/** Vertical spacing scale — use these on every public section for consistent rhythm */
export const SECTION_SPACING_TIGHT = "py-12 md:py-16";
export const SECTION_SPACING_DEFAULT = "py-16 md:py-24 lg:py-32";
export const SECTION_SPACING_HERO = "py-20 md:py-32 lg:py-40";
/** Hero container — full viewport height on mobile (svh prevents iOS jump) */
export const HERO_CONTAINER = "relative w-full min-h-[100svh] flex items-center overflow-hidden";

/** Reusable page section container with consistent max-width and padding */
export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`${PUBLIC_CONTENT_RAIL} ${className}`}>
      {children}
    </section>
  );
}

/** Shared content rail for heroes or full-bleed sections whose text must align with standard sections */
export function PublicContentRail({ children, className = "" }: PublicContentRailProps) {
  return <div className={`${PUBLIC_CONTENT_RAIL} w-full ${className}`}>{children}</div>;
}

/** Intro wrapper: may be centered in hero areas, but always inherits the same page gutter */
export function SectionIntro({ children, centered = false, className = "" }: SectionIntroProps) {
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {children}
    </div>
  );
}

/** Uppercase accent tag label used above section headings */
export function SectionTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs uppercase tracking-[0.2em] text-primary mb-2 ${className}`}>
      {children}
    </p>
  );
}
