import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ContactFooter } from "@/components/site/ContactFooter";
import { FadeUp } from "@/components/site/FadeUp";

const PAGE_TITLE = "Human Risk Services · emberi kockázatkezelés · criticalthinking.hu";
const PAGE_DESCRIPTION =
  "Az emberi kockázatok nem állnak meg a tréning végén. Egyszeri Human Risk & Awareness Baseline felmérés és havi Hoxhunt Human Risk Care szakértői támogatás: a biztonságtudatossági adatokból döntések születnek.";

export const Route = createFileRoute("/human-risk-services")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      {
        property: "og:title",
        content: "Human Risk Services · az emberi kockázatok nem állnak meg a tréning végén",
      },
      { property: "og:description", content: PAGE_DESCRIPTION },
      {
        name: "twitter:title",
        content: "Human Risk Services · az emberi kockázatok nem állnak meg a tréning végén",
      },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
  }),
  component: HumanRiskServicesPage,
});

const RECIPIENT = "info@criticalthinking.hu";

function mailto(subject: string) {
  return `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}`;
}

const questions = [
  "Tudjuk, mely üzleti értékek és hozzáférések igényelnek fokozott védelmet?",
  "Látjuk, hol jelentenek az emberi döntések tényleges kockázatot?",
  "Tudjuk, mit kezdjünk a Hoxhunt riportjaival?",
  "Van kapacitásunk a mintázatok értelmezésére és a célzott beavatkozások követésére?",
];

const baselineSteps = [
  "Áttekintjük a meglévő awareness-gyakorlatokat és jelentési folyamatokat.",
  "Azonosítjuk a kiemelten védendő információkat, hozzáféréseket és szerepköröket.",
  "Gyakorlati, prioritásokba rendezett intézkedéseket javaslunk.",
];

const baselineDeliverables = [
  "Vezetői összefoglaló a legfontosabb emberi kockázatokról.",
  "A kiemelten védendő értékek és szerepkörök áttekintése.",
  "Prioritásba rendezett intézkedési javaslatok és 90 napos fejlesztési terv.",
];

const careParts = [
  {
    title: "Értelmezés",
    body: "Áttekintjük a Hoxhunt riportjait, a visszatérő kockázatokat és a lehetséges okokat.",
  },
  {
    title: "Célzott beavatkozás",
    body: "Prioritást, rövid akciótervet és indokolt esetben célzott fejlesztési vagy kommunikációs javaslatot készítünk.",
  },
  {
    title: "Visszacsatolás",
    body: "Havi egyeztetés és vezetői összefoglaló segíti a következő lépések kijelölését.",
  },
];

const process = [
  {
    n: "1",
    title: "Felmérés",
    body: "Megértjük a meglévő biztonsági környezetet, az üzleti prioritásokat és az elérhető adatokat.",
  },
  {
    n: "2",
    title: "Értelmezés",
    body: "Megvizsgáljuk, mely mintázatok érdemelnek figyelmet, és hol lehet szükség célzott beavatkozásra.",
  },
  {
    n: "3",
    title: "Beavatkozás",
    body: "A feltárt kockázatokhoz illeszkedő, gyakorlati intézkedéseket javaslunk.",
  },
  {
    n: "4",
    title: "Visszajelzés",
    body: "Követjük a változásokat, megosztjuk a tanulságokat, és kijelöljük a következő lépéseket.",
  },
];

