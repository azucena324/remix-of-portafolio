import { useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { EDIT_VIDEOS } from "./data";

export function Videos() {
  return (
    <section id="videos" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Edición de video</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Mis videos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Me adapto a cualquier estilo de video: musical, publicitario, para redes o lo que tu
            proyecto necesite. Mira algunos de mis trabajos aquí mismo.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EDIT_VIDEOS.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, index }: { video: (typeof EDIT_VIDEOS)[number]; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
      className="group overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur"
    >
      <div className="relative aspect-video overflow-hidden bg-background/60">
        {playing ? (
          <video
            src={video.src}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Reproducir ${video.title}`}
            className="absolute inset-0 h-full w-full"
          >
            <video
              src={video.src}
              preload="metadata"
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 fill-current" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-4">
        <h3 className="font-display text-base font-semibold leading-snug">{video.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-lilac">{video.style}</p>
      </figcaption>
    </motion.figure>
  );
}
