import { motion, useReducedMotion } from "framer-motion";
import { FadeUp } from "./FadeUp";

const steps = [
  {
    letter: "A",
    word: "Attention",
    firewall: "Figyelmi tűzfal",
    action: "Észreveszem",
    question: "Mi ragadta meg a figyelmemet?",
  },
  {
    letter: "I",
    word: "Interpretation",
    firewall: "Értelmezési tűzfal",
    action: "Megvizsgálom",
    question: "Mit gondolok róla, és miért?",
  },
  {
    letter: "D",
    word: "Decision",
    firewall: "Döntési tűzfal",
    action: "Választok",
    question: "Mit választok, hogyan reagálok?",
  },
];

export function Method() {
  const reduce = useReducedMotion();
  return (
    <section id="modszer" className="py-20 md:py-28 px-6 bg-ink text-cream">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral mb-5">
            Módszertan · saját pedagógiai keretrendszer
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-5 max-w-3xl text-balance">
            Mielőtt az információból cselekvés lesz.
          </h2>
          <p className="text-cream/75 text-lg max-w-2xl mb-14">
            Az A.I.D. három ponton segít megállni, megvizsgálni a helyzetet, majd tudatosabban
            választani. A három mentális tűzfal ennek a magyarázó metaforája.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.letter}
              initial={reduce ? false : { opacity: 0.25, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : i * 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-cream/20 p-7"
            >
              <p className="font-display text-5xl text-coral mb-4" aria-hidden>
                {s.letter}
              </p>
              <p className="font-display text-xl mb-1">
                {s.word} · {s.firewall}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/60 mb-4">{s.action}</p>
              <p className="text-cream/85 leading-relaxed">{s.question}</p>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-xl bg-cream/5 border border-cream/15 p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-coral mb-3">
                Egy kérdés útravalónak
              </p>
              <p className="font-display text-xl md:text-2xl leading-snug">
                Mi az, amit most tényként kezelsz, de még nem ellenőriztél?
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-coral mb-3">
                A.I.D. munkafüzet · fejlesztés alatt
              </p>
              <p className="text-cream/80 leading-relaxed">
                Gyakorlati, önállóan használható munkafüzetnek készül. Nem garantál védelmet a
                manipuláció ellen, és nem ígér minden helyzetben jobb döntést. Azt segíti, hogy
                észrevedd, megvizsgáld és tudatosan válassz.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="button"
              disabled
              className="inline-flex items-center px-6 py-3 rounded-full border border-cream/15 bg-cream/10 text-cream/45 text-sm font-medium cursor-not-allowed"
            >
              Részletes keretrendszer · hamarosan
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
