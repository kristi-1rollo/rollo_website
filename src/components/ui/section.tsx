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
export const PUBLIC_CONTENT_RAIL = `max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto ${PUBLIC_SECTION_GUTTER} text-left`;

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
export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
      {children}
    </p>
  );
}
