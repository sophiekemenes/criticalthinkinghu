import { Link } from "@tanstack/react-router";
import { CatShape } from "./CatCameo";

// A macska-geg (CatCameo) rövid magyarázata. Kutatási állítás forrás nélkül nem kerülhet ide.
// A kártyakeretet és a megjelenési animációt a YourTurn adja (A oszlop).
export function CatNote() {
  return (
    <div id="macska" className="flex flex-col h-full">
      <CatShape className="shrink-0 text-ink w-16 h-auto mb-4" />
      <p className="font-display text-lg mb-2">Láttad a macskát?</p>
      <p className="text-ink-soft leading-relaxed mb-3">
        Lehet, hogy észrevetted, lehet, hogy nem. Lehet, hogy kizökkentett abból, amit éppen
        olvastál, vagy lehet, hogy elmosolyodtál. Először is bocsánat a kis kitérőért: pont így
        demonstráltam azt, amit tulajdonképpen az egész digitális világ körülöttünk tesz. Saját
        tartalmaimat versenyeztettem egy képernyőn átfutó kicsi fekete macskával.
      </p>
      <p className="text-ink-soft leading-relaxed mb-4">
        A digitális környezetben folyamatosan versenyeznek az ingerek. Egy új mozgás, egy felugró
        értesítés, egy villanás a képernyő szélén. Nem mindegyikre figyelsz tudatosan, és nem
        mindegyik szakít félbe látványosan. Ettől még hatással lehet arra, hogyan osztod fel a
        figyelmedet, és fogyaszthatja a kognitív tartalékaidat.
      </p>
      <Link
        to="/cikkek/$slug"
        params={{ slug: "a-figyelmed-kiskutya" }}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-coral transition-colors"
      >
        A figyelemről bővebben: A figyelmed kiskutya <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
