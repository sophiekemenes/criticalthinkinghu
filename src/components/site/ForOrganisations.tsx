import { Link } from "@tanstack/react-router";
import { FadeUp } from "./FadeUp";

export function ForOrganisations() {
  return (
    <section
      id="szervezeteknek"
      className="py-20 md:py-28 px-6 bg-card/50 border-y border-border/50"
    >
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">Szervezeteknek</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5 text-balance">
            Az emberi kockázatok nem állnak meg a tréning végén.
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Ha a szervezetedben már van biztonságtudatossági program, de nincs, aki az adatokból
            döntést csinálna, két szolgáltatás segíthet: egy egyszeri felmérés (Human Risk &amp;
            Awareness Baseline) és egy havi szakértői támogatás (Human Risk Care) a használt
            platform mellé.
          </p>
          <p className="text-ink-soft leading-relaxed mb-8">
            Nem újabb platform. Hanem az, hogy a meglévő eszközeidből döntések szülessenek.
          </p>
          <Link
            to="/human-risk-services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors"
          >
            Human Risk Services <span aria-hidden>→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
