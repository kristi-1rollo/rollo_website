import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeInView = ({ children, delay = 0, className = "" }: FadeInViewProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, ease: "easeOut", delay: delay / 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInView;
