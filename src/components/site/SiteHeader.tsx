import { Link } from "@tanstack/react-router";
import { Crown } from "lucide-react";

const links = [
  { href: "#celcsoport", label: "Célcsoport" },
  { href: "#vallalati", label: "Vállalati" },
  { href: "#firewalls", label: "3 Tűzfal" },
  { href: "#jogsi", label: "JOGSI" },
  { href: "#andrea", label: "Rólam" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Crown className="h-5 w-5 text-terracotta transition-transform group-hover:rotate-[-6deg]" strokeWidth={1.5} />
          <span className="font-serif text-lg tracking-tight">
            Critical<span className="italic text-terracotta">Thinking</span>.hu
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-ink-soft hover:text-terracotta transition-colors relative after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:bg-terracotta after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#kapcsolat"
          className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-ink text-cream hover:bg-terracotta-deep transition-colors"
        >
          Beszéljünk
        </a>
      </div>
    </header>
  );
}
