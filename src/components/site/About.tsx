import { FadeUp } from "./FadeUp";
import sophieImg from "@/assets/workshop/sophie-portre.webp";

const crossings = [
  "Kiberbiztonsági tudatosítás",
  "Emberi viselkedés",
  "Tanulásfejlesztés",
  "Kommunikáció",
  "AI",
  "Kritikai gondolkodás",
];

export function About() {
  return (
    <section id="rolam" className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-5xl grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <FadeUp className="md:col-span-5">
          <div className="relative max-w-sm mx-auto md:max-w-none">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-coral"
              aria-hidden
            />
            <img
              src={sophieImg}
              alt="Kemenes Andrea Sophie portréja"
              width={900}
              height={1124}
              loading="lazy"
              className="relative w-full aspect-[4/5] object-cover object-top rounded-2xl"
            />
          </div>
        </FadeUp>
        <FadeUp delay={0.05} className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-4">
            Miért pont erről beszélek?
          </p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-2 text-balance">
            Az emberi tényező nem egy lábjegyzet.
          </h2>
          <p className="text-coral-deep font-display mb-6">
            Kemenes Andrea Sophie · Human Engagement Architect
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Kiberbiztonsági tudatosítással, tanulással és emberi viselkedéssel foglalkoztam, mielőtt
            az AI minden beszélgetésbe beköltözött volna. Azóta még érdekesebb lett a kérdés: hogyan
            maradunk józanul gondolkodó emberek egy olyan környezetben, amely egyre több választ
            kínál, egyre gyorsabban?
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Itt kutatásokat, hétköznapi helyzeteket és gyakorlati modelleket kapcsolok össze. Nem
            azért, mert mindenre tudom a választ, hanem mert szeretném hogy a <em>jó</em> kérdések
            legyenek feltéve.
          </p>
          <ul className="flex flex-wrap gap-2 mb-8">
            {crossings.map((c) => (
              <li
                key={c}
                className="px-3 py-1 rounded-full border border-border text-sm text-ink-soft"
              >
                {c}
              </li>
            ))}
          </ul>
          <dl className="grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
            {[
              { n: "7 év", l: "kiberbiztonsági tudatosítás" },
              { n: "~30 000", l: "ember biztonsági döntései" },
              { n: "15 év", l: "tréneri tapasztalat" },
            ].map((x) => (
              <div key={x.n}>
                <dt className="font-display text-2xl md:text-3xl text-ink">{x.n}</dt>
                <dd className="text-sm text-ink-soft leading-snug mt-1">{x.l}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </div>
    </section>
  );
}
