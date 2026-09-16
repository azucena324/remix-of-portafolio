import { useState } from "react";
import { Reveal, SectionTitle } from "./Reveal";
import { PROFILE } from "./data";
import { Mail, Send, Youtube, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) {
      toast.error("Completa tu correo y mensaje");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/moeqjqpa", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        toast.success("¡Mensaje enviado!");
      } else {
        setStatus("error");
        toast.error("No se pudo enviar. Intenta de nuevo.");
      }
    } catch {
      setStatus("error");
      toast.error("No se pudo enviar. Intenta de nuevo.");
    }
  };

  return (
    <section id="contacto" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Contacto" title="Edición y creatividad" />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="glass-panel flex h-full flex-col justify-between gap-8 rounded-3xl p-7 sm:p-9">
              <p className="text-base leading-relaxed text-foreground/90">
                {PROFILE.tagline}. Escríbeme y conversemos sobre tu próximo video.
              </p>
              <div className="grid gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-secondary/25 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:glow-soft"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/25 text-lilac transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                      Correo
                    </span>
                    <span className="block truncate text-sm text-foreground">
                      {PROFILE.email}
                    </span>
                  </span>
                </a>
                <a
                  href={PROFILE.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-secondary/25 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:glow-soft"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/25 text-lilac transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Youtube className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                      YouTube
                    </span>
                    <span className="block truncate text-sm text-foreground">@syxmusic-o1e</span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form onSubmit={submit} className="glass-panel grid gap-5 rounded-3xl p-7 sm:p-9">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                  <CheckCircle2 className="size-14 text-lilac" />
                  <p className="text-lg font-semibold text-foreground">¡Mensaje enviado!</p>
                  <p className="text-sm text-muted-foreground">
                    Gracias por escribirme. Te responderé pronto.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-2.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary hover:text-lilac"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Nombre
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-2xl border border-input bg-secondary/25 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:glow-soft"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Tu correo
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-2xl border border-input bg-secondary/25 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:glow-soft"
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none rounded-2xl border border-input bg-secondary/25 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:glow-soft"
                      placeholder="Cuéntame qué video quieres crear"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:glow-strong glow-soft disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-lg font-semibold text-gradient-violet">{PROFILE.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Creatividad y tecnología en cada corte.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-lilac"
          >
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.youtube}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-lilac"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
