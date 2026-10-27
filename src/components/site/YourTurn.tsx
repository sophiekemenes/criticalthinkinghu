import { motion, useReducedMotion } from "framer-motion";
import { CatNote } from "./CatNote";
import { ClaimCheck } from "./ClaimCheck";
import { FadeUp } from "./FadeUp";

const steps = [
  { letter: "A", word: "Attention", action: "Észreveszem" },
  { letter: "I", word: "Interpretation", action: "Megvizsgálom" },
  { letter: "D", word: "Decision", action: "Választok" },
];

function Decision() {
  return (
    <div className="flex flex-col h-full">
      <h3 className="font-display text-xl md:text-2xl leading-snug mb-4">
        Innentől rajtad a döntés.
      </h3>
      <p className="text-ink-soft leading-relaxed mb-6">
        Ha úgy látod, hogy saját magadnak, a cégednek, vagy a rendezvényednek szüksége lehet az
        együttműködésünkre; ha észrevettél hasznosítható, értékes szempontokat, akkor tudod, hol
        érsz el. Fordulj hozzám bizalommal.
      </p>
      <a
        href="#kapcsolat"
        className="mt-auto self-start inline-flex items-center px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors"
      >
        Beszéljünk
      </a>
    </div>
  );
}

const content = [<CatNote key="a" />, <ClaimCheck key="i" />, <Decision key="d" />];

// A főoldal záró íve: az A.I.D. most a látogatón fut végig (három kártya, mint a Módszertanban),
// és a Beszéljünk részhez vezet.
export function YourTurn() {
  const reduce = useReducedMotion();
  return (
    <section id="most-te-jossz" className="px-6 pt-20 md:pt-28 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-4">Most te jössz</p>
          <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-5 text-balance">
            A.I.D. módszertan a gyakorlatban
          </h2>
          <p className="text-ink-soft text-lg max-w-2xl mb-10">
            Elég hogy csak itt jártál, és máris belekóstolhatsz a saját tűzfalaid működésébe:
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.letter}
              initial={reduce ? false : { opacity: 0.25, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : i * 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-xl border border-border/60 bg-card p-7"
            >
              <p className="font-display text-5xl text-coral mb-4" aria-hidden>
                {s.letter}
              </p>
              <p className="font-display text-xl mb-1">{s.word}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-5">{s.action}</p>
              <div className="flex-1">{content[i]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
