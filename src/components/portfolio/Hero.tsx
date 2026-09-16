import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, Mail, Play } from "lucide-react";
import { PROFILE } from "./data";

import heroPhoto from "@/assets/vicky-hero.png.asset.json";

const HERO_PHOTO: string | null = heroPhoto.url;

export function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [14, -14]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 180, damping: 18 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, hsl(var(--lilac) / 0.35), transparent 60%)`,
  );

  const onMove = (e: React.PointerEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    setHovering(false);
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center px-5 pt-28 pb-20 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.3em] text-lilac"
          >
            <span className="size-1.5 rounded-full bg-primary animate-pulse-glow" />
            {PROFILE.subject}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.6rem,8vw,5.5rem)] font-semibold leading-[0.95]"
          >
            <span className="block text-foreground">VICKY</span>
            <span className="block text-gradient-violet">ANDINO</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 text-lg font-medium text-lilac sm:text-xl"
          >
            {PROFILE.role} · {PROFILE.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {PROFILE.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => go("proyectos")}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:glow-strong glow-soft"
            >
              <Play className="size-4 transition-transform group-hover:scale-110" />
              Ver proyectos
            </button>
            <button
              onClick={() => go("contacto")}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-lilac"
            >
              <Mail className="size-4" />
              Contáctame
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-sm"
          style={{ perspective: 900 }}
        >
          <div className="absolute inset-0 rounded-full border border-border animate-drift" />
          <div className="absolute inset-6 rounded-full border border-primary/30" />
          <div className="absolute inset-14 rounded-full nebula-blob animate-float-slow" />
          <motion.div
            ref={cardRef}
            onPointerMove={onMove}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="glass-panel relative flex size-44 flex-col items-center justify-center overflow-hidden rounded-full text-center glow-soft transition-shadow duration-300 sm:size-52">
              {HERO_PHOTO ? (
                <img
                  src={HERO_PHOTO}
                  alt={`Foto de ${PROFILE.name}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <>
                  <span className="text-3xl font-semibold text-gradient-violet">VA</span>
                  <span className="mt-1 px-4 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                    Editora de videos
                  </span>
                </>
              )}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
                style={{ opacity: hovering ? 1 : 0, background: glowBg }}
              />
            </div>
          </motion.div>
          <span className="absolute left-2 top-10 size-2 rounded-full bg-lilac animate-pulse-glow" />
          <span className="absolute bottom-12 right-4 size-1.5 rounded-full bg-primary animate-pulse-glow" />
          <span className="absolute bottom-2 left-1/3 size-1 rounded-full bg-lilac animate-pulse-glow" />
        </motion.div>
      </div>

      <button
        onClick={() => go("sobre-mi")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-lilac sm:flex"
      >
        Desliza
        <ArrowDownRight className="size-4 animate-bounce" />
      </button>
    </section>
  );
}
