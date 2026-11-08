import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Printer } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ContactFooter } from "@/components/site/ContactFooter";
import { FadeUp } from "@/components/site/FadeUp";

const PAGE_TITLE = "Kognitív edzőterem · Az agyad is izom. Nagyjából. · criticalthinking.hu";
const PAGE_DESCRIPTION =
  "Nagyjából nyolc perces edzés három állomással (figyelem, értelmezés, döntés) arról, miért kell edzeni a gondolkodásunkat, ha naponta használunk AI-t. A végén egy nyomtatható edzésterv.";

export const Route = createFileRoute("/kognitiv-edzoterem")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: "Kognitív edzőterem · Az agyad is izom. Nagyjából." },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { name: "twitter:title", content: "Kognitív edzőterem · Az agyad is izom. Nagyjából." },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
  }),
  component: CognitiveGymPage,
});

const mail = (subject: string) =>
  `mailto:info@criticalthinking.hu?subject=${encodeURIComponent(subject)}`;

// Minden kutatáskártya három sorral: mit találtak, mit olvasok ki belőle, mennyire biztos.
// Új állítás csak ellenőrzött forrással kerülhet ide (lásd docs/sources-article-ideas.md).
interface Study {
  title: string;
  source: string;
  href: string;
  found: ReactNode;
  reading?: ReactNode;
  certainty: string;
}

function StudyCard({ study, dark = false }: { study: Study; dark?: boolean }) {
  const muted = dark ? "text-cream/70" : "text-ink-soft";
  const label = `text-[11px] uppercase tracking-[0.18em] ${dark ? "text-coral" : "text-coral-deep"}`;
  return (
    <div
      className={`rounded-xl border p-6 md:p-7 ${
        dark ? "border-cream/15 bg-cream/5" : "border-border/60 bg-card"
      }`}
    >
      <p className="font-display text-lg leading-snug">{study.title}</p>
      <a
        href={study.href}
        target="_blank"
        rel="noreferrer"
        className={`mt-1 inline-block text-sm underline-offset-4 hover:underline ${muted}`}
      >
        {study.source} <span aria-hidden>↗</span>
      </a>
      <dl className="mt-5 space-y-4">
        <div>
          <dt className={label}>Mit találtak</dt>
          <dd className="mt-1 leading-relaxed">{study.found}</dd>
        </div>
        {study.reading && (
          <div>
            <dt className={label}>Mit olvasok ki belőle</dt>
            <dd className="mt-1 leading-relaxed">{study.reading}</dd>
          </div>
        )}
        <div>
          <dt className={label}>Mennyire biztos</dt>
          <dd className={`mt-1 text-sm leading-relaxed ${muted}`}>{study.certainty}</dd>
        </div>
      </dl>
    </div>
  );
}

function Habit({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`rounded-xl p-6 md:p-7 border-l-4 border-coral ${
        dark ? "bg-cream/10" : "bg-coral-soft/60"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-[0.2em] mb-2 ${dark ? "text-coral" : "text-coral-deep"}`}
      >
        Hazavihető szokás
      </p>
      <p className="font-display text-xl md:text-2xl leading-snug">{children}</p>
    </div>
  );
}

function StationHeading({
  number,
  name,
  title,
  dark = false,
}: {
  number: string;
  name: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <FadeUp>
      <p
        className={`text-xs uppercase tracking-[0.25em] mb-4 ${dark ? "text-coral" : "text-coral-deep"}`}
      >
        {number} · {name}
      </p>
      <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-8 max-w-3xl text-balance">
        {title}
      </h2>
    </FadeUp>
  );
}

/* ---------- Kutatások ---------- */

const bergh: Study = {
  title: "Your Programming Students' Cognition with ChatGPT",
  source: "Bergh, Tag, Vassar, Renzella · arXiv, 2026",
  href: "https://arxiv.org/abs/2609.21194",
  found: (
    <>
      55 informatikus hallgató programozott ChatGPT-vel vagy hagyományos kereséssel. A ChatGPT-s
      csoport jobb kódot adott le (89% kontra 69%), de kevesebbet tudott felidézni belőle
      közvetlenül utána (41% kontra 53%), és két nappal később is (39% kontra 52%). A leadott kód
      kisebb részét érezték a sajátjuknak (45% kontra 81%).
    </>
  ),
  reading: "A jó eredmény még nem jelenti, hogy tudás is maradt mögötte.",
  certainty: "Preprint, kis minta, egy konkrét helyzet (egyetemi programozás).",
};

