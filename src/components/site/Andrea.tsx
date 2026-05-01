import { FadeUp } from "./FadeUp";
import portrait from "@/assets/andrea-portrait.png";

const pillars = [
  {
    n: "01",
    years: "15 év",
    title: "Tréning és NLP tapasztalat",
    role: "A „Hogyan” szakértője.",
    body: "Másfél évtizede foglalkozom önfejlesztéssel és tréningek tartásával. Neurolingvisztikus Programozás (NLP) hátterem lehetővé teszi, hogy mélyrehatóan értsem az emberi kommunikáció mintázatait és a döntéshozatali torzításokat. Gyakorlati játékosítási, élménypedagógiai és instrukciós dizájn hátteremmel tervezek és valósítok meg.",
  },
  {
    n: "02",
    years: "7 év",
    title: "Information & Cyber Security Engagement Leader",
    role: "A „Miért” szakértője.",
    body: "Egy piacvezető norvég multinacionális vállalatnál töltött 7 évem alatt az információbiztonsági tudatosítás (Security Awareness) volt a fókuszom. Itt tanultam meg, hogy a legnagyobb támadási felületet mindig az emberi tényező adja, és kidolgoztam azokat a módszereket, amelyekkel a hagyományos oktatás új szintre emelhető.",
  },
  {
    n: "03",
    years: "Stratégia",
    title: "& Csapatépítés",
    role: "A „Rendszer” szakértője.",
    body: "Nemcsak oktatóként, hanem stratégaként is bizonyítottam: nulláról építettem fel csapatokat és vállalati stratégiákat nemzetközi környezetben. Pontosan értem a HR vezetők és a C-szintű döntéshozók nyelvét. Tudom, hogy egy képzési programnak illeszkednie kell a szervezeti kultúrába.",
  },
];

function VennDiagram() {
  // Inspired by Andrea's hand-drawn doodle:
  // three overlapping circles meeting at the human in the center
  return (
    <svg viewBox="0 0 360 360" className="w-full h-auto" aria-hidden>
      <defs>
        <radialGradient id="g-center" cx="50%" cy="50%">
          <stop offset="0%" stopColor="oklch(0.62 0.14 40)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="oklch(0.62 0.14 40)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer ring */}
      <circle
        cx="180"
        cy="180"
        r="170"
        fill="none"
        stroke="oklch(0.45 0.13 35)"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      {/* Three intersecting domains */}
      <g fill="oklch(0.62 0.14 40)" fillOpacity="0.10" stroke="oklch(0.45 0.13 35)" strokeOpacity="0.55" strokeWidth="1.2">
        <circle cx="120" cy="135" r="100" />
        <circle cx="240" cy="135" r="100" />
        <circle cx="180" cy="240" r="100" />
      </g>
      {/* Center glow + human */}
      <circle cx="180" cy="180" r="55" fill="url(#g-center)" />
      <circle cx="180" cy="180" r="42" fill="none" stroke="oklch(0.45 0.13 35)" strokeWidth="1.2" />

      {/* stylised human silhouette */}
      <g fill="oklch(0.18 0.025 250)">
        <circle cx="180" cy="170" r="9" />
        <path d="M165 200 q15 -18 30 0 v18 q-15 -6 -30 0 z" />
      </g>

      {/* Labels */}
      <g fontFamily="Playfair Display, serif" fill="oklch(0.30 0.03 250)" fontStyle="italic">
        <text x="80" y="80" fontSize="14">Digitális őrzés</text>
        <text x="220" y="80" fontSize="14">Modern neuro</text>
        <text x="225" y="98" fontSize="14">+ viselkedés</text>
        <text x="115" y="320" fontSize="14">Kibervédelem</text>
      </g>
      {/* connector marks */}
      <g stroke="oklch(0.74 0.13 75)" strokeWidth="0.8" strokeDasharray="2 3" fill="none" opacity="0.7">
        <line x1="180" y1="50" x2="180" y2="135" />
        <line x1="95" y1="225" x2="155" y2="200" />
        <line x1="265" y1="225" x2="205" y2="200" />
      </g>
    </svg>
  );
}

export function Andrea() {
  return (
    <section id="andrea" className="py-24 md:py-36 px-6 bg-cream">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta-deep mb-5">
            A módszertanok mögött
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          {/* Portrait + name */}
          <FadeUp delay={0.1} className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-sunset rounded-3xl opacity-20 blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-elegant">
                <img
                  src={portrait}
                  alt="Kemenes Andrea Sophie portré"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-6">
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                  Kemenes Andrea Sophie
                </h2>
                <p className="text-terracotta-deep italic font-serif mt-1">
                  Human Engagement Architect
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Testimony + Venn */}
          <FadeUp delay={0.2} className="lg:col-span-7">
            <blockquote className="relative">
              <span className="font-serif text-7xl md:text-9xl text-terracotta/30 leading-none absolute -top-6 -left-2">
                “
              </span>
              <p className="font-serif text-2xl md:text-3xl leading-snug text-ink relative z-10 pl-8 md:pl-12">
                A kritikus gondolkodás oktatása számomra nem elméleti kérdés, hanem a modern
                vállalati biztonság és hatékonyság alapköve. Pályafutásom során egyetlen cél
                vezérelt:{" "}
                <span className="italic text-terracotta-deep">
                  megérteni, hogyan hozunk döntéseket nyomás alatt,
                </span>{" "}
                és hogyan védhetjük meg az emberi elmét a manipulációtól — legyen az egy
                marketing üzenet vagy egy digitális támadás.
              </p>
            </blockquote>

            <div className="mt-12 grid sm:grid-cols-5 gap-6 items-center">
              <div className="sm:col-span-3">
                <VennDiagram />
              </div>
              <div className="sm:col-span-2 text-sm text-ink-soft leading-relaxed">
                <p className="font-serif italic text-ink mb-3">
                  Három diszciplína metszéspontja.
                </p>
                <p>
                  A módszertan a digitális őrzés, a modern idegtudomány és viselkedéskutatás,
                  valamint a kibervédelem találkozásánál jön létre — középpontjában mindig az
                  EMBER.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <FadeUp key={p.n} delay={i * 0.1}>
              <article className="h-full">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-serif text-4xl text-terracotta-deep/40">{p.n}</span>
                  <span className="h-px flex-1 bg-terracotta/30" />
                </div>
                <h3 className="font-serif text-2xl leading-tight mb-1">
                  <span className="text-terracotta-deep">{p.years}</span> {p.title}
                </h3>
                <p className="font-serif italic text-ink-soft mb-4">{p.role}</p>
                <p className="text-ink-soft text-[15px] leading-relaxed">{p.body}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
