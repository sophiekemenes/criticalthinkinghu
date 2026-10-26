import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoFullColor from "@/assets/brand/criticalthinking-logo-full-color.svg";
import { LanguageToggle } from "@/components/site/LanguageToggle";

const links = [
  { href: "/cikkek", label: "Gondolatok" },
  { href: "/#modszer", label: "Módszer" },
  { href: "/#rolam", label: "Rólam" },
  { href: "/#eloadasok", label: "Előadások" },
  { href: "/human-risk-services", label: "Szervezeteknek" },
  { href: "/#kapcsolat", label: "Kapcsolat" },
];

// A "/#..." bejegyzések főoldali horgonyok: sima <a>, így más oldalról is
// a főoldal megfelelő részére visznek. A többi valódi route (router Link).
const isAnchor = (href: string) => href.includes("#");

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Nyitott menünél Esc zárja, és a háttér nem görög alatta.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group" onClick={() => setOpen(false)}>
          <img
            src={logoFullColor}
            alt="criticalthinking.hu — 3 Mentális Tűzfal"
            className="h-8 md:h-9 w-auto transition-transform group-hover:scale-[1.02]"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l) => {
            const className =
              "text-ink-soft hover:text-coral transition-colors relative after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:bg-coral after:transition-all hover:after:w-full";
            // A "/"-szal kezdődő bejegyzések valódi route-ok (pl. /cikkek) —
            // ezeket a router Link-jével navigáljuk, a többi (#...) csak
            // horgony-ugrás a főoldalon belül.
            return !isAnchor(l.href) ? (
              <Link key={l.href} to={l.href} className={className}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={className}>
                {l.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle lang="hu" />
          <a
            href="/#kapcsolat"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-ink text-cream hover:bg-coral-deep transition-colors"
          >
            Beszéljünk
          </a>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 -mr-2 text-ink hover:text-coral transition-colors"
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto bg-background border-t border-border/50"
        >
          <ul className="px-6 py-4">
            {links.map((l) => {
              const className =
                "block py-4 font-display text-xl border-b border-border/50 text-foreground hover:text-coral transition-colors";
              return (
                <li key={l.href}>
                  {!isAnchor(l.href) ? (
                    <Link to={l.href} className={className} onClick={() => setOpen(false)}>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className={className} onClick={() => setOpen(false)}>
                      {l.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="px-6 pb-8">
            <a
              href="/#kapcsolat"
              onClick={() => setOpen(false)}
              className="inline-flex items-center px-6 py-3 rounded-full bg-coral text-cream font-medium hover:bg-coral-deep transition-colors"
            >
              Beszéljünk
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