const chen: Study = {
  title: "Supporting or Replacing Students' Reasoning?",
  source: "Chen és mtsai. · arXiv, 2026",
  href: "https://arxiv.org/abs/2610.31481",
  found: (
    <>
      153 egyetemi hallgató. Az AI-jal jobb lett a házi feladatuk, a vizsgájuk viszont nem. Később
      minden +100 chatbot-üzenet nagyjából 3 ponttal gyengébb vizsgaeredménnyel járt együtt.
    </>
  ),
  reading: "A segítség és a helyettesítés között vékony a határ.",
  certainty:
    "Preprint. Az üzenetszám és a vizsgaeredmény kapcsolata összefüggés, nem bizonyított ok.",
};

const wilson: Study = {
  title: "Just think: The challenges of the disengaged mind",
  source: "Wilson és mtsai. · Science, 2014",
  href: "https://doi.org/10.1126/science.1250830",
  found: (
    <>
      A résztvevőket egyedül hagyták egy üres szobában a gondolataikkal. Megnyomhattak egy gombot,
      ami enyhe áramütést adott. A 15 perces gondolkodási idő alatt a férfiak 67%-a és a nők 25%-a
      legalább egyszer megnyomta.
    </>
  ),
  certainty: "Lektorált, sokat idézett kísérletsorozat (11 vizsgálat).",
};

const boredom: Study = {
  title: "Unalom és kreativitás",
  source: "Mann és Cadman · Creativity Research Journal, 2014",
  href: "https://doi.org/10.1080/10400419.2014.901073",
  found: (
    <>
      Sandi Mann unalomkutató kísérletében egy unalmas feladat után kreatívabb ötletek születtek.
      Manoush Zomorodi újságíró a{" "}
      <a
        href="https://www.ted.com/talks/manoush_zomorodi_how_boredom_can_lead_to_your_most_brilliant_ideas"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 hover:text-coral-deep"
      >
        Bored and Brilliant
      </a>{" "}
      projektjében őt és más kutatókat idéz: unalomban bekapcsol az agy alapértelmezett hálózata
      (default mode network), amely összeköti az egymástól távoli gondolatokat, és a saját jövőnket
      tervezi.
    </>
  ),
  certainty:
    "Az alapértelmezett hálózat jól kutatott terület. Az „unalom kreatívabbá tesz” eredmények kisebb kísérletekből jönnek.",
};

const sycophantic: Study = {
  title: "Who Is Sycophantic to Whom?",
  source: "Deepthika, Yadav, Sankar · arXiv, 2026",
  href: "https://arxiv.org/abs/2610.31579",
  found: (
    <>
      32 résztvevő tanult egy AI-asszisztenstől, amely magabiztosan mondott hamis tényeket is. A
      hamis állításokat nagyjából 65%-ban átvették, magabiztosan igaznak tartották, és a bizalmuk az
      asszisztens iránt alig változott.
    </>
  ),
  certainty: "Preprint, kis minta.",
};

const looksFine: Study = {
  title: "Looks Fine to Me",
  source: "Dissanayake és mtsai. · arXiv, 2026",
  href: "https://arxiv.org/abs/2610.27801",
  found: (
    <>
      36 résztvevő programozott egy AI-ügynökkel. Gyakran nagyon magabiztosak voltak, miközben nem
      vették észre a néma hibát.
    </>
  ),
  certainty: "Preprint, kis minta.",
};

const rahman: Study = {
  title: "Deflecting the Value Compass",
  source: "Rahman, Sadek, Desai · arXiv, 2026",
  href: "https://arxiv.org/abs/2609.25586",
  found: (
    <>
      200 fő, előre regisztrált kísérlet. Már egy semleges, döntést nem javasoló AI-beszélgetés is{" "}
      <em>átmenetileg</em> eltolta, mi számít nekik egy döntésben.
    </>
  ),
  certainty: "Preprint, előre regisztrált.",
};

const lindebaum: Study = {
  title: "Managerial Phronesis in the Age of Generative AI",
  source: "Lindebaum és mtsai. · Academy of Management Review, 2026",
  href: "https://journals.aom.org/doi/epub/10.5465/amr.2024.0582",
  found: (
    <>
      Az elszámoltathatóság dönti el, hogy az AI rontja vagy építi a vezetői ítélőképességet. Ahol
      meg kell indokolni a döntést, ott az AI a reflexió eszköze lehet.
    </>
  ),
  certainty: "Lektorált, de elméleti modell, nem mérés.",
};

