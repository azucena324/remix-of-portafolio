import { Reveal, SectionTitle } from "./Reveal";
import { SKILLS, TOOLS } from "./data";
import { Check } from "lucide-react";

export function Skills() {
  return (
    <section id="habilidades" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Habilidades" title="Mis habilidades" />

        <div className="grid gap-6 lg:grid-cols-2">
          {SKILLS.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.1}>
              <div className="glass-panel rounded-3xl p-6 sm:p-8">
                <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-lilac">
                  {group.category}
                </h3>
                <ul className="grid gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-secondary/40 hover:glow-soft"
                    >
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Check className="size-3" />
                      </span>
                      <span className="text-sm leading-snug text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Herramientas y plataformas
          </p>
          <div className="flex flex-wrap gap-3">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border bg-secondary/30 px-5 py-2 text-sm text-foreground/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-lilac hover:glow-soft"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
