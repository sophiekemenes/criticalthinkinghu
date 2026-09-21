import { Link } from "@tanstack/react-router";
import logoFullColor from "@/assets/brand/criticalthinking-logo-full-color.svg";
import { LanguageToggle } from "@/components/site/LanguageToggle";

// Minimal English-side header — the full Hungarian nav (SiteHeader.tsx)
// links to homepage sections that don't exist in English yet, so this is
// deliberately just logo + Articles + language toggle rather than a
// translated copy of the full nav.
export function EnHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/en" className="flex items-center group">
          <img
            src={logoFullColor}
            alt="criticalthinking.hu"
            className="h-8 md:h-9 w-auto transition-transform group-hover:scale-[1.02]"
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/en/articles"
            className="text-sm text-ink-soft hover:text-coral transition-colors"
          >
            Articles
          </Link>
          <LanguageToggle lang="en" className="inline-flex items-center justify-center h-7 px-2.5 rounded-full border border-border/60 text-ink-soft text-xs font-medium tracking-wide hover:border-coral hover:text-coral transition-colors" />
        </div>
      </div>
    </header>
  );
}
