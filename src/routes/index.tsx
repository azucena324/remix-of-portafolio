import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "@/components/space/StarField";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Gallery } from "@/components/portfolio/Gallery";
import { Videos } from "@/components/portfolio/Videos";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Timeline } from "@/components/portfolio/Timeline";
import { Services } from "@/components/portfolio/Services";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Victoria Andino | Editora de Video Creativa" },
      {
        name: "description",
        content:
          "Portafolio de Victoria Andino, editora de video: TikTok, Reels, Shorts, anuncios, lyrics animados, informes, páginas web y gestión de redes sociales.",
      },
      { property: "og:title", content: "Victoria Andino | Editora de Video Creativa" },
      {
        property: "og:description",
        content:
          "Ediciones, anuncios y páginas web que conectan con tu audiencia. Portafolio de edición de video creativa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarField />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <Videos />
        <Timeline />
        <Services />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
