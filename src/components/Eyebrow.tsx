type EyebrowProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
};

export function Eyebrow({ children, tone = "dark" }: EyebrowProps) {
  return (
    <p
      className={`text-[10px] uppercase tracking-[0.4em] ${
        tone === "light" ? "text-white/55" : "text-cinza-medio"
      }`}
    >
      {children}
    </p>
  );
}
