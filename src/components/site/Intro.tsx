import { FadeUp } from "./FadeUp";

export function Intro() {
  return (
    <section id="bemutatkozas" className="py-28 md:py-40 px-6 relative">
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta-deep mb-6">
            Bemutatkozás
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-12 text-balance">
            A tudatosság nem luxus, hanem az evolúciónk{" "}
            <span className="italic text-terracotta-deep">következő lépésének a záloga.</span>
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-12 gap-10 text-lg leading-relaxed text-ink-soft">
          <FadeUp delay={0.2} className="md:col-span-7 space-y-6">
            <p>
              A <span className="text-ink font-medium">Criticalthinking.hu</span> egy
              kutatás-vezérelt brand, amely alapvetően az emberek folyamatos kihívásokkal
              szembesülő idegrendszerét figyelembe véve kínál szolgáltatásokat különböző
              célcsoportok számára.
            </p>
            <p>
              Küldetésünk, hogy a vezetők, döntéshozók és a következő generáció megőrizzék
              mentális szuverenitásukat egy olyan korban, ahol az algoritmusok versengenek a
              figyelmükért, az oktatás alapjaiban alakul át, és az információtúlterhelés a
              mindennapok része.
            </p>
          </FadeUp>
          <FadeUp delay={0.35} className="md:col-span-5 md:pl-8 md:border-l border-terracotta/30">
            <p className="font-serif text-2xl italic leading-snug text-ink">
              Az <span className="not-italic font-semibold text-terracotta-deep">EMBER</span> áll
              a tevékenységeink középpontjában — biológiai sajátosságaival, ebben a
              közhelyszerűen felgyorsult világban.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
