import { useEffect, useMemo, useState } from "react";
import { Reveal, SectionTitle } from "./Reveal";
import { WORKS, WORK_CATEGORIES } from "./works";
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, X } from "lucide-react";

export function Gallery() {
  const [filter, setFilter] = useState<string>("Todos");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "Todos" ? WORKS : WORKS.filter((w) => w.category === filter)),
    [filter],
  );

  const current = index !== null ? items[index] : null;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length]);

  return (
    <section id="galeria" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Galería" title="Mis trabajos" />

        <Reveal className="mb-8 flex flex-wrap gap-3">
          {WORK_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(c);
                setIndex(null);
              }}
              className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                filter === c
                  ? "border-primary bg-primary/20 text-lilac glow-soft"
                  : "border-border bg-secondary/25 text-muted-foreground hover:-translate-y-0.5 hover:border-primary hover:text-lilac"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {items.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.06}>
              <button
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-3xl border border-border transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/70 hover:glow-strong"
              >
                <img
                  src={w.image}
                  alt={`${w.title} — trabajo de edición de Vicky Andino`}
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/85 to-transparent" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-left">
                  <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-primary">
                    {w.category}
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold text-foreground">
                    {w.title}
                  </span>
                </span>
                <span className="pointer-events-none absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-background/70 text-lilac opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
          onClick={() => setIndex(null)}
        >
          <div
            className="glass-panel relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-3xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIndex(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 inline-flex size-9 items-center justify-center rounded-full bg-background/70 text-lilac transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <img
              src={current.image}
              alt={`${current.title} — vista ampliada`}
              className="mx-auto max-h-[55svh] w-auto rounded-2xl"
            />

            <div className="mt-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
                {current.category}
              </p>
              <h3 className="mt-2 text-xl sm:text-2xl">{current.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {current.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    aria-label="Anterior"
                    onClick={() => setIndex((i) => (i! - 1 + items.length) % items.length)}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-lilac transition-all hover:border-primary hover:glow-soft"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    aria-label="Siguiente"
                    onClick={() => setIndex((i) => (i! + 1) % items.length)}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-lilac transition-all hover:border-primary hover:glow-soft"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>

                {current.link && (
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:glow-strong glow-soft"
                  >
                    <ExternalLink className="size-4" />
                    {current.linkLabel}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
