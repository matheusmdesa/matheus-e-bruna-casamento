import { useId } from "react";

type MedallionProps = { initials?: string };

export function Medallion({ initials = "B · M" }: MedallionProps) {
  return (
    <div className="flex flex-col items-center">
      <Flourish />
      <div
        className="relative flex h-[132px] w-[132px] items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #eee 0%, #9a9a9a 22%, #fff 42%, #6e6e6e 58%, #f5f5f5 78%, #8a8a8a 100%)",
          boxShadow:
            "0 2px 4px rgba(255,255,255,0.5) inset, 0 -3px 6px rgba(0,0,0,0.6) inset, 0 10px 26px rgba(0,0,0,0.55)",
        }}
      >
        <div className="absolute inset-[10px] rounded-full border border-black/35 shadow-[0_1px_2px_rgba(255,255,255,0.6)_inset]" />
        <div
          className="flex h-[82px] w-[82px] items-center justify-center rounded-full"
          style={{
            background: "radial-gradient(circle at 38% 32%, #2b2b2b, #050505 72%)",
            boxShadow: "0 0 0 2px rgba(0,0,0,0.4), 0 3px 10px rgba(0,0,0,0.6) inset",
          }}
        >
          <span className="font-serif text-2xl tracking-[0.08em] text-neve">
            {initials}
          </span>
        </div>
      </div>
      <Flourish flip />
    </div>
  );
}

function Flourish({ flip = false }: { flip?: boolean }) {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 100 70"
      className={`block h-[38px] w-[54px] ${flip ? "-mt-1.5 scale-y-[-1]" : "-mb-1.5"}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eeeeee" />
          <stop offset="25%" stopColor="#8f8f8f" />
          <stop offset="45%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#6a6a6a" />
          <stop offset="100%" stopColor="#c9c9c9" />
        </linearGradient>
      </defs>
      <path
        d="M50 70 C 50 45, 30 40, 20 20 C 14 8, 22 2, 32 6 C 40 9, 40 20, 34 24 C 46 18, 54 18, 66 24 C 60 20, 60 9, 68 6 C 78 2, 86 8, 80 20 C 70 40, 50 45, 50 70 Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
