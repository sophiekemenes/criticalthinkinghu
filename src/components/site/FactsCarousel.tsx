import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { FadeUp } from "./FadeUp";

const facts = [
  {
    cat: "Idegrendszer",
    fact: "Az agyad naponta körülbelül 35 000 tudatos döntést hoz — minden egyes választás kognitív energiát éget.",
  },
  {
    cat: "Figyelem",
    fact: "A Salience Network átlagosan 8 másodpercenként vált fókuszt — egy értesítés ezt 50%-kal meg tudja gyorsítani.",
  },
  {
    cat: "Bias",
    fact: "A Confirmation Bias már gyerekkorban kialakul: agyunk háromszor erősebben jegyzi meg az igazoló információt, mint a cáfolót.",
  },
  {
    cat: "Dopamin",
    fact: "Egy push-értesítés ugyanolyan dopamincsúcsot hoz létre, mint egy kis nyeremény egy nyerőautomatán.",
  },
  {
    cat: "Deep Work",
    fact: "Egy megszakítás után átlagosan 23 perc 15 másodperc kell ahhoz, hogy visszaérj az eredeti fókuszállapotba.",
  },
  {
    cat: "Social Engineering",
    fact: "A sikeres kibertámadások 82%-a emberi hibából indul — nem technikai sebezhetőségből.",
  },
  {
    cat: "Stressz",
    fact: "Stressz alatt a prefrontális kéreg vérellátása csökken — ekkor szó szerint butábban döntünk.",
  },
];

export function FactsCarousel() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(0);

  const go = (d: number) => {
    setDir(d);
    setI((x) => (x + d + facts.length) % facts.length);
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-ink text-cream relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-terracotta/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-4xl relative">
        <FadeUp>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Lightbulb className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Did you know?</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight text-center mb-16 text-balance">
            Apró tények az{" "}
            <span className="italic text-gold-soft">idegrendszeredről</span>.
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="relative min-h-[260px] md:min-h-[220px] flex items-center">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full text-center px-12"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta-soft mb-6">
                  {facts[i].cat}
                </p>
                <p className="font-serif text-2xl md:text-3xl leading-snug text-balance">
                  {facts[i].fact}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => go(-1)}
              aria-label="Előző tény"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-cream/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Következő tény"
              className="absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-cream/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {facts.map((_, k) => (
              <button
                key={k}
                onClick={() => {
                  setDir(k > i ? 1 : -1);
                  setI(k);
                }}
                aria-label={`${k + 1}. tény`}
                className={`h-1 rounded-full transition-all ${
                  k === i ? "w-8 bg-gold" : "w-1.5 bg-cream/20 hover:bg-cream/40"
                }`}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
