export const PROFILE = {
  name: "Vicky Andino",
  role: "Editora de videos",
  tagline: "Ediciones que conectan con tu audiencia",
  subject: "Edición de Video Creativa",
  intro:
    "Soy Vicky, una apasionada de la edición de video desde pequeña. Me encanta transformar clips en historias creativas, usando colores, ritmo y emoción para conectar con las personas.",
  email: "azucenaandino91@gmail.com",
  youtube: "https://www.youtube.com/@syxmusic-o1e",
};

export const ABOUT = [
  {
    title: "Mi hobby",
    text: "Mi principal hobby es la edición de video, que me permite transformar ideas en historias visuales y explorar mi creatividad. También disfruto aprender nuevas técnicas y herramientas que me ayuden a mejorar mis proyectos y ampliar mi estilo.",
  },
  {
    title: "Inteligencia Artificial",
    text: "Además, me interesa integrar herramientas de Inteligencia Artificial en mi proceso creativo. Esto me permite experimentar con nuevas ideas, optimizar mi tiempo y dar un valor innovador a cada proyecto que realizo.",
  },
];

export const SKILLS = [
  {
    category: "Habilidades técnicas",
    items: [
      "Edición de video para TikTok, Reels, Shorts y anuncios",
      "Creación y sincronización de lyrics animados",
      "Uso de IA para voces y recursos creativos",
      "Diseño básico en Canva y edición de imágenes",
      "Corrección de color y transiciones dinámicas",
      "Dominio de las herramientas de Office (Word, Excel, PowerPoint)",
      "Motion graphics: animaciones, textos y elementos en movimiento",
      "Edición en CapCut y Alight Motion (celular y PC)",
      "Diapositivas animadas e informes profesionales",
    ],
  },
  {
    category: "Habilidades creativas",
    items: [
      "Storytelling visual y creación de contenido atractivo",
      "Innovación en estilos y tendencias de edición",
      "Adaptación de contenido a distintas plataformas",
      "Creatividad en composición audiovisual y música",
      "Manejo de cuentas de diferentes redes sociales",
      "Adaptación a cualquier estilo de video",
    ],
  },
];

export const TOOLS = [
  "CapCut (celular y PC)",
  "Alight Motion",
  "Herramientas de edición para PC",
  "Motion graphics",
  "Inteligencia Artificial",
  "Canva",
  "Office (Word, Excel, PowerPoint)",
  "YouTube",
  "TikTok",
  "Reels",
  "Shorts",
  "Gestión de redes sociales",
];

export type EditVideo = {
  id: string;
  title: string;
  style: string;
  src: string;
};

// Videos de edición de Vicky (vista previa directa en la página)
export const EDIT_VIDEOS: EditVideo[] = [
  {
    id: "v1",
    title: "Anuncio publicitario de producto 1",
    style: "Publicitario",
    src: "https://videotourl.com/videos/1789571448948-5c991b9d-f167-4279-9506-2605c2fc365d.mp4",
  },
  {
    id: "v2",
    title: "Anuncio publicitario de producto 2",
    style: "Publicitario",
    src: "https://videotourl.com/videos/1789571518035-a61e7c2c-b2b6-417c-a45d-36a5f2660e9b.mp4",
  },
  {
    id: "v3",
    title: "Anuncio publicitario de producto 3",
    style: "Publicitario",
    src: "https://videotourl.com/videos/1789571546868-cb38172f-6bc6-4354-a204-70d4b440fbcb.mp4",
  },
];