function HumanRiskServicesPage() {
  return (
    <main className="bg-background text-foreground antialiased">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-36 pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">
              Szolgáltatások az emberi kockázatkezelésért
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6 text-balance">
              Human Risk Services.{" "}
              <span className="accent-mark">
                Az emberi kockázatok nem állnak meg a tréning végén.
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed mb-10 max-w-2xl">
              A biztonságtudatosság nem pusztán arról szól, hogy a munkatársak felismerik-e az
              adathalász e-maileket. Arról is, hogy tudjuk-e, mely emberi döntési pontok jelentenek
              valódi üzleti kockázatot, mit mutatnak a rendelkezésre álló adatok, és milyen lépések
              vezethetnek érdemi változáshoz.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-lg leading-relaxed mb-10 max-w-2xl">
              A CriticalThinking.hu segít összekapcsolni a biztonságtudatossági adatokat, az üzleti
              prioritásokat és a célzott emberi kockázatkezelést.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <a
              href={mailto("Human Risk Services — beszéljünk az emberi kockázatokról")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-cream font-medium hover:bg-coral-deep transition-colors"
            >
              Beszéljünk az emberi kockázatokról <ArrowRight className="h-4 w-4" />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* A mérés fontos, de mi történik utána */}
      <section className="py-20 md:py-28 px-6 bg-ink text-cream">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-10 lg:gap-16">
          <FadeUp className="lg:col-span-6">
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6 text-balance">
              A mérés fontos. De mi történik <span className="text-coral">utána?</span>
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-4">
              Egy biztonságtudatossági program rengeteg információt termelhet. Gyakorlási
              eredményeket, visszatérő hibákat, jelentési mintázatokat és fejlesztendő területeket.
            </p>
            <p className="text-cream text-lg leading-relaxed">
              A valódi kérdés az, hogy ezekből születik-e döntés.
            </p>
          </FadeUp>
          <FadeUp delay={0.05} className="lg:col-span-6">
            <ul className="space-y-4">
              {questions.map((q) => (
                <li key={q} className="flex gap-3 text-lg leading-relaxed text-cream/90">
                  <Check className="h-5 w-5 text-coral shrink-0 mt-1.5" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-cream/70 leading-relaxed">
              Ha ezekre a kérdésekre nincs egyértelmű válasz, nem feltétlenül több tréningre van
              szükség. Lehet, hogy tisztább kockázati képre vagy a meglévő program szakértői
              támogatására.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Két szolgáltatás */}
      <section id="szolgaltatasok" className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">
              Két szolgáltatás
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-14 max-w-2xl text-balance">
              Két szolgáltatás. Egy cél:{" "}
              <span className="accent-mark">tudatosabb kockázatkezelés.</span>
            </h2>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Baseline */}
            <FadeUp>
              <article
                id="baseline"
                className="h-full flex flex-col rounded-xl border border-border/60 bg-card p-8 md:p-10"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">
                  01 · Egyszeri felmérés · Világos kép és gyakorlati terv
                </p>
                <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2">
                  Human Risk &amp; Awareness Baseline
                </h3>
                <p className="font-display text-lg text-coral-deep mb-5">
                  Kiket és mit kell a leginkább védeni?
                </p>
                <p className="text-ink-soft leading-relaxed mb-8">
                  A Baseline feltárja, mely üzleti értékek, hozzáférések, szerepkörök és emberi
                  döntési pontok igényelnek fokozott figyelmet. A meglévő biztonságtudatossági
                  gyakorlatokra, folyamatokra és rendelkezésre álló Human Risk adatokra építve
                  kijelöli a legfontosabb fejlesztési prioritásokat.
                </p>

                <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">
                  A folyamat során
                </p>
                <ul className="space-y-3 mb-8">
                  {baselineSteps.map((s) => (
                    <li key={s} className="flex gap-3 leading-relaxed">
                      <Check className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">
                  Amit a vezetés kézhez kap
                </p>
                <ul className="space-y-3 mb-10">
                  {baselineDeliverables.map((s) => (
                    <li key={s} className="flex gap-3 leading-relaxed">
                      <Check className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-border/60 pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-1">
                    Egyszeri díj
                  </p>
                  <p className="font-display text-2xl mb-6">Egyedi egyeztetés alapján</p>
                  <a
                    href={mailto("Érdekel a Human Risk & Awareness Baseline felmérés")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream text-sm font-medium hover:bg-coral-deep transition-colors"
                  >
                    Érdekel a Baseline felmérés <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </FadeUp>

            {/* Human Risk Care */}
            <FadeUp delay={0.05}>
              <article
                id="human-risk-care"
                className="h-full flex flex-col rounded-xl border border-border/60 bg-card p-8 md:p-10"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">
                  02 · Havidíjas szolgáltatás · Szakértői támogatás a Hoxhunt mögött
                </p>
                <h3 className="font-display text-2xl md:text-3xl leading-tight mb-2">
                  Hoxhunt Human Risk Care
                </h3>
                <p className="font-display text-lg text-coral-deep mb-5">
                  Mit mutatnak az adatok, és mit tegyünk velük?
                </p>
                <p className="text-ink-soft leading-relaxed mb-4">
                  A Hoxhunt automatizált gyakorlással támogatja a biztonságtudatosságot és a jó
                  szokások kialakulását. A Human Risk Care abban segít, hogy a rendelkezésre álló
                  eredményekből érthető prioritások, célzott beavatkozások és követhető következő
                  lépések szülessenek.
                </p>
                <p className="leading-relaxed mb-8">
                  Nem kell feltétlenül külön belső szakértőt alkalmaznod a program folyamatos
                  gazdájaként.
                </p>

                <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">
                  A havi szolgáltatás részei
                </p>
                <ul className="space-y-4 mb-10">
                  {careParts.map((p) => (
                    <li key={p.title} className="flex gap-3 leading-relaxed">
                      <Check className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-medium">{p.title}:</strong> {p.body}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-border/60 pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-1">Havidíj</p>
                  <p className="font-display text-2xl mb-1">
                    150 000 Ft{" "}
                    <span className="text-base text-ink-soft">+ áfa, ha alkalmazandó</span>
                  </p>
                  <p className="text-sm text-ink-soft mb-6">
                    A szolgáltatás a meglévő Hoxhunt-licencet egészíti ki, nem helyettesíti a
                    platformot.
                  </p>
                  <a
                    href={mailto("Érdekel a Hoxhunt Human Risk Care")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream text-sm font-medium hover:bg-coral-deep transition-colors"
                  >
                    Érdekel a Human Risk Care <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Hogyan lesz az adatokból cselekvés */}
      <section className="py-20 md:py-28 px-6 bg-cream border-y border-border/50">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">A módszer</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-12 max-w-2xl text-balance">
              Hogyan lesz az adatokból cselekvés?
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((s, i) => (
              <FadeUp key={s.n} delay={0.05 * i}>
                <div className="h-full rounded-xl border border-border/60 bg-card p-7">
                  <p className="font-display text-coral text-xl mb-3">{s.n}</p>
                  <h3 className="font-display text-xl mb-3">{s.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.1}>
            <p className="mt-10 text-lg leading-relaxed max-w-3xl">
              A Baseline önálló felmérésként is igénybe vehető. Ha folyamatos szakértői támogatásra
              van szükség, erre épülhet a Human Risk Care.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Nem újabb platform */}
      <section className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6 text-balance">
              Nem újabb platformra van szükséged.{" "}
              <span className="accent-mark">
                Hanem arra, hogy a meglévő eszközeidből döntések szülessenek.
              </span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-lg leading-relaxed mb-4">
              A Human Risk Services azoknak a szervezeteknek nyújt támogatást, amelyek szeretnék
              tudatosabban kezelni a kiberbiztonság emberi oldalát, de nem feltétlenül rendelkeznek
              külön emberi kockázatkezelési szakértővel.
            </p>
            <p className="text-ink-soft leading-relaxed mb-10">
              A megközelítés a meglévő gyakorlatokra, adatokra és üzleti prioritásokra épít.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-xl bg-cream border border-border/60 p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">
                Amit fontos tisztázni
              </p>
              <p className="text-ink-soft leading-relaxed">
                A Baseline nem helyettesíti a teljes körű technikai auditot vagy a formális
                kockázatelemzést. A Human Risk Care a megvásárolt Hoxhunt-csomaghoz és a
                rendelkezésre álló adatokhoz igazodik. Meghatározott százalékos kockázatcsökkenést
                nem garantál. A nagyobb kampányok, e-learning-fejlesztések, workshopok és
                incidenskezelés külön egyeztetés tárgyát képezik.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Záró CTA */}
      <section className="py-20 md:py-28 px-6 bg-ink text-cream">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral mb-5">Beszéljünk</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] mb-6 text-balance">
              Nem kell előre tudnod, melyik szolgáltatásra van szükséged.
            </h2>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-lg text-cream/80 leading-relaxed mb-10 max-w-2xl">
              Nézzük meg együtt, hol tart most a biztonságtudatossági programod, milyen adatok
              állnak rendelkezésre, és melyik következő lépés teremtheti a legtöbb értéket.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href={mailto("Human Risk Services — első egyeztetés")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-cream font-medium hover:bg-coral-deep transition-colors"
              >
                Kérj egy első egyeztetést <ArrowRight className="h-4 w-4" />
              </a>
              <div className="text-sm text-cream/70 leading-relaxed">
                <p className="text-cream font-medium">Kemenes Sophie</p>
                <p>Human Engagement Architect · CriticalThinking.hu</p>
                <a href={`mailto:${RECIPIENT}`} className="hover:text-coral transition-colors">
                  {RECIPIENT}
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
