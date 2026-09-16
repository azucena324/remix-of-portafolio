import { useEffect, useState } from "react";
import { NAV, PROFILE } from "./data";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.2, 0.5] },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass-panel" : "border border-transparent"
        } mx-4 sm:mx-auto`}
        aria-label="Navegación principal"
      >
        <button
          onClick={() => go("inicio")}
          className="group flex items-center gap-2 text-sm font-semibold tracking-widest text-foreground"
        >
          <span className="h-2 w-2 rounded-full bg-primary glow-soft animate-pulse-glow" />
          <span className="uppercase">{PROFILE.name.split(" ")[0]}</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === n.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-lilac"
                }`}
              >
                {active === n.id && (
                  <span className="absolute inset-0 rounded-full bg-secondary/70 glow-soft" />
                )}
                <span className="relative">{n.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden rounded-full border border-border p-2 text-lilac"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {open && (
        <ul className="glass-panel mx-4 mt-2 grid gap-1 rounded-3xl p-3 md:hidden">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className={`w-full rounded-2xl px-4 py-2.5 text-left text-sm ${
                  active === n.id ? "bg-secondary/70 text-foreground" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
