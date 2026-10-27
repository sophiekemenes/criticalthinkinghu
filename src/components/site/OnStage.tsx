import { FadeUp } from "./FadeUp";

const topics = [
  {
    title: "Kognitív biztonság",
    body: "Mi történik, amikor a befolyásolás már nemcsak az információs rendszerünket, hanem a gondolkodási folyamatainkat célozza?",
  },
  {
    title: "AI és emberi ítélőképesség",
    body: "Mikor bízzunk az AI-ban, mikor kérdezzünk vissza, és mikor gondolkodjunk magunk?",
  },
  {
    title: "Figyelem, értelmezés és döntés",
    body: "Mi ragadja meg a figyelmünket, mit gondolunk róla, és mit választunk, mielőtt az információból cselekvés lesz?",
  },
  {
    title: "Az emberi tényező a kiberbiztonságban",
    body: "Mi történik, amikor a technológiai kockázat találkozik figyelemmel, viselkedéssel és döntésekkel?",
  },
];

// Csak megerősített szereplések. Cím és szerep nélkül, amíg Sophie nem adja meg.
const past = [
  "WITSEC szakmai nap · 2025",
  "AI Business konferencia · 2025. november",
  "Future IT · 2025. november",
  "ICT Global Enterprise · 2026",
];
const upcoming = [
  "WITSEC szakmai nap · 2026",
  "Future IT · 2026",
  "Debreceni Business Fest · 2026",
];

export function OnStage() {
  return (
    <section id="eloadasok" className="py-20 md:py-28 px-6 border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          {/* lg-n a felirat hátteret kap, hogy a Rólam fotókeretéből induló ív (ArcConnector) mögötte átfusson */}
          <h2 data-arc-label className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-8 lg:relative lg:z-10 lg:inline-block lg:bg-background lg:px-3 lg:-ml-3 lg:py-1">
            Előadások
          </h2>
        </FadeUp>

        {/* Négy kártya egy íven (az ív vonalát az ArcConnector rajzolja). lg-n: a két szélső lejjebb, a két középső
            följebb. Mobilon (<640 px): a két középső kártya be van húzva, így a bal oldali ív jobbra domborodik. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {topics.map((t, i) => (
            <div
              key={t.title}
              data-arc-card
              className={`relative z-10 ${i === 0 || i === topics.length - 1 ? "lg:mt-14" : "lg:mb-14 max-sm:ml-8"}`}
            >
              <FadeUp delay={0.05 * i} className="h-full">
                <div className="h-full rounded-xl border border-border/60 bg-card p-7 lg:p-6">
                  <h3 className="font-display text-xl mb-3">{t.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{t.body}</p>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>

        <FadeUp>
          <div className="grid md:grid-cols-2 gap-10 border-t border-border/60 pt-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-4">
                Korábbi szereplések
              </p>
              <ul className="space-y-3">
                {past.map((p) => (
                  <li key={p} className="leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-4">
                Következő fellépések
              </p>
              <ul className="space-y-3">
                {upcoming.map((p) => (
                  <li key={p} className="leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <a
            href={`mailto:info@criticalthinking.hu?subject=${encodeURIComponent("Előadás — beszéljünk")}`}
            className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors"
          >
            Beszéljünk egy előadásról <span aria-hidden>→</span>
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
