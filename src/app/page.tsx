import { Nav } from "@/components/Nav";
import { Medallion } from "@/components/Medallion";
import { Ribbon } from "@/components/Ribbon";
import { Eyebrow } from "@/components/Eyebrow";
import { EssenceRow } from "@/components/EssenceRow";
import { Countdown } from "@/components/Countdown";
import { coupleNames, eventInfo } from "@/lib/content/site-content";

export default function Home() {
  return (
    <main>
      <Nav />

      <section className="relative flex flex-col items-center overflow-hidden bg-preto px-6 pb-[50px] pt-[46px]">
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_40px_rgba(0,0,0,0.7)]" />
        <Eyebrow tone="light">Vamos nos casar</Eyebrow>
        <Medallion initials={coupleNames.initials} />
        <h1 className="font-script mt-6 text-center text-[44px] text-neve md:text-[58px]">
          {coupleNames.display}
        </h1>
        <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-white/55">
          {eventInfo.dateLabel}
        </p>
        <Ribbon>SAVE&nbsp;&nbsp;THE&nbsp;&nbsp;DATE</Ribbon>
      </section>

      <EssenceRow />

      <section className="bg-grain bg-neve px-8 pb-[46px] pt-[54px] text-center">
        <Eyebrow>Bem-vindos</Eyebrow>
        <h2 className="font-script mt-4 text-[46px] text-preto">
          {coupleNames.display}
        </h2>
        <p className="mx-auto mt-4 max-w-[350px] font-serif text-[17px] italic leading-[1.75] text-grafite">
          &ldquo;Estamos muito felizes em ter vocês conosco para celebrar o início da
          nossa história juntos.&rdquo;
        </p>
        <p className="mt-3.5 text-[11px] text-cinza-medio">
          Role para conhecer nossa história e todos os detalhes do grande dia
        </p>
        <Countdown targetDateISO={eventInfo.dateISO} />
      </section>
    </main>
  );
}
