import { Building2, Brain, Users, ArrowUpRight } from "lucide-react";
import { FadeUp } from "./FadeUp";

const cards = [
  {
    icon: Building2,
    eyebrow: "Vállalatoknak",
    title: "Kognitív biztonság, AI adoption, Upskilling",
    desc: "Stratégiai gondolkodás csapatszinten, mérhető eredményekkel.",
    href: "#vallalati",
    accent: "from-ink to-ink-soft",
    text: "text-cream",
    vibe: "Strategic · Solid",
  },
  {
    icon: Brain,
    eyebrow: "Professionals",
    title: "Fókusz & Hatékonyság — a 3 Mentális Tűzfal™",
    desc: "Egyéni kognitív védőrendszer az információs túlterhelés ellen.",
    href: "#firewalls",
    accent: "from-terracotta to-terracotta-deep",
    text: "text-cream",
    vibe: "Sharp · Tech",
  },
  {
    icon: Users,
    eyebrow: "Szülők & tanárok",
    title: "Biztonságos digitális jövő — JOGSI",
    desc: "Eszköztár a következő generáció figyelmének és értékeinek védelmére.",
    href: "#jogsi",
    accent: "from-gold-soft to-terracotta-soft",
    text: "text-ink",
    vibe: "Approachable · Empathetic",
  },
];

export function AudienceSelector() {
  return (
    <section id="celcsoport" className="py-24 md:py-32 px-6 bg-muted/40">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl mb-16">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta-deep mb-5">
              Hová tartozol?
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-balance">
              Három út, egy közös cél: a{" "}
              <span className="italic text-terracotta-deep">tiszta gondolkodás.</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <FadeUp key={c.eyebrow} delay={i * 0.12}>
                <a
                  href={c.href}
                  className={`group relative h-full block rounded-3xl p-8 md:p-10 bg-gradient-to-br ${c.accent} ${c.text} overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-soft hover:shadow-elegant`}
                >
                  <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-700" />

                  <div className="relative flex flex-col h-full min-h-[360px]">
                    <Icon className="h-9 w-9 mb-8" strokeWidth={1.4} />
                    <p className="text-[11px] uppercase tracking-[0.2em] opacity-70 mb-3">
                      {c.eyebrow}
                    </p>
                    <h3 className="font-serif text-2xl md:text-[1.7rem] leading-snug mb-4">
                      {c.title}
                    </h3>
                    <p className="opacity-80 text-[15px] leading-relaxed mb-auto">{c.desc}</p>

                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-current/15">
                      <span className="text-[11px] uppercase tracking-[0.2em] opacity-60">
                        {c.vibe}
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </a>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
