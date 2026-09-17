import type { ReactNode } from "react";

type DetailsCardProps = {
  seal?: string;
  children: ReactNode;
};

export function DetailsCard({ seal = "B · M", children }: DetailsCardProps) {
  return (
    <div className="grid w-full max-w-[400px] grid-cols-2 bg-neve shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col items-center justify-center border-r border-dashed border-black/20 px-5 py-8 text-center">
        <span className="font-serif text-sm uppercase tracking-[0.2em] text-preto">
          Os
        </span>
        <span className="font-script mb-3.5 text-[32px] text-preto">Detalhes</span>
        <span
          className="flex h-[54px] w-[54px] items-center justify-center rounded-full font-serif text-[15px] tracking-[0.05em] text-neve"
          style={{
            background: "radial-gradient(circle at 35% 30%, #2b2b2b, #050505 72%)",
            boxShadow:
              "0 0 0 2px var(--neve), 0 0 0 3px rgba(0,0,0,0.3), 0 6px 14px rgba(0,0,0,0.4)",
          }}
        >
          {seal}
        </span>
      </div>
      <div className="flex flex-col justify-center gap-4 px-5 py-6">{children}</div>
    </div>
  );
}
