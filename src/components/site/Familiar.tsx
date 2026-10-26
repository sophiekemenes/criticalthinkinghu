import { Link } from "@tanstack/react-router";
import { FadeUp } from "./FadeUp";

// Minden kártya mögött már megjelent cikk áll — új kártya csak kész cikkel kerülhet ide.
const cards = [
  {
    title: "Amikor az AI gondolkodik helyetted",
    body: "Az eredmény meggyőző. A válasz kész. Csak azt nem tudod biztosan, hogy ellenőrizted-e, vagy egyszerűen megkönnyebbültél.",
    note: "A magabiztosság nem ellenőrzési módszer.",
    slug: "self-check-ai",
  },
  {
    title: "Amikor más irányítja a figyelmedet",
    body: "Egy értesítés, egy felháborító állítás, még egy videó. A nap végén rengeteget láttál. De mire figyeltél valójában?",
    note: "Az értesítés nem kérdezi meg, ráérsz-e.",
    slug: "a-figyelmed-kiskutya",
  },
  {
    title: "Amikor az ismerős állítás igaznak tűnik",
    body: "Nem azért hiszed el, mert igaz. Lehet, hogy azért, mert már hallottad, mert jól hangzik, vagy mert éppen azt mondja, amit hallani szeretnél.",
    note: "A sokat hallott még nem a bizonyított.",
    slug: "nem-azert-hiszed-el",
  },
  {
    title: "Amikor az ember a biztonsági rés",
    body: "A szervezetnek lehet szabályzata, technológiája és oktatása. De a valódi helyzetekben emberek értelmeznek, mérlegelnek és döntenek.",
    note: "A szabályzat nem kattint helyetted.",
    slug: "ne-kattints-allj-meg-gondolkodj",
  },
];

export function Familiar() {
  return (
    <section id="ismeros" className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">Ismerős?</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-3 text-balance">
            Talán már neked is feltűnt valamelyik.
          </h2>
          <p className="text-ink-soft text-lg mb-12 max-w-2xl">
            Nem problémát árulok, hanem jelenségeket nézek meg közelebbről. Mindegyik mögött egy
            cikk van.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <FadeUp key={c.slug} delay={0.05 * i}>
              <Link
                to="/cikkek/$slug"
                params={{ slug: c.slug }}
                className="group block h-full rounded-xl border border-border/60 bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-coral/60 focus-visible:-translate-y-0.5 focus-visible:border-coral/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              >
                <h3 className="font-display text-xl md:text-2xl leading-snug mb-3">{c.title}</h3>
                <p className="text-ink-soft leading-relaxed mb-5">{c.body}</p>
                <p className="font-display text-sm text-coral-deep transition-all md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-focus-visible:opacity-100 md:group-focus-visible:translate-y-0">
                  <span aria-hidden>↳ </span>
                  {c.note}
                </p>
                <p className="mt-4 text-sm font-medium text-ink group-hover:text-coral transition-colors">
                  Olvasd el a cikket <span aria-hidden>→</span>
                </p>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <Link
            to="/cikkek"
            className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors"
          >
            Az összes gondolat egy helyen <span aria-hidden>→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
