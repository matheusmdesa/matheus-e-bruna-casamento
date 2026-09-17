import { timelineMilestones } from "@/lib/content/site-content";

export function Timeline() {
  return (
    <ol className="mx-auto max-w-[360px] px-6 py-14">
      {timelineMilestones.map((milestone, index) => (
        <li key={milestone.title} className="relative pb-10 pl-8 last:pb-0">
          {index < timelineMilestones.length - 1 && (
            <span
              className="absolute left-[5px] top-3 h-full w-px bg-cinza-claro"
              aria-hidden="true"
            />
          )}
          <span
            className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-preto bg-neve"
            aria-hidden="true"
          />
          <h3 className="font-serif text-lg font-semibold text-preto">
            {milestone.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-grafite">
            {milestone.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
