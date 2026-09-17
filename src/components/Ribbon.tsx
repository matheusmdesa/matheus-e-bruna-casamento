type RibbonProps = { children: React.ReactNode };

export function Ribbon({ children }: RibbonProps) {
  const face = "border-y border-white/25 bg-[linear-gradient(180deg,#262626,#101010)]";
  return (
    <div className="relative inline-block">
      <div className={`${face} px-8 py-2.5 text-xs tracking-[0.3em] text-cinza-claro`}>
        {children}
      </div>
      <span
        className={`absolute inset-y-0 -left-3 w-3 ${face}`}
        style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
      />
      <span
        className={`absolute inset-y-0 -right-3 w-3 ${face}`}
        style={{ clipPath: "polygon(100% 50%, 0 0, 0 100%)" }}
      />
    </div>
  );
}
