import { Building2, Users } from "lucide-react";
import { FadeUp } from "./FadeUp";

const items = [
  {
    icon: Building2,
    title: "Vállalati ág",
    desc: "Kognitív biztonság, AI adoption és NIS2-felkészülés vállalati csapatoknak — a 3 Mentális Tűzfal keretrendszer üzleti alkalmazása. Jelenleg fejlesztés alatt.",
  },
  {
    icon: Users,
    title: "JOGSI",
    desc: "Digitális jogosítvány a következő generációnak — a figyelem és a tudatos döntéshozatal eszköztára szülőknek és tanároknak. Jelenleg fejlesztés alatt.",
  },
];

export function ComingSoon() {
  return (
    <section id="hamarosan" className="py-24 md:py-32 px-6 bg-muted/40">
      <div className="mx-auto max-w-5xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">
            Amin dolgozom
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-12 text-balance">
            Hamarosan
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.title} delay={0.15 + i * 0.1}>
                <div className="h-full rounded-2xl border border-border/60 bg-card p-7">
                  <Icon className="h-6 w-6 text-coral mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-ink-soft text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
