import { Mail } from "lucide-react";
import logoWhiteReverse from "@/assets/brand/criticalthinking-logo-white-reverse.svg";
import { LanguageToggle } from "@/components/site/LanguageToggle";

const RECIPIENT = "info@criticalthinking.hu";

// Minimal English-side footer — deliberately not a full translation of
// ContactFooter.tsx (which carries the Hungarian-only "#kapcsolat" homepage
// anchor and a two-column layout built around content that doesn't exist
// in English yet).
export function EnFooter() {
  return (
    <footer className="bg-ink text-cream pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center gap-6 pb-10">
          <img src={logoWhiteReverse} alt="criticalthinking.hu" className="h-7 w-auto opacity-90" />
          <p className="text-cream/70 max-w-md">
            Full English site coming soon. Questions in the meantime? Reach out.
          </p>
          <a
            href={`mailto:${RECIPIENT}`}
            className="inline-flex items-center gap-3 text-cream hover:text-coral transition-colors group"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            <span className="font-display text-lg group-hover:underline underline-offset-4">
              {RECIPIENT}
            </span>
          </a>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/50">
          <p>© {new Date().getFullYear()} Kemenes Andrea Sophie · All rights reserved.</p>
          <LanguageToggle lang="en" />
        </div>
      </div>
    </footer>
  );
}
