import { FadeUp } from "./FadeUp";
import vennPortrait from "@/assets/andrea-venn.png";

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

export function Andrea() {
  return (
    <section id="andrea" className="py-24 md:py-36 px-6 bg-cream">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta-deep mb-5">
            A módszertanok mögött
          </p>
        </FadeUp>

        {/* Name + title on top */}
        <FadeUp delay={0.05} className="mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            Kemenes Andrea Sophie
          </h2>
          <p className="text-terracotta-deep italic font-serif mt-2 text-lg">
            Human Engagement Architect
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-center">
          {/* Venn portrait */}
          <FadeUp delay={0.1} className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-sunset rounded-full opacity-15 blur-3xl" />
              <img
                src={vennPortrait}
                alt="Kemenes Andrea Sophie — a digitális valóság, idegtudomány és kibervédelem metszéspontjában"
                className="relative w-full h-auto"
                loading="lazy"
              />
            </div>
          </FadeUp>

          {/* Quote */}
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