const ibm: Study = {
  title: "IBM CHRO-kutatás",
  source: "IBM Institute for Business Value · 2026",
  href: "https://newsroom.ibm.com/2026-09-21-new-ibm-chro-study-ai-puts-critical-thinking-at-the-center-of-workforce-priorities",
  found: (
    <>
      A HR-vezetők 71%-a szerint alapvető, hogy a dolgozók felülbírálják az AI-t. A dolgozóknak csak
      29%-a tartja fontosnak a saját ítélőképességét.
    </>
  ),
  certainty: "Iparági felmérés, önbevallás.",
};

const maier: Study = {
  title: "Designing Against Deskilling",
  source: "Maier és mtsai. · arXiv, 2026",
  href: "https://arxiv.org/abs/2609.20143",
  found: (
    <>
      704 fő. Ha a felület megmutatta, mibe kerül a kiszervezés, a résztvevők kevesebbet szerveztek
      ki, és jobban teljesítettek AI nélkül.
    </>
  ),
  certainty: "Preprint, előre regisztrált kísérlet.",
};

const chenGood: Study = {
  ...chen,
  found: (
    <>
      Ugyanebben a kutatásban az a felület, amely előbb a hallgató saját megoldását kérte, és csak
      utána adott visszajelzést, nem rontott a vizsgaeredményen.
    </>
  ),
  reading: undefined,
  certainty: "Preprint.",
};

/* ---------- Interakciók ---------- */

function RememberCheck() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const replies = {
    yes: "Jó. És arra is, mit válaszolt, és mit kezdtél vele?",
    no: "Nem vagy vele egyedül. Pont erről szól ez az oldal.",
  };
  return (
    <div className="mt-10">
      <p className="font-display text-2xl md:text-3xl leading-snug mb-5">
        És te? Emlékszel, mit kérdeztél tegnap bármelyik AI-tól?
      </p>
      <div role="group" aria-label="Emlékszel?" className="flex flex-wrap gap-3">
        {(
          [
            ["yes", "Emlékszem"],
            ["no", "Nem igazán"],
          ] as const
        ).map(([id, text]) => (
          <button
            key={id}
            type="button"
            aria-pressed={answer === id}
            onClick={() => setAnswer(id)}
            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
              answer === id
                ? "bg-ink text-cream border-ink"
                : "border-ink/25 text-ink hover:border-coral hover:text-coral"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-5 min-h-[2rem]">
        {answer && <p className="text-lg leading-relaxed">{replies[answer]}</p>}
      </div>
    </div>
  );
}

// Egy perc csend. A fülváltásokat csak a böngésző számolja, nem tárolunk és nem küldünk el semmit.
function BoredomMinute() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [left, setLeft] = useState(60);
  const [away, setAway] = useState(0);
  const stopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase !== "running") return;
    const tick = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setPhase("done");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    const onVisibility = () => {
      if (document.hidden) setAway((n) => n + 1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhase("done");
    };
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stopRef.current?.focus();
    return () => {
      window.clearInterval(tick);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [phase]);

  const start = () => {
    setLeft(60);
    setAway(0);
    setPhase("running");
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card p-7 md:p-9">
      {phase === "idle" && (
        <>
          <p className="font-display text-2xl md:text-3xl leading-snug mb-3">
            Én csak egy percet kérek. És áramot sem hoztam.
          </p>
          <p className="text-ink-soft leading-relaxed mb-6">
            Tedd le a telefont. Indítsd el, és hatvan másodpercig ne csinálj semmit.
          </p>
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          >
            Indítom a percet
          </button>
        </>
      )}

      {phase === "done" && (
        <div aria-live="polite">
          <p className="font-display text-2xl md:text-3xl leading-snug mb-3">Kész.</p>
          <p className="text-lg leading-relaxed mb-2">
            Elindult a kezed a telefon felé? Eszedbe jutott valami, ami a perc elején még nem?
          </p>
          {away > 0 && (
            <p className="text-ink-soft leading-relaxed">
              A perc alatt {away}× néztél máshova. (Ezt csak a böngésződ számolta, nem látjuk.)
            </p>
          )}
          <button
            type="button"
            onClick={start}
            className="mt-6 text-sm font-medium text-coral-deep hover:underline"
          >
            Még egy perc
          </button>
        </div>
      )}

      {phase === "running" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Egy perc csend"
          className="fixed inset-0 z-[60] bg-ink text-cream flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-display text-7xl md:text-9xl tabular-nums" aria-live="off">
            {left}
          </p>
          <p className="mt-6 text-cream/70 text-lg max-w-sm">
            Nem kell csinálnod semmit. Csak légy itt.
          </p>
          <button
            ref={stopRef}
            type="button"
            onClick={() => setPhase("done")}
            className="mt-12 text-sm text-cream/50 hover:text-cream underline-offset-4 hover:underline"
          >
            Megszakítom
          </button>
        </div>
      )}
    </div>
  );
}

