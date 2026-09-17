import { Nav } from "@/components/Nav";
import { Eyebrow } from "@/components/Eyebrow";
import { DetailsCard } from "@/components/DetailsCard";
import { LocationIcon, ReceptionIcon } from "@/components/icons/LineIcons";
import { eventInfo, eventSchedule, coupleNames } from "@/lib/content/site-content";
import { buildGoogleMapsUrl } from "@/lib/maps";

export default function EventoPage() {
  const mapsUrl = buildGoogleMapsUrl(eventInfo.addressForMaps);

  return (
    <main>
      <Nav />
      <section className="flex flex-col items-center bg-preto px-6 pb-14 pt-14">
        <Eyebrow tone="light">Onde &amp; quando</Eyebrow>
        <div className="mt-6">
          <DetailsCard seal={coupleNames.initials}>
            {eventSchedule.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5">
                {item.title === "Cerimônia" ? (
                  <LocationIcon className="mt-0.5 h-4 w-4 flex-none text-cinza-medio" />
                ) : (
                  <ReceptionIcon className="mt-0.5 h-4 w-4 flex-none text-cinza-medio" />
                )}
                <p className="text-[11px] font-light leading-relaxed text-grafite">
                  <span className="mb-0.5 block text-[9.5px] font-medium uppercase tracking-[0.08em] text-preto">
                    {item.title}
                  </span>
                  {item.description}
                </p>
              </div>
            ))}
          </DetailsCard>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-7 border border-white/50 px-7 py-3 text-[10px] uppercase tracking-[0.25em] text-neve"
        >
          Ver no mapa
        </a>
      </section>
    </main>
  );
}
