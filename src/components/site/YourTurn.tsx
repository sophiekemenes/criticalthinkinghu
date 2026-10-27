import { CatNote } from "./CatNote";
import { ClaimCheck } from "./ClaimCheck";
import { FadeUp } from "./FadeUp";

const rows = [
  { letter: "A", word: "Attention", action: "Észreveszem" },
  { letter: "I", word: "Interpretation", action: "Megvizsgálom" },
  { letter: "D", word: "Decision", action: "Választok" },
];

function Row({ index, children }: { index: number; children: React.ReactNode }) {
  const r = rows[index];
  return (
    <FadeUp>
      <div className="grid md:grid-cols-[9rem_1fr] gap-4 md:gap-8 py-8 border-t border-border/60">
        <div>
          <p className="font-display text-5xl md:text-6xl text-coral leading-none" aria-hidden>
            {r.letter}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-soft">
            {r.word} · {r.action}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </FadeUp>
  );
}

// A főoldal záró íve: az A.I.D. most a látogatón fut végig, és a Beszéljünk részhez vezet.
export function YourTurn() {
  return (
    <section id="most-te-jossz" className="px-6 pb-16 md:pb-20">
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-4">Most te jössz</p>
          <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-10 text-balance">
            Észreveszed. Megvizsgálod. Döntesz.
          </h2>
        </FadeUp>

        <Row index={0}>
          <CatNote />
        </Row>
        <Row index={1}>
          <ClaimCheck />
        </Row>
        <Row index={2}>
          <h3 className="font-display text-2xl md:text-3xl leading-snug mb-4">
            Innentől rajtad a döntés.
          </h3>
          <p className="text-ink-soft text-lg leading-relaxed max-w-2xl mb-6">
            Ha úgy látod, hogy saját magadnak, a cégednek, vagy a rendezvényednek szüksége lehet az
            együttműködésünkre; ha észrevettél hasznosítható, értékes szempontokat, akkor tudod, hol
            érsz el. Fordulj hozzám bizalommal.
          </p>
          <a
            href="#kapcsolat"
            className="inline-flex items-center px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors"
          >
            Beszéljünk
          </a>
        </Row>
      </div>
    </section>
  );
}
