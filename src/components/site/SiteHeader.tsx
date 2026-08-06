import { Link } from "@tanstack/react-router";
import logoFullColor from "@/assets/brand/criticalthinking-logo-full-color.svg";

const links = [
  { href: "#firewalls", label: "3 Tűzfal" },
  { href: "#andrea", label: "Rólam" },
  { href: "#hamarosan", label: "Amin dolgozom" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img
            src={logoFullColor}
            alt="criticalthinking.hu — 3 Mentális Tűzfal"
            className="h-8 md:h-9 w-auto transition-transform group-hover:scale-[1.02]"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-ink-soft hover:text-coral transition-colors relative after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:bg-coral after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#kapcsolat"
          className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-ink text-cream hover:bg-coral-deep transition-colors"
        >
          Beszéljünk
        </a>
      </div>
    </header>
  );
}
