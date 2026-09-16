import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
        <span className="text-gradient-violet">{title}</span>
      </h2>
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-primary to-transparent" />
    </Reveal>
  );
}
