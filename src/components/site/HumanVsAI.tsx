import { Cpu, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import { FadeUp } from "./FadeUp";

const focusAreas = [
  {
    n: "01",
    icon: TrendingUp,
    title: "Vállalati upskilling",
    sub: "Stratégiai gondolkodás felsőfokon",
    body: "Kifejezetten nagyvállalati környezetre szabott tréningjeink célja a munkavállalók kognitív képességeinek fejlesztése. Nem elméleti filozófiát oktatunk, hanem a mindennapi üzleti döntéseket támogató gyakorlati eszköztárat adunk át.",
    focus: "Figyelmi kontroll, érveléstechnika, döntési torzítások (biases) felismerése, adatalapú döntéshozatal.",
    who: "Közép- és felsővezetőknek, projektmenedzsereknek.",
    result: "Gyorsabb, megalapozottabb üzleti döntések és hatékonyabb meeting kultúra.",
  },
  {
    n: "02",
    icon: Cpu,
    title: "AI adoption",
    sub: "Ember a gép mögött (Human-in-the-loop)",
    body: "Az AI bevezetése nem IT, hanem HR és kompetencia kérdés. Ez a modul összekapcsolja a Prompt Engineeringet a kritikus gondolkodással, és alkalmazkodik a már folyamatban lévő upskilling tervekhez. Megtanítjuk, hogyan kell „jól kérdezni” és hogyan kell a kapott választ validálni.",
    focus: "Generatív AI kritikus használata, forráskritika, etikus AI használat, az „automatizációs torzítás” elkerülése.",
    who: "Program managereknek, change managereknek, HR vezetőknek, marketing és IT csapatoknak.",
    result: "Biztonságos AI integráció a vállalati folyamatokba.",
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "NIS2 stratégiai megfelelés",
    sub: "Túl a pipálható listákon",
    body: "A legtöbb szervezet a NIS2-re úgy tekint, mint egy újabb adminisztratív teherre. Mi a criticalthinking.hu-nál úgy látjuk: ez az a pont, ahol a kiberbiztonság végre beköltözik a boardroomba.",
    focus: "Lefordítom a technikai kockázatokat az üzleti döntéshozók nyelvére, hogy a biztonság ne költség, hanem befektetés legyen.",
    who: "C-szintű döntéshozóknak, CISO-knak, compliance vezetőknek.",
    result: "Valódi értékteremtés a megfelelőségen túl.",
  },
];

export function HumanVsAI() {
  return (
    <section id="vallalati" className="py-24 md:py-36 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta-deep mb-5">
              Egy kis körkép
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance mb-8">
              Human <span className="italic text-terracotta-deep">vs</span> AI
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed text-balance">
              2025-re a munkahelyi környezet drasztikusan átalakult. A mesterséges
              intelligencia már nem újdonság, hanem alapvető eszköz. Ebben az új digitális
              ökoszisztémában azonban paradox helyzet állt elő:{" "}
              <span className="text-ink font-medium">
                minél okosabbak a gépeink, annál élesebb emberi ítélőképességre van szükség.
              </span>
            </p>
          </FadeUp>
        </div>

        {/* Why critical thinking is #1 */}
        <FadeUp>
          <div className="rounded-3xl bg-gradient-warm p-8 md:p-14 mb-20 border border-terracotta/15">
            <h3 className="font-serif text-2xl md:text-3xl leading-snug mb-10 max-w-3xl">
              Miért vált a kritikus gondolkodás a{" "}
              <span className="text-terracotta-deep">#1 prioritássá</span> a nagyvállalati
              képzésekben?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  t: "Az információ hitelessége",
                  d: "Az algoritmusok és a generatív AI korában a tények ellenőrzése (fact-checking) és a „hallucinációk” kiszűrése üzleti kockázatkezelési kérdés.",
                },
                {
                  t: "Komplex problémamegoldás",
                  d: "Az AI kiválóan végrehajt, de a stratégiai irányt, az etikai kereteket és az összefüggések átlátását az embernek kell biztosítania.",
                },
                {
                  t: "Adaptivitás",
                  d: "A folyamatosan változó piaci környezetben a mentális rugalmasság és az érveléstechnika különbözteti meg a végrehajtót a vezetőtől.",
                },
              ].map((p) => (
                <div key={p.t} className="border-t-2 border-terracotta/40 pt-5">
                  <h4 className="font-serif text-lg mb-3">{p.t}</h4>
                  <p className="text-ink-soft text-[15px] leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Mission */}
        <FadeUp>
          <p className="max-w-3xl text-lg md:text-xl text-ink-soft leading-relaxed mb-24 text-balance">
            A CriticalThinking.hu missziója, hogy a magyar munkaerőpiacot felvértezze azzal a
            kognitív{" "}
            <span className="font-serif italic text-ink">„operációs rendszerrel”</span>, amely
            képessé teszi őket az AI eszközök felelős és hatékony irányítására, valamint a
            megalapozott, logikus döntéshozatalra.
          </p>
        </FadeUp>

        {/* Cyber section */}
        <FadeUp>
          <div className="border-l-2 border-terracotta pl-6 md:pl-10 mb-20 max-w-4xl">
            <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              Human <span className="italic text-terracotta-deep">vs</span> Cyber Security
            </h3>
            <p className="text-lg text-ink-soft leading-relaxed">
              A legtöbb hagyományos cyber awareness képzés főleg külső fenyegetésekre tanít
              reagálni, miközben a támadások döntő része belső emberi működéseken csúszik át —
              és képes egy teljes vállalati infrastruktúrát letérdeltetni. A munkavállaló nem
              sziget, tettei nem maradnak sandbox-szerűen a vállalati kereteken belül.
            </p>
          </div>
        </FadeUp>

        {/* Focus areas */}
        <div className="mb-12">
          <FadeUp>
            <div className="flex items-center gap-3 mb-12">
              <Sparkles className="h-5 w-5 text-terracotta" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">
                Fókuszterületeink
              </p>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-3 gap-8">
            {focusAreas.map((a, i) => {
              const Icon = a.icon;
              return (
                <FadeUp key={a.n} delay={i * 0.1}>
                  <article className="group h-full bg-card rounded-2xl p-8 border border-border/60 hover:border-terracotta/40 transition-all duration-500 hover:shadow-elegant flex flex-col">
                    <div className="flex items-start justify-between mb-8">
                      <span className="font-serif text-3xl text-terracotta-deep/30">{a.n}</span>
                      <div className="h-12 w-12 rounded-xl bg-terracotta-soft/60 flex items-center justify-center group-hover:bg-terracotta group-hover:text-cream transition-colors">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h4 className="font-serif text-2xl leading-tight mb-1">{a.title}</h4>
                    <p className="font-serif italic text-terracotta-deep mb-5">{a.sub}</p>
                    <p className="text-ink-soft text-[15px] leading-relaxed mb-6">{a.body}</p>

                    <dl className="space-y-4 text-sm mt-auto pt-6 border-t border-border/60">
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.18em] text-terracotta-deep mb-1">
                          Fókusz
                        </dt>
                        <dd className="text-ink-soft leading-relaxed">{a.focus}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.18em] text-terracotta-deep mb-1">
                          Kinek ajánljuk
                        </dt>
                        <dd className="text-ink-soft leading-relaxed">{a.who}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.18em] text-terracotta-deep mb-1">
                          Eredmény
                        </dt>
                        <dd className="text-ink-soft leading-relaxed">{a.result}</dd>
                      </div>
                    </dl>
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </div>

        <FadeUp delay={0.2}>
          <div className="text-center mt-16">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-medium hover:bg-terracotta-deep transition-colors shadow-elegant"
            >
              Lépjünk kapcsolatba
              <span aria-hidden>→</span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
