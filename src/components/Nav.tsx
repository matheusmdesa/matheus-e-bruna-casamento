import Link from "next/link";
import { coupleNames } from "@/lib/content/site-content";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/historia", label: "História" },
  { href: "/evento", label: "Evento" },
  { href: "/rsvp", label: "RSVP" },
];

export function Nav() {
  return (
    <nav className="flex items-center justify-center gap-5 bg-preto px-2.5 py-3.5 text-[9px] uppercase tracking-[0.2em] text-white/55">
      <span className="mr-1 text-[11px] tracking-[0.25em] text-neve">{coupleNames.initials}</span>
      {LINKS.map((link, index) => (
        <span key={link.href} className="flex items-center gap-5">
          {index > 0 ? <span className="text-white/20">·</span> : null}
          <Link href={link.href} className="inline-block py-2 hover:text-neve">
            {link.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
