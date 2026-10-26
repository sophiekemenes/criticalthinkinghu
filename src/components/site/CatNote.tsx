import { CatShape } from "./CatCameo";
import { FadeUp } from "./FadeUp";

// A macska-geg (CatCameo) rövid magyarázata. Kutatási állítás forrás nélkül nem kerülhet ide.
export function CatNote() {
  return (
    <section id="macska" className="px-6 pb-16 md:pb-20">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <div className="flex items-start gap-5 rounded-xl border border-border/60 bg-card p-6">
            <CatShape className="hidden sm:block shrink-0 text-ink mt-1" />
            <div>
              <p className="font-display text-lg mb-2">Láttad a macskát?</p>
              <p className="text-ink-soft leading-relaxed">
                Lehet, hogy észrevetted, lehet, hogy nem. Lehet, hogy kizökkentett abból, amit éppen
                olvastál, vagy lehet, hogy elmosolyodtál. Először is bocsánat a kis kitérőért: pont
                így demonstráltam azt, amit tulajdonképpen az egész digitális világ körülöttünk
                tesz. Saját tartalmaimat versenyeztettem egy képernyőn átfutó kicsi fekete
                macskával.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
