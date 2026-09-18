import { useState } from "react";
import { Reveal, SectionTitle } from "./Reveal";
import { PROJECTS } from "./data";
import { WORKS } from "./works";
import { ArrowUpRight, Globe, Youtube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const workById = (id: string) => WORKS.find((w) => w.id === id);

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const current = PROJECTS.find((p) => p.id === openId) ?? null;
  const currentWorks = (current?.works ?? [])
    .map(workById)
    .filter((work): work is NonNullable<typeof work> => Boolean(work));

  const previewImages = (project: (typeof PROJECTS)[number]) => {
    if (project.images?.length) return project.images.slice(0, 3);
    return (project.works ?? [])
      .slice(0, 3)
      .map(workById)
      .filter((work): work is NonNullable<typeof work> => Boolean(work))
      .map((work) => ({ src: work.image, alt: work.title }));
  };

  return (
    <section id="proyectos" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Proyectos" title="Mis proyectos" />

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <button
                onClick={() => setOpenId(p.id)}
                className="glass-panel group relative w-full overflow-hidden rounded-3xl p-7 text-left transition-all duration-500 hover:-translate-y-2 hover:border-primary/70 hover:glow-strong sm:p-9"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-56 nebula-blob opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="relative">
                  {p.videoEmbed ? (
                    <div className="mb-6 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-secondary/40">
                      <Youtube className="size-12 text-primary transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  ) : previewImages(p).length > 0 ? (
                    <div className="mb-6 grid grid-cols-3 gap-2 overflow-hidden rounded-2xl">
                      {previewImages(p).map((image) => (
                        <img
                          key={image.src}
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="aspect-video w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ))}
                    </div>
                  ) : null}
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
                    {p.label}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-3 py-1 text-[0.7rem] text-lilac"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-lilac">
                    Ver más
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!current} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="glass-panel max-h-[90svh] max-w-4xl overflow-y-auto rounded-3xl border-border text-foreground">
          {current && (
            <>
              <DialogHeader>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
                  {current.label}
                </span>
                <DialogTitle className="text-2xl">{current.title}</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                  {current.detail}
                </DialogDescription>
              </DialogHeader>
              {currentWorks.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {currentWorks.map((w) => (
                    <img
                      key={w.id}
                      src={w.image}
                      alt={w.title}
                      loading="lazy"
                      className="h-24 w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              )}
              {current.images && current.images.length > 0 && (
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Miniaturas de YouTube
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {current.images.map((image, imageIndex) => (
                      <img
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className={`aspect-video w-full rounded-xl object-cover ${imageIndex === 2 ? "sm:col-span-2" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {current.decorations && current.decorations.length > 0 && (
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Diseño del personaje
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {current.decorations.map((image) => (
                      <img
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="aspect-square w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Tecnologías y técnicas
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-lilac"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {current.link && (
                <a
                  href={current.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:glow-strong glow-soft"
                >
                  {current.link.includes("youtube") ? (
                    <Youtube className="size-4" />
                  ) : (
                    <Globe className="size-4" />
                  )}
                  {current.link.includes("youtube") ? "Visitar el canal" : "Visitar la página"}
                </a>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