const claims = [
  {
    text: "Egy átlagos felnőtt naponta körülbelül 35 000 döntést hoz.",
    verdict: "Nincs szilárd forrása",
    note: "Mindenhol ott van, de eredeti kutatást nem találni mögötte. Pont ezt csinálja a magabiztos ismétlés: attól tűnik igaznak, hogy sokszor hallottuk.",
  },
  {
    text: "Az ember csak az agya 10 százalékát használja.",
    verdict: "Hamis",
    note: "Régi mítosz. Az agy szinte minden területe aktív, csak nem egyszerre és nem ugyanannyira.",
  },
  {
    text: "Az AI-jal programozó hallgatók két nappal később kevesebbet tudtak felidézni a kódjukból.",
    verdict: "Igaz",
    note: "Ez a fenti Bergh-kutatás (39% kontra 52%). Preprint, kis mintán, de mért adat.",
  },
];

function ClaimVote() {
  const [votes, setVotes] = useState<Record<number, "igaz" | "hamis">>({});
  return (
    <div className="space-y-5">
      {claims.map((c, i) => {
        const vote = votes[i];
        return (
          <div key={c.text} className="rounded-xl border border-cream/15 bg-cream/5 p-6 md:p-7">
            <p className="font-display text-xl md:text-2xl leading-snug mb-5">„{c.text}”</p>
            <div
              role="group"
              aria-label={`${i + 1}. állítás: igaz vagy hamis?`}
              className="flex flex-wrap gap-3"
            >
              {(["igaz", "hamis"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={vote === v}
                  onClick={() => setVotes((s) => ({ ...s, [i]: v }))}
                  className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                    vote === v
                      ? "bg-cream text-ink border-cream"
                      : "border-cream/30 text-cream hover:border-coral hover:text-coral"
                  }`}
                >
                  {v === "igaz" ? "Igaz" : "Hamis"}
                </button>
              ))}
            </div>
            <div aria-live="polite">
              {vote && (
                <p className="mt-5 leading-relaxed text-cream/85">
                  <span className="text-coral font-medium">{c.verdict}.</span> {c.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// A szöveg nem mentődik és nem kerül el sehová: csak a komponens állapotában él.
function ReasonBox() {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-xl border border-border/60 bg-card p-7 md:p-9">
      <label
        htmlFor="indoklas"
        className="font-display text-xl md:text-2xl leading-snug block mb-2"
      >
        Írd le 2–3 mondatban, miért döntöttél úgy múlt héten egy fontos kérdésben, ahogy. Az AI-t
        nem említheted.
      </label>
      <p className="text-sm text-ink-soft mb-4">A szöveged nem mentődik, és nem kerül hozzánk.</p>
      <textarea
        id="indoklas"
        rows={4}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setDone(false);
        }}
        className="w-full rounded-lg border border-border bg-background p-4 leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
      />
      <button
        type="button"
        disabled={text.trim().length === 0}
        onClick={() => setDone(true)}
        className="mt-4 inline-flex items-center px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
      >
        Kész
      </button>
      <div aria-live="polite">
        {done && (
          <p className="mt-5 text-lg leading-relaxed">
            Ha ment: az döntés volt. Ha nehezen ment: lehet, hogy jóváhagyás volt.
          </p>
        )}
      </div>
    </div>
  );
}

const habits = [
  {
    name: "Figyelem",
    text: "Egy perc üresjárat, mielőtt megnyitom az AI-t.",
  },
  {
    name: "Értelmezés",
    text: "Gyakornok-teszt: ha ezt egy gyakornok mondaná ilyen magabiztosan, ellenőrizném?",
  },
  {
    name: "Döntés",
    text: "Indoklás AI nélkül: ha nem tudom megindokolni, az jóváhagyás volt, nem döntés.",
  },
];

// Nyomtatáskor csak az edzésterv-kártya másolata látszik egy külön gyökérben
// (lásd styles.css, html.printing-plan), így a nyomat egy oldal marad.
function printPlan() {
  const card = document.getElementById("edzesterv");
  if (!card) return;
  const root = document.documentElement;
  const holder = document.createElement("div");
  holder.id = "print-plan-root";
  holder.appendChild(card.cloneNode(true));
  document.body.appendChild(holder);
  root.classList.add("printing-plan");
  const cleanup = () => {
    root.classList.remove("printing-plan");
    holder.remove();
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  window.print();
}

/* ---------- Oldal ---------- */

function CognitiveGymPage() {
  return (
    <main className="bg-background text-foreground antialiased">
      <SiteHeader />

      {/* Nyitás */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-6">
              Kognitív edzőterem
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.02] mb-8 text-balance">
              Az agyad is izom. <span className="text-coral">Nagyjából.</span>
            </h1>
            <p className="text-xl md:text-2xl text-ink-soft leading-relaxed max-w-2xl mb-10">
              Nagyjából nyolc perc, három állomás: figyelem, értelmezés, döntés. Én leszek az edződ.
              A végén kapsz egy edzéstervet, amit magaddal vihetsz.
            </p>
            <a
              href="#bemelegites"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors"
            >
              Kezdjük <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* Bevezetés és a saját történet */}
      <section id="bemelegites" className="pb-20 md:pb-28 px-6 scroll-mt-20">
        <div className="mx-auto max-w-3xl text-lg leading-relaxed">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-6">Bemelegítés</p>
            <div className="space-y-5">
              <p>
                Mindannyian tudjuk, hogy az egészségünkhöz kell a napi mozgás. Ezt már senkinek nem
                kell elmagyarázni.
              </p>
              <p>
                Arra is megvannak a jól bevált sablonjaink, hogyan működik az agyunk. Úgy gondoljuk,
                tudjuk, hogyan kell tanulni (ha ezt az oldalt olvasod, jó eséllyel túl vagy már az
                általános iskolán, sőt, valószínűleg az egyetemen is). Tudjuk, hogyan működik a
                memóriánk, és mindenkinek megvannak a saját trükkjei hozzá.
              </p>
              <p>
                A generatív AI viszont egyik napról a másikra átírta, hogyan dolgoznak a kognitív
                funkcióink. Az erről szóló kutatások még gyerekcipőben járnak, és ez nem csoda: a
                világ olyan tempóban változik, és olyan gyorsan dúsult fel az AI-használat, hogy
                nehéz nyomon követni. Évtizedek kutatása még nem áll mögötte.
              </p>
              <p>
                A jelek viszont egy irányba mutatnak. Az agyunkra is igaz, amit az izmainkra
                szoktunk mondani: <em>use it or lose it</em>. Az eszközeink egyik napról a másikra
                fejlődtek, és a gondolkodásunknak is követnie kell ezt az evolúciót. Magától nem
                fog.
              </p>
              <p>
                Ehhez nem kell megvárni a nagy, évtizedes vizsgálatokat. Ha őszinte vagy magaddal,
                és gyakorlod a metakogníciót (vagyis figyeled a saját gondolkodásodat, miközben
                gondolkodsz), a saját példáidon is meg fogod tapasztalni, hol vannak a vakfoltjaid.
                Hol engedted el a gyeplőt úgy, hogy észre sem vetted.
              </p>
              <p className="font-display text-2xl">Én a sajátomat így vettem észre.</p>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="mt-10 rounded-xl border-l-4 border-coral bg-card p-7 md:p-9 space-y-5">
              <p>
                A három mentális tűzfal egy ChatGPT-vel folytatott kreatív sessionből született.
                Belefutottam egy cikkbe, amely a szaliencia-hálózat működésével magyarázta, miért
                szokjuk meg, miért unjuk meg idővel a párunkat, vagy miért nem halljuk meg, amit
                mond. Erre voltam kíváncsi, ezt magyaráztattam el és foglaltattam össze a
                ChatGPT-vel. Mivel tudta rólam, hogy security awareness hátterem van,
                visszakérdeztem: vajon mi zajlik ugyanebben a hálózatban egy phishing-döntésnél?
              </p>
              <p>
                Néhány kérdésváltás után a beszélgetés kreatívan fölrobbant, és a ChatGPT magától
                kezdett összefüggéseket keresni. Teljesen lelkes lettem. Abszolút úgy éreztem, hogy
                ez valami fantasztikus, és hogy én jöttem rá.
              </p>
              <p>
                Hogy milyen értelemben voltunk szerzőtársak, az másnap vált valósággá. Megpróbáltam
                elmagyarázni valakinek az új dolgot, amire „rájöttem”, és egyszerűen nem emlékeztem
                a három tűzfal nevére.
              </p>
              <p>
                Saját magamon érzékeltem, hogy totálisan elengedtem a gyeplőt. Annyira, hogy egy
                felfedezést, amiért oda voltam és vissza, nem tudtam előhívni a memóriámból. Innen
                nőtt ki a criticalthinking.hu AI-os lába, és ezért tartom elképesztően fontosnak.
              </p>
              <p className="text-sm text-ink-soft">Kemenes Andrea Sophie</p>
            </div>
          </FadeUp>

          <FadeUp>
            <RememberCheck />
          </FadeUp>
        </div>
      </section>

      {/* Miért kell edzeni? */}
      <section className="py-20 md:py-28 px-6 bg-ink text-cream">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral mb-4">
              Miért kell edzeni?
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-6 max-w-3xl text-balance">
              Ha mindig liftezel, a lábad másnap még nem gyengül el.
            </h2>
            <p className="text-cream/75 text-lg leading-relaxed max-w-2xl mb-12">
              Pont ezért nem veszed észre. A kiszervezett gondolkodás nem fáj, nem lassít, és rövid
              távon jobb eredményt hoz. A hiány később jelentkezik: amikor el kellene magyarázni,
              emlékezni kellene, vagy AI nélkül kellene dönteni.
            </p>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeUp>
              <StudyCard study={bergh} dark />
            </FadeUp>
            <FadeUp delay={0.05}>
              <StudyCard study={chen} dark />
            </FadeUp>
          </div>
          <FadeUp>
            <p className="mt-12 font-display text-2xl md:text-4xl leading-snug">
              A teljesítmény nem egyenlő a tudással.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 1. állomás: Figyelem */}
      <section id="figyelem" className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <StationHeading number="1. állomás" name="Figyelem" title="Kötelező unatkozás" />
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <FadeUp>
              <StudyCard study={wilson} />
            </FadeUp>
            <FadeUp delay={0.05}>
              <BoredomMinute />
            </FadeUp>
          </div>
          <FadeUp>
            <p className="mt-14 font-display text-2xl md:text-3xl leading-snug max-w-3xl">
              Unalomban az agy nem kikapcsol, hanem átkapcsol: ilyenkor köti össze, ami addig nem
              állt össze.
            </p>
          </FadeUp>
          <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
            <FadeUp>
              <StudyCard study={boredom} />
            </FadeUp>
            <FadeUp delay={0.05}>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Az AI minden üres percet kitölt. Pedig a saját gondolat az üres percben érik meg.
                </p>
                <Habit>Egy perc üresjárat, mielőtt megnyitod az AI-t.</Habit>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. állomás: Értelmezés */}
      <section id="ertelmezes" className="py-20 md:py-28 px-6 bg-ink text-cream">
        <div className="mx-auto max-w-5xl">
          <StationHeading
            number="2. állomás"
            name="Értelmezés"
            title="A magabiztos hang csapdája"
            dark
          />
          <FadeUp>
            <p className="text-cream/75 text-lg leading-relaxed max-w-2xl mb-8">
              Három állítás következik, mind ugyanolyan magabiztosan. Igaz vagy hamis?
            </p>
          </FadeUp>
          <ClaimVote />
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <FadeUp>
              <StudyCard study={sycophantic} dark />
            </FadeUp>
            <FadeUp delay={0.05}>
              <StudyCard study={looksFine} dark />
            </FadeUp>
          </div>
          <div className="mt-10">
            <FadeUp>
              <Habit dark>
                A gyakornok-teszt: ha ezt egy gyakornok mondaná ilyen magabiztosan, ellenőriznéd?
              </Habit>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 3. állomás: Döntés */}
      <section id="dontes" className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <StationHeading number="3. állomás" name="Döntés" title="Kié a döntés?" />
          <FadeUp>
            <ReasonBox />
          </FadeUp>
          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            <FadeUp>
              <StudyCard study={rahman} />
            </FadeUp>
            <FadeUp delay={0.05}>
              <StudyCard study={lindebaum} />
            </FadeUp>
            <FadeUp delay={0.1}>
              <StudyCard study={ibm} />
            </FadeUp>
          </div>
          <div className="mt-10">
            <FadeUp>
              <Habit>
                Indoklás AI nélkül. Ha nem tudod megindokolni, az jóváhagyás volt, nem döntés.
              </Habit>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Őszintén */}
      <section className="py-20 md:py-28 px-6 bg-coral-soft/40">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-4">Őszintén</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-8 max-w-3xl text-balance">
              Mennyire biztos mindez?
            </h2>
            <div className="max-w-3xl text-lg leading-relaxed space-y-5">
              <p>
                A fenti kutatások nagy része friss, kis mintás, és még nem esett át szakmai
                lektoráláson. Egy részük összefüggést mutat, nem okot. Ezt ki kell mondani, mert
                pont erről szól az egész oldal.
              </p>
              <p>
                Mégis: aki a gondolkodásából él, nem várhatja meg a bizonyosságot. Mire a bizonyíték
                megérkezik, a szokás már kialakult, valamelyik irányba.
              </p>
              <p>
                <strong>Amit elveszíthetünk:</strong> az emlékezetet (amit nem dolgozunk fel, nem
                marad meg), a szerzőségérzetet (nem érezzük a sajátunknak, amit leadunk) és az
                ítélet mércéjét (nem vesszük észre, mikor tévedünk).
              </p>
              <p>
                <strong>Az edzés ára:</strong> lassabb és kényelmetlenebb. Súrlódással jár, és az AI
                épp ezt a súrlódást veszi le rólunk (kényelmes, értem én).
              </p>
              <p>
                <strong>A jó hír:</strong> van, ami működik.
              </p>
            </div>
          </FadeUp>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <FadeUp>
              <StudyCard study={maier} />
            </FadeUp>
            <FadeUp delay={0.05}>
              <StudyCard study={chenGood} />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Kkv */}
      <section className="py-20 md:py-28 px-6 bg-ink text-cream">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral mb-4">Miért kkv-kérdés?</p>
            <p className="text-xl md:text-2xl leading-relaxed text-cream/85 max-w-3xl mb-8">
              Egy nagyvállalatnál van compliance, audit és második szem. Egy kkv-ban a tulajdonos és
              a csapat feje az egyetlen tűzfal.
            </p>
            <p className="font-display text-3xl md:text-5xl leading-[1.1] text-balance">
              Az AI-ba mindenki fektet. Az emberbe, aki használja, alig valaki.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Edzésterv */}
      <section id="edzesterv-szakasz" className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-4">
              Az edzésterved
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-10 text-balance">
              Három szokás, egy‑egy minden állomásról.
            </h2>
          </FadeUp>
          <FadeUp>
            <div id="edzesterv" className="rounded-2xl border-2 border-ink bg-card p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.25em] text-coral-deep">
                Kognitív edzőterem
              </p>
              <p className="font-display text-3xl mt-2 mb-8">Az edzéstervem</p>
              <ol className="space-y-6">
                {habits.map((h, i) => (
                  <li key={h.name} className="flex gap-5">
                    <span className="font-display text-4xl text-coral leading-none w-8 shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-1">
                        {h.name}
                      </p>
                      <p className="text-lg leading-snug">{h.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-10 pt-5 border-t border-border text-sm text-ink-soft">
                criticalthinking.hu/kognitiv-edzoterem
              </p>
            </div>
          </FadeUp>
          <FadeUp>
            <button
              type="button"
              onClick={printPlan}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <Printer className="h-4 w-4" aria-hidden /> Kinyomtatom / mentés PDF-be
            </button>
          </FadeUp>
        </div>
      </section>

      {/* Zárás */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-10 text-balance">
              Ma nem közönség voltál. Holnap az AI előtt se légy az.
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href={mail("Kognitív edzőterem: előadás vagy workshop")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-cream font-medium hover:bg-coral-deep transition-colors"
              >
                Előadást vagy workshopot szeretnék <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                to="/"
                hash="modszer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-ink/25 font-medium hover:border-coral hover:text-coral transition-colors"
              >
                Az A.I.D. módszertan
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