export const PROJECTS = [
  {
    id: "p1",
    label: "Proyecto 01",
    title: "Canal de YouTube de producción musical",
    summary:
      "Mi primer proyecto personal: un canal dedicado a la producción musical con voces generadas por IA y lyrics animados.",
    detail:
      "Desarrollé mi primer proyecto personal creando un canal de YouTube dedicado a la producción musical. Utilicé inteligencia artificial para generar las voces y realicé de forma completa la edición de los videos, incluyendo la creación, diseño y sincronización de los lyrics animados.",
    tech: ["Inteligencia Artificial (voces)", "Edición de video", "Lyrics animados", "Sincronización"],
    link: PROFILE.youtube,
    works: ["w1", "w2"],
  },
  {
    id: "p2",
    label: "Proyecto 02",
    title: "Anuncios publicitarios de productos",
    summary:
      "Ediciones publicitarias para productos: calzado, comida, joyería y cuidado de la piel.",
    detail:
      "Anuncios publicitarios de productos presentados en mi portafolio: calzado de moda y deportivo, pizza, volteado de piña, anillos, suplementos para el cabello y crema facial.",
    tech: ["Edición publicitaria", "Composición visual", "Corrección de color"],
    link: null,
    works: ["w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10"],
  },
  {
    id: "p3",
    label: "Proyecto 03",
    title: "Página web del Instituto San Juan Bosco",
    summary:
      "Diseño y desarrollo de una página web para un instituto: información institucional, ofrecida al público en línea.",
    detail:
      "Creé una página web completa para el Instituto San Juan Bosco: un sitio moderno, ordenado y fácil de navegar, donde se presenta la información del instituto. Desde el diseño hasta la publicación en línea del sitio.",
    tech: ["Diseño web", "Desarrollo de páginas", "Contenido institucional", "Publicación en línea"],
    link: "https://instituto-san-juan-bosco.vercel.app/",
    works: [],
  },
];

export const TIMELINE = [
  {
    title: "Formación Académica",
    subtitle: "Bachillerato en Informática (actualmente)",
    text: "Actualmente curso Bachillerato en Informática, donde desarrollo habilidades en tecnología, software y herramientas digitales que complementan mi pasión por la edición y el diseño creativo.",
  },
  {
    title: "Aprendizaje Complementario",
    subtitle: "Autodidacta e investigativo",
    text: "He explorado de manera autodidacta e investigativa el diseño gráfico, la edición de video y herramientas de Inteligencia Artificial, complementando mi formación académica y fortaleciendo mi creatividad.",
  },
  {
    title: "Experiencia en proyectos",
    subtitle: "Trabajos para varias personas",
    text: "He realizado varios trabajos para diferentes personas: edición de videos, edición de fotos, diapositivas animadas e informes. Cada encargo me ha permitido adaptarme a distintos estilos, cumplir objetivos específicos y entregar resultados a tiempo.",
  },
  {
    title: "Práctica creativa",
    subtitle: "Mejora continua",
    text: "Cada proyecto, por pequeño que sea, ha sido una oportunidad para reforzar mi creatividad, mejorar mi técnica y experimentar con nuevas herramientas, incluyendo Inteligencia Artificial.",
  },
];

export const SERVICES = [
  {
    title: "Edición para redes sociales",
    text: "Videos para TikTok, Reels y Shorts adaptados a cada plataforma.",
    icon: "smartphone",
  },
  {
    title: "Anuncios publicitarios",
    text: "Anuncios sencillos y dinámicos para presentar productos.",
    icon: "megaphone",
  },
  {
    title: "Lyrics animados",
    text: "Creación, diseño y sincronización de letras animadas para música.",
    icon: "music",
  },
  {
    title: "Recursos con IA",
    text: "Uso de Inteligencia Artificial para voces y recursos creativos.",
    icon: "sparkles",
  },
  {
    title: "Diseño y edición de imágenes",
    text: "Diseño básico en Canva y edición de imágenes.",
    icon: "image",
  },
  {
    title: "Color y transiciones",
    text: "Corrección de color y transiciones dinámicas en cada edición.",
    icon: "palette",
  },
  {
    title: "Informes y diapositivas",
    text: "Informes profesionales, diapositivas animadas y cálculos en Excel.",
    icon: "presentation",
  },
  {
    title: "Diseño de páginas web",
    text: "Creación y publicación de páginas web modernas y fáciles de navegar.",
    icon: "globe",
  },
  {
    title: "Gestión de redes sociales",
    text: "Manejo de cuentas y contenido para distintas redes sociales.",
    icon: "share",
  },
];

export const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "habilidades", label: "Habilidades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "galeria", label: "Galería" },
  { id: "videos", label: "Mis videos" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];
