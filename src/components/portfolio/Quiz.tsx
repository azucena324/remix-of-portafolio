import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RotateCcw, Mail } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";
import { PROFILE } from "./data";

type Style = "energetico" | "cinematico" | "musical";

const QUESTIONS: { q: string; options: { label: string; value: Style }[] }[] = [
  {
    q: "¿Para dónde es tu video?",
    options: [
      { label: "TikTok, Reels o Shorts", value: "energetico" },
      { label: "Un anuncio de producto", value: "cinematico" },
      { label: "Una canción o letra", value: "musical" },
    ],
  },
  {
    q: "¿Qué ritmo te gusta más?",
    options: [
      { label: "Rápido, con cortes al beat", value: "energetico" },
      { label: "Elegante y pausado", value: "cinematico" },
      { label: "Al compás de la música", value: "musical" },
    ],
  },
  {
    q: "¿Qué es lo más importante?",
    options: [
      { label: "Que enganche en 3 segundos", value: "energetico" },
      { label: "Que el producto se vea increíble", value: "cinematico" },
      { label: "Que se sienta la emoción", value: "musical" },
    ],
  },
];

const RESULTS: Record<Style, { title: string; text: string; tags: string[] }> = {
  energetico: {
    title: "Estilo energético",
    text: "Cortes rápidos, textos que aparecen al ritmo y color saturado. Perfecto para redes sociales donde cada segundo cuenta.",
    tags: ["TikTok · Reels · Shorts", "Subtítulos animados", "Transiciones dinámicas"],
  },
  cinematico: {
    title: "Estilo cinematográfico",
    text: "Tomas limpias, color cuidado y un cierre con tu marca. Ideal para anuncios que quieren verse caros.",
    tags: ["Anuncios de producto", "Corrección de color", "Composición visual"],
  },
  musical: {
    title: "Estilo musical",
    text: "Letras sincronizadas, atmósfera y visuales creados con Inteligencia Artificial. Para que tu canción se sienta.",
    tags: ["Lyrics animados", "Visuales con IA", "Sincronización"],
  },
};

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Style[]>([]);

  const pick = (value: Style) => {
    setAnswers((prev) => [...prev, value]);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  const winner: Style | null =
    answers.length === QUESTIONS.length
      ? (Object.entries(
          answers.reduce<Record<string, number>>((acc, a) => {
            acc[a] = (acc[a] ?? 0) + 1;
            return acc;
          }, {}),
        ).sort((a, b) => b[1] - a[1])[0]![0] as Style)
      : null;

  const progress = (answers.length / QUESTIONS.length) * 100;

  return (
    <section id="quiz" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionTitle eyebrow="Interactivo" title="¿Qué estilo va contigo?" />

      <Reveal>
        <div className="glass-panel mx-auto max-w-2xl rounded-3xl p-6 sm:p-10">
          <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!winner ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
              >
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Pregunta {step + 1} de {QUESTIONS.length}
                </p>
                <h3 className="mb-6 text-xl sm:text-2xl">{QUESTIONS[step]!.q}</h3>
                <div className="flex flex-col gap-3">
                  {QUESTIONS[step]!.options.map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => pick(o.value)}
                      className="group flex items-center justify-between rounded-2xl border border-border bg-secondary/30 px-5 py-4 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-secondary/60 hover:glow-soft"
                    >
                      <span>{o.label}</span>
                      <Sparkles className="size-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Tu resultado</p>
                <h3 className="mb-3 text-2xl sm:text-3xl">
                  <span className="text-gradient-violet">{RESULTS[winner].title}</span>
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {RESULTS[winner].text}
                </p>
                <div className="mb-7 flex flex-wrap gap-2">
                  {RESULTS[winner].tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-lilac"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
                      `Quiero un video con ${RESULTS[winner].title.toLowerCase()}`,
                    )}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all glow-soft hover:glow-strong"
                  >
                    <Mail className="size-4" />
                    Pedir mi video
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary/60"
                  >
                    <RotateCcw className="size-4" />
                    Volver a empezar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
