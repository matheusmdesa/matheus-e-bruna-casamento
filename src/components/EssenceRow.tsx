import { essencePhotos } from "@/lib/content/site-content";
import { Eyebrow } from "./Eyebrow";

export function EssenceRow() {
  return (
    <div className="bg-preto pb-[54px] pt-2 text-center">
      <Eyebrow tone="light">Nossa essência</Eyebrow>
      <div className="mt-6 flex gap-3 px-5">
        {essencePhotos.map((photo) => (
          <div key={photo.src} className="relative aspect-[3/4] flex-1 overflow-hidden">
            {/* Fotos placeholder de banco de imagens livre — serão editáveis
                pelo admin na Etapa 3. next/image não é usado aqui de propósito
                para não exigir configurar remotePatterns para um domínio
                temporário que vai mudar. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover grayscale contrast-[1.08] brightness-[0.95]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 78% 78% at 50% 50%, #000 55%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 78% 78% at 50% 50%, #000 55%, transparent 100%)",
              }}
            />
            <span className="absolute inset-x-0 -bottom-0.5 text-center text-[8.5px] uppercase tracking-[0.2em] text-white/45">
              {photo.caption}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
