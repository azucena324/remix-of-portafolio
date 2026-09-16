import { PROFILE } from "./data";
import adFashion from "@/assets/ad-fashion.jpg.asset.json";
import adPizza from "@/assets/ad-pizza.jpg.asset.json";
import adFeel from "@/assets/ad-feel.jpg.asset.json";
import lyric from "@/assets/lyric-cant-sleep.jpg.asset.json";
import ytFadeOut from "@/assets/youtube-fade-out.jpg.asset.json";
import adCentella from "@/assets/ad-centella.png.asset.json";
import adAdidas from "@/assets/ad-adidas.png.asset.json";
import adPina from "@/assets/ad-pina.png.asset.json";
import adAnillos from "@/assets/ad-anillos.png.asset.json";
import adFashionKids from "@/assets/ad-fashion-kids.png.asset.json";

export type Work = {
  id: string;
  title: string;
  category: "Música" | "Anuncios";
  description: string;
  image: string;
  link: string | null;
  linkLabel?: string;
};

export const WORKS: Work[] = [
  {
    id: "w1",
    title: "Fade Out — SYX | Letra Oficial",
    category: "Música",
    description:
      "Video de letra oficial para mi canal de música: voces con IA, edición completa y lyrics animados sincronizados.",
    image: ytFadeOut.url,
    link: PROFILE.youtube,
    linkLabel: "Ver en YouTube",
  },
  {
    id: "w2",
    title: "Can't Sleep Again — Lost in Thought",
    category: "Música",
    description:
      "Diseño y sincronización de lyrics animados con tipografías mezcladas para un tema lento y emocional.",
    image: lyric.url,
    link: PROFILE.youtube,
    linkLabel: "Ver en YouTube",
  },
  {
    id: "w3",
    title: "Fashion — Zapatillas deportivas",
    category: "Anuncios",
    description:
      "Anuncio de calzado infantil talla 25 al 30: composición con tipografía repetida, alto contraste y foco en el producto.",
    image: adFashion.url,
    link: null,
  },
  {
    id: "w4",
    title: "Deliciosa Pizza",
    category: "Anuncios",
    description:
      "Pieza publicitaria de comida con recortes, sombras y tipografía superpuesta para dar apetito y movimiento.",
    image: adPizza.url,
    link: null,
  },
  {
    id: "w5",
    title: "Feel — Hair Support",
    category: "Anuncios",
    description:
      "Anuncio de suplementos en tonos lila: composición limpia, reflejo del producto y estilo minimalista.",
    image: adFeel.url,
    link: null,
  },
  {
    id: "w6",
    title: "Centella Bioaqua — Reparación facial",
    category: "Anuncios",
    description:
      "Anuncio de crema facial en tonos verdes: beneficios con flechas curvas, tipografía bold y composición diagonal.",
    image: adCentella.url,
    link: null,
  },
  {
    id: "w7",
    title: "Adidas Mint Glow",
    category: "Anuncios",
    description:
      "Anuncio de tenis Adidas en verde menta: tipografía vertical gigante, descripción del producto y estilo fresco y elegante.",
    image: adAdidas.url,
    link: null,
  },
  {
    id: "w8",
    title: "Volteado de Piña",
    category: "Anuncios",
    description:
      "Pieza navideña de postre con luces cálidas, personajes ilustrados y tipografía grande sobre la fotografía del producto.",
    image: adPina.url,
    link: null,
  },
  {
    id: "w9",
    title: "Anillos La Eternidad",
    category: "Anuncios",
    description:
      "Anuncio de joyería en tonos rojos: composición dividida, tipografía superpuesta y etiqueta de precio como detalle.",
    image: adAnillos.url,
    link: null,
  },
  {
    id: "w10",
    title: "Fashion — Zapatillas para niños",
    category: "Anuncios",
    description:
      "Anuncio de zapatillas deportivas infantiles en azul: tipografía repetida de gran formato y foco total en el producto.",
    image: adFashionKids.url,
    link: null,
  },
];

export const WORK_CATEGORIES = ["Todos", "Música", "Anuncios"] as const;
