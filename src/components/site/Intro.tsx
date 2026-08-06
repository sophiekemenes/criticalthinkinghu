import { FadeUp } from "./FadeUp";

export function Intro() {
  return (
    <section id="bemutatkozas" className="py-28 md:py-40 px-6 relative">
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-6">
            Bemutatkozás
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-12 text-balance">
            A tudatosság nem luxus, hanem az evolúciónk{" "}
            <span className="accent-mark">következő lépésének a záloga.</span>
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-12 gap-10 text-lg leading-relaxed text-ink-soft">
          <FadeUp delay={0.2} className="md:col-span-7 space-y-6">
            <p>
              A döntéseinket ma egyre inkább külső rendszerek akarják átvenni —
              algoritmusok, generatív AI, folyamatos információs túlterhelés. Ez nem
              elméleti kérdés, hanem mindennapi, kézzelfogható kihívás vezetőknek,
              szakembereknek és a következő generációnak egyaránt.
            </p>
            <p>
              Ez ellen véd a{" "}
              <span className="text-ink font-medium">3 Mentális Tűzfal</span> keretrendszer
              — alább részletesen.
            </p>
          </FadeUp>
          <FadeUp delay={0.35} className="md:col-span-5 md:pl-8 md:border-l border-coral/30">
            <p className="font-display text-2xl leading-snug text-ink">
              Az <span className="font-semibold text-coral-deep">EMBER</span> áll
              a tevékenységeink középpontjában — biológiai sajátosságaival, ebben a
              közhelyszerűen felgyorsult világban.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
