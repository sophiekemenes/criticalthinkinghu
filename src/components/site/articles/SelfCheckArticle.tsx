import { Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, Brain, Compass } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ContactFooter } from "@/components/site/ContactFooter";
import { FadeUp } from "@/components/site/FadeUp";

// Kártyás/ikonos, strukturált cikk-layout — nem prózai szöveg, ezért nem a
// markdown-alapú ArticleLayout-ot használja (lásd src/content/articles.json
// "custom": true bejegyzését és src/routes/cikkek/$slug.tsx-et).
const sections = [
  {
    n: "01",
    icon: Eye,
    title: "Percepciós tűzfal",
    sub: "Figyelem",
    situation: "A válasz túl gyorsan jön, mielőtt eldöntenéd, mit is vártál.",
    signs: [
      "skimmelés az első mondat után",
      "egyre rövidebb promptok, egyre kevesebb saját gondolkodás",
      "„elveszett idő” AI-jal anélkül, hogy emlékeznél az eredeti kérdésre",
    ],
    tip: "A prompt elküldése előtt írd le egy mondatban, mit vársz válaszként — ha a válasz után nem tudod összevetni, nem olvastad el, csak fogyasztottad.",
  },
  {
    n: "02",
    icon: Brain,
    title: "Értelmezési tűzfal",
    sub: "Bias-ok",
    situation: "A magabiztos hangnem miatt fogadsz el egy állítást, nem az ellenőrzés miatt.",
    signs: [
      "gyorsabban elfogadod, ha megerősíti, amit már gondoltál",
      "nem kérdezed meg „honnan tudod?”",
      "átfogalmazott kérdésre kapott eltérő válasz zavarba hoz, de nem gyanakvóvá tesz",
    ],
    tip: "Kontroll-kérdés minden fontos válasznál — „ha ezt egy gyakornoktól kapnám ugyanilyen magabiztosan, ellenőrizném?” Ha igen, most is ellenőrizd.",
  },
  {
    n: "03",
    icon: Compass,
    title: "Döntési tűzfal",
    sub: "Tudatos választás",
    situation: "Az AI három opciót ad, és automatikusan a legkönnyebben elfogadhatót választod.",
    signs: [
      "nem tudod megindokolni a választást az AI válaszán kívül",
      "kevésbé mersz eltérni az AI-tól, mint egy embertől",
      "már nem „mit gondolok”, hanem „mit mondott az AI” a kérdés",
    ],
    tip: "A 10/10/10 alkalmazása magára a javaslatra — mit gondolok róla 10 perc / 10 óra / 10 nap múlva. Ha egyik időtávon sincs saját hozzáadott nézőpont, az jóváhagyás volt, nem döntés.",
  },
];

export function SelfCheckArticle() {
  return (
    <main className="bg-background text-foreground antialiased">
      <SiteHeader />

      <article className="pt-36 pb-24 md:pb-32 px-6">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <Link
              to="/"
              hash="firewalls"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-coral transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Vissza a 3 Mentális Tűzfalhoz
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">
              3 Mentális Tűzfal — Self-check
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8 text-balance">
              3 jel, hogy az{" "}
              <span className="accent-mark">AI gondolkodik helyetted.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-lg text-ink-soft leading-relaxed mb-16 max-w-2xl">
              Gyakorlati óvó jelek és tippek — mindhárom Mentális Tűzfalhoz kötve —,
              amiket munka közben, az AI-jal való interakció során vehetsz észre
              magadon. Nem azért, hogy leállj az AI-jal, hanem hogy tudatosan
              maradj vele.
            </p>
          </FadeUp>

          <div className="space-y-14">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.n} delay={0.1 + i * 0.1}>
                  <section className="rounded-2xl border border-border/60 bg-card p-7 md:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-11 w-11 rounded-full bg-gradient-sunset flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-cream" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-display text-xl leading-tight">
                          {s.n} — {s.title}
                        </p>
                        <p className="text-coral-deep text-sm">{s.sub}</p>
                      </div>
                    </div>

                    <div className="space-y-5 text-[15px] leading-relaxed">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-coral-deep mb-1.5">
                          Helyzet
                        </p>
                        <p className="text-ink-soft">{s.situation}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-coral-deep mb-1.5">
                          Óvó jelek
                        </p>
                        <ul className="space-y-1">
                          {s.signs.map((sign) => (
                            <li key={sign} className="text-ink-soft flex gap-2">
                              <span className="text-coral/60" aria-hidden>
                                ·
                              </span>
                              {sign}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-coral-deep mb-1.5">
                          Gyakorlati tipp
                        </p>
                        <p className="text-ink font-medium">{s.tip}</p>
                      </div>
                    </div>
                  </section>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.5}>
            <div className="mt-16 pt-10 border-t border-border/60">
              <p className="text-ink-soft leading-relaxed mb-6">
                Ez a három jel egyben egy önálló self-check: ha csak egyet is
                felismersz magadon rendszeresen, érdemes visszaépíteni a saját
                gondolkodásod a folyamatba — nem az AI ellen, hanem vele.
              </p>
              <Link
                to="/"
                hash="kapcsolat"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors"
              >
                Beszéljünk róla
                <span aria-hidden>→</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </article>

      <ContactFooter />
    </main>
  );
}
