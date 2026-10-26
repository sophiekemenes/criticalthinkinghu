import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-8"
        >
          AI · kognitív biztonság · kritikai gondolkodás
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.02] text-balance"
        >
          Tiszta gondolkodás.
          <span className="block">
            Saját <span className="accent-mark">döntés.</span>
          </span>
        </motion.h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 max-w-2xl space-y-5 text-lg md:text-xl leading-relaxed"
        >
          <p className="text-ink-soft">
            A figyelemről, az ítélőképességről és a döntéseinkről írok és beszélek. Arról, hogy
            hogyan őrizhetjük meg a gondolkodásunk integritását egy olyan világban, amely egyre több
            mindent szeretne elvégezni helyettünk, vagy elvégeztetni velünk. A kockázatokat
            vizsgálom az információs, digitális és kibertérben, és legújabban a generatív AI-okkal
            való interakciók során.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <a
            href="#modszer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-coral text-cream font-medium hover:bg-coral-deep transition-colors"
          >
            Az A.I.D. keretrendszer <span aria-hidden>↓</span>
          </a>
          <a
            href="#eloadasok"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-ink/25 text-ink hover:border-coral hover:text-coral transition-colors"
          >
            Előadások és témák
          </a>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 font-display text-sm text-coral-deep"
        >
          <span aria-hidden>↳ </span>Igen, ez a mondat is azért van itt, hogy megállítsa a
          görgetést.
        </motion.p>
      </div>
    </section>
  );
}
