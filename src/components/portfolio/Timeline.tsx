import { Reveal, SectionTitle } from "./Reveal";
import { TIMELINE } from "./data";

export function Timeline() {
  return (
    <section id="trayectoria" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Educación y experiencia" title="Mi trayectoria" />

        <div className="relative pl-8 sm:pl-12">
          <div className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent sm:left-3" />
          <div className="grid gap-9">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="relative">
                  <span className="absolute -left-[1.6rem] top-6 size-3 rounded-full bg-primary glow-soft sm:-left-[2.35rem]" />
                  <div className="glass-panel rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:glow-soft sm:p-7">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-lilac">
                      {item.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
