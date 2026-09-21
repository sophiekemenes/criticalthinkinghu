import { Link } from "@tanstack/react-router";

interface LanguageToggleProps {
  lang: "hu" | "en";
  className?: string;
}

// The English side of the site is a "coming soon" placeholder (see
// src/routes/en/) — this toggle just switches between the Hungarian home
// and that placeholder, it doesn't try to map a HU page to its EN
// counterpart (most pages don't have one yet).
export function LanguageToggle({ lang, className }: LanguageToggleProps) {
  const base =
    "inline-flex items-center justify-center h-7 px-2.5 rounded-full border text-xs font-medium tracking-wide transition-colors";
  return lang === "hu" ? (
    <Link
      to="/en"
      className={className ?? `${base} border-border/60 text-ink-soft hover:border-coral hover:text-coral`}
    >
      EN
    </Link>
  ) : (
    <Link
      to="/"
      className={className ?? `${base} border-cream/20 text-cream/70 hover:border-coral hover:text-coral`}
    >
      HU
    </Link>
  );
}
