import { FadeUp } from "./FadeUp";

export function Tension() {
  return (
    <section className="py-20 md:py-28 px-6 bg-ink text-cream">
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-balance">
            Az AI gyorsabbá teszi a gondolkodást.{" "}
            <span className="text-coral">
              De mit kezdünk azzal, amit közben kiszervezünk belőle?
            </span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-8 text-lg md:text-xl text-cream/75 leading-relaxed max-w-2xl">
            Attól, hogy egész nap információt fogyasztunk, még nem biztos, hogy bármit meg is
            emésztettünk. A gyorsabb döntés pedig még nem jobb döntés.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
