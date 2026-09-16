import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  tw: number;
  phase: number;
};

type Mote = {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  hueShift: number;
};

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let motes: Mote[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = isMobile ? 9000 : 4200;
      const starCount = Math.min(420, Math.floor((width * height) / density));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.3 + Math.random() * 0.7,
        r: Math.random() * 1.3 + 0.25,
        tw: 0.6 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      }));

      const moteCount = isMobile ? 10 : 26;
      motes = Array.from({ length: moteCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.4 + Math.random() * 0.9,
        r: 1 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -0.05 - Math.random() * 0.16,
        hueShift: Math.random(),
      }));
    };

    build();

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // interactive extras: shooting stars + click ripples
    type Shooting = { x: number; y: number; vx: number; vy: number; life: number };
    type Ripple = { x: number; y: number; r: number; life: number };
    let shooting: Shooting[] = [];
    let ripples: Ripple[] = [];
    const mouse = { x: -9999, y: -9999 };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onClick = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
      if (ripples.length > 6) ripples.shift();
    };

    let raf = 0;
    let t = 0;

    const render = () => {
      t += 0.006;
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      ctx.clearRect(0, 0, width, height);

      const near: { x: number; y: number; d: number }[] = [];
      const linkDist = 150;

      for (const s of stars) {
        let px = s.x + pointer.x * 22 * s.z;
        let py = s.y + pointer.y * 22 * s.z + Math.sin(t * s.tw + s.phase) * 1.2;
        let alpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * s.tw * 1.6 + s.phase));
        let radius = s.r * s.z;

        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < linkDist) {
          const force = (1 - d / linkDist) ** 2;
          px += (dx / (d || 1)) * force * 26;
          py += (dy / (d || 1)) * force * 26;
          alpha = Math.min(1, alpha + force * 0.8);
          radius += force * 0.9;
          if (near.length < 60) near.push({ x: px, y: py, d });
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(233, 225, 255, ${alpha * s.z})`;
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // constellation lines toward the cursor
      if (mouse.x > -1000) {
        for (const n of near) {
          const a = (1 - n.d / linkDist) * 0.35;
          ctx.strokeStyle = `rgba(196, 150, 255, ${a})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        halo.addColorStop(0, "rgba(168, 108, 255, 0.16)");
        halo.addColorStop(1, "rgba(168, 108, 255, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      // shooting stars
      if (Math.random() < 0.004 && shooting.length < 3) {
        const startX = Math.random() * width * 0.9;
        shooting.push({ x: startX, y: -20, vx: 3 + Math.random() * 2.5, vy: 2 + Math.random() * 1.8, life: 1 });
      }
      shooting = shooting.filter((sh) => sh.life > 0 && sh.y < height + 60);
      for (const sh of shooting) {
        sh.x += sh.vx * 3;
        sh.y += sh.vy * 3;
        sh.life -= 0.006;
        const trail = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 26, sh.y - sh.vy * 26);
        trail.addColorStop(0, `rgba(240, 226, 255, ${0.9 * sh.life})`);
        trail.addColorStop(1, "rgba(168, 108, 255, 0)");
        ctx.strokeStyle = trail;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 26, sh.y - sh.vy * 26);
        ctx.stroke();
      }

      // click ripples
      ripples = ripples.filter((r) => r.life > 0);
      for (const rp of ripples) {
        rp.r += 6;
        rp.life -= 0.02;
        ctx.strokeStyle = `rgba(200, 150, 255, ${rp.life * 0.5})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const m of motes) {
        m.x += m.vx + pointer.x * 0.08;
        m.y += m.vy;
        if (m.y < -20) m.y = height + 20;
        if (m.x < -20) m.x = width + 20;
        if (m.x > width + 20) m.x = -20;

        const px = m.x + pointer.x * 46 * m.z;
        const py = m.y + pointer.y * 46 * m.z;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, m.r * 9);
        const light = m.hueShift > 0.6 ? "210, 180, 255" : "168, 108, 255";
        grd.addColorStop(0, `rgba(${light}, 0.85)`);
        grd.addColorStop(1, "rgba(120, 60, 220, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, m.r * 9, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    if (reduced) {
      render();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(render);
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onClick, { passive: true });
    }

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-x-[-20%] top-[6%] h-[45vh] aurora-band animate-aurora" />
      <div
        className="absolute inset-x-[-20%] top-[45%] h-[40vh] aurora-band animate-aurora"
        style={{ animationDelay: "-11s", animationDuration: "34s" }}
      />
      <div className="absolute inset-0 star-grid opacity-60" />
      <div className="absolute -left-32 top-[-10%] h-[520px] w-[520px] nebula-blob animate-float-slow opacity-70" />
      <div className="absolute right-[-12%] top-[28%] h-[620px] w-[620px] nebula-blob animate-drift opacity-60" />
      <div className="absolute bottom-[-15%] left-[20%] h-[560px] w-[560px] nebula-blob animate-float-slow opacity-50" />
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,oklch(0.05_0.02_295/0.85)_100%)]" />
    </div>
  );
}
