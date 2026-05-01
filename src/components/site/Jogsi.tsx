import { FadeUp } from "./FadeUp";

const letters = [
  { l: "J", w: "Jól döntök online" },
  { l: "O", w: "Okosan osztok meg" },
  { l: "G", w: "Gondolkodom, mielőtt kattintok" },
  { l: "S", w: "Segítek másoknak is" },
  { l: "I", w: "Internetezem felelősen" },
];

export function Jogsi() {
  return (
    <section id="jogsi" className="py-24 md:py-36 px-6 bg-gradient-warm">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta-deep mb-5">
              A „JOGSI” Brand
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-8 text-balance">
              Digitális{" "}
              <span className="italic text-terracotta-deep">jogosítvány</span> a
              következő generációnak.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg text-ink-soft leading-relaxed">
              Az információhoz hozzáférés ma már alap. A legkritikusabb skill a figyelem
              megzabolázása. Ebben az életkorban dől el, hogy a fiatalok képesek-e a mély
              fókuszú munkára — vagy hagyjuk, hogy a digitális ingeráradat és a
              dopaminvezérelt megszakítások szétforgácsolják a mentális sávszélességüket.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-6 text-lg text-ink leading-relaxed font-serif italic">
              A jövő versenyelőnye az lesz, ki tud{" "}
              <span className="not-italic font-semibold text-terracotta-deep">
                tisztán gondolkodni a zajban.
              </span>
            </p>
          </FadeUp>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {letters.map((row, i) => (
            <FadeUp key={row.l} delay={i * 0.08}>
              <div className="group flex items-center gap-6 md:gap-10 bg-card/70 backdrop-blur-sm rounded-2xl border border-terracotta/15 p-5 md:p-7 hover:border-terracotta hover:bg-card transition-all duration-500 hover:translate-x-2">
                <span className="font-serif text-6xl md:text-8xl leading-none text-terracotta-deep group-hover:text-terracotta transition-colors w-16 md:w-24 text-center">
                  {row.l}
                </span>
                <span className="h-12 md:h-16 w-px bg-terracotta/30" />
                <span className="font-serif text-xl md:text-2xl text-ink leading-snug">
                  {row.w}
                </span>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.5}>
            <div className="pt-8 text-center md:text-left">
              <a
                href="#kapcsolat"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-medium hover:bg-terracotta-deep transition-colors shadow-elegant"
              >
                Többet szeretnék tudni
                <span aria-hidden>→</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
