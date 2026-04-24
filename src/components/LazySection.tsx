import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

interface LazySectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Approximate height to reserve before content mounts (prevents CLS) */
  minHeight?: number | string;
  /** How far in advance to start mounting children (root margin px) */
  rootMargin?: string;
}

/**
 * Defers mounting of its children until the wrapper scrolls near the viewport.
 * Used to keep heavy below-the-fold image grids from competing with the LCP
 * image for bandwidth on mobile.
 */
const LazySection = ({
  children,
  minHeight = 320,
  rootMargin = "600px 0px",
  className,
  ...rest
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={shouldRender ? undefined : { minHeight }}
      {...rest}
    >
      {shouldRender ? children : null}
    </div>
  );
};

export default LazySection;
