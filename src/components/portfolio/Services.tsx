import { Reveal, SectionTitle } from "./Reveal";
import { SERVICES } from "./data";
import { Image, Megaphone, Music, Palette, Smartphone, Sparkles, Presentation, Globe, Share2 } from "lucide-react";

const ICONS = {
  smartphone: Smartphone,
  megaphone: Megaphone,
  music: Music,
  sparkles: Sparkles,
  image: Image,
  palette: Palette,
  presentation: Presentation,
  globe: Globe,
  share: Share2,
} as const;

export function Services() {
  return (
    <section id="servicios" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Servicios" title="Lo que puedo hacer" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="glass-panel group h-full rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/70 hover:glow-soft">
                  <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-secondary/60 text-lilac transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
