import { Nav } from "@/components/Nav";
import { Eyebrow } from "@/components/Eyebrow";
import { Timeline } from "@/components/Timeline";
import { coupleNames } from "@/lib/content/site-content";

export default function HistoriaPage() {
  return (
    <main>
      <Nav />
      <section className="bg-neve px-6 pb-4 pt-14 text-center">
        <Eyebrow>Nossa história</Eyebrow>
        <h1 className="font-script mt-4 text-[42px] text-preto">
          {coupleNames.display}
        </h1>
      </section>
      <Timeline />
    </main>
  );
}
