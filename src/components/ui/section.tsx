import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/** Reusable page section container with consistent max-width and padding */
export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left ${className}`}>
      {children}
    </section>
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
