import { forwardRef, type ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeInView = forwardRef<HTMLDivElement, FadeInViewProps>(
  ({ children, delay = 0, className = "" }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
);

FadeInView.displayName = "FadeInView";

export default FadeInView;
