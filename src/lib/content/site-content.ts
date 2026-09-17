export type EssencePhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type TimelineMilestone = {
  title: string;
  description: string;
};

export type EventScheduleItem = {
  title: string;
  time: string;
  description: string;
};

export const coupleNames = {
  first: "Bruna",
  second: "Matheus",
  display: "Bruna & Matheus",
  initials: "B · M",
} as const;

export const eventInfo = {
  dateISO: "2026-04-04",
  dateLabel: "04 de Abril de 2026",
  ceremonyTime: "16h",
  venueName: "Espaço [Local a definir]",
  addressForMaps: "Espaço [Local a definir], [Endereço a definir]",
};

export const essencePhotos: EssencePhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1610599905000-a8093ff22a55?w=500&q=80&auto=format&fit=crop",
    alt: "Gravata borboleta",
    caption: "Ele",
  },
  {
    src: "https://images.unsplash.com/photo-1727808103644-9fe53796560d?w=500&q=80&auto=format&fit=crop",
    alt: "Alianças de casamento",
    caption: "Nós",
  },
  {
    src: "https://images.unsplash.com/photo-1613341689162-376a6c2f7b64?w=500&q=80&auto=format&fit=crop",
    alt: "Buquê de tulipas",
    caption: "Ela",
  },
];

export const timelineMilestones: TimelineMilestone[] = [
  {
    title: "Como nos conhecemos",
    description: "Texto a ser preenchido pelos noivos.",
  },
  {
    title: "O primeiro encontro",
    description: "Texto a ser preenchido pelos noivos.",
  },
  {
    title: "O pedido",
    description: "Texto a ser preenchido pelos noivos.",
  },
];

export const eventSchedule: EventScheduleItem[] = [
  {
    title: "Cerimônia",
    time: "16h",
    description: `${eventInfo.ceremonyTime} · ${eventInfo.venueName}`,
  },
  {
    title: "Recepção",
    time: "18h",
    description: "Jantar, discursos e festa",
  },
];
