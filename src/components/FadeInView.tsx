import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

interface FadeInViewProps {
  children: ReactNode;
  /** Animation delay in milliseconds */
  delay?: number;
  className?: string;
}

/**
 * Lightweight fade-in-up component using IntersectionObserver + CSS.
 * Drop-in replacement for the previous framer-motion based version,
 * keeping bundle size minimal on the home/landing route.
 */
const FadeInView = forwardRef<HTMLDivElement, FadeInViewProps>(
  ({ children, delay = 0, className = "" }, externalRef) => {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      // If IntersectionObserver isn't available, just show immediately.
      if (typeof IntersectionObserver === "undefined") {
        setVisible(true);
        return;
      }

      // Honor reduced-motion preference — render immediately, no animation.
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
              break;
            }
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    const style: CSSProperties = {
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : "translate3d(0,24px,0)",
      transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      willChange: visible ? "auto" : "opacity, transform",
    };

    const setRefs = (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof externalRef === "function") externalRef(node);
      else if (externalRef) externalRef.current = node;
    };

    return (
      <div ref={setRefs} className={className} style={style}>
        {children}
      </div>
    );
  }
);

FadeInView.displayName = "FadeInView";

export default FadeInView;
