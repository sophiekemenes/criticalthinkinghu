import { Link } from "@tanstack/react-router";
import { FadeUp } from "./FadeUp";

// A macska-geg (CatCameo) magyarázata. Forrás nélküli kutatási állítás nem kerülhet ide:
// ha lesz konkrét vizsgálat, "mit találtak" / "mit olvasok ki belőle" bontásban jöhet.
export function CatNote() {
  return (
    <section id="macska" className="pb-20 md:pb-28 px-6">
      <div className="mx-auto max-w-3xl border-t border-border/60 pt-14">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">Egy kitérő</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6 text-balance">
            Láttad a macskát?
          </h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Lehet, hogy észrevetted. Lehet, hogy nem. Lehet, hogy egy pillanatra kizökkentett
              abból, amit éppen olvastál.
            </p>
            <p>Először is: bocsánat a kis kitérőért. De éppen ez volt a lényeg.</p>
            <p className="text-ink-soft">
              A digitális környezetben folyamatosan versenyeznek az ingerek a figyelmedért. Egy új
              mozgás, egy felugró értesítés, egy villanás a képernyő szélén. Nem mindegyikre
              figyelsz tudatosan, és nem mindegyik szakít félbe látványosan. Ettől még hatással
              lehetnek arra, hogyan osztod el a figyelmedet.
            </p>
            <p className="text-ink-soft">
              És vajon mikor tértél vissza ahhoz, amit eredetileg csináltál?
            </p>
            <p>
              A lényeg nem az, hogy soha ne terelődjön el a figyelmed. Hanem az, hogy{" "}
              <span className="accent-mark">észrevedd, mi tereli el</span>, és legyen lehetőséged
              eldönteni, visszatérsz-e ahhoz, ami igazán fontos.
            </p>
            <p className="font-display text-xl md:text-2xl leading-snug">
              Mert mielőtt az információból reakció lesz, van egy pillanat, amelyben még te
              választhatsz.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Link
            to="/cikkek/$slug"
            params={{ slug: "a-figyelmed-kiskutya" }}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-coral transition-colors"
          >
            A figyelemről bővebben: A figyelmed kiskutya <span aria-hidden>→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
