import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain pt-20">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-[520px] h-[520px] rounded-full bg-terracotta-soft blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 -right-32 w-[480px] h-[480px] rounded-full bg-gold-soft blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-deep mb-8"
        >
          <span className="h-px w-8 bg-terracotta" />
          Kutatás-vezérelt brand
          <span className="h-px w-8 bg-terracotta" />
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.02] text-balance"
        >
          Kritikus Gondolkodás
          <span className="block italic font-light text-terracotta-deep">
            &amp; Digitális Tudatosság
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 text-lg md:text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed text-balance"
        >
          Az emberi intelligencia védelme az AI korszakában.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#celcsoport"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-cream font-medium hover:bg-terracotta-deep transition-all shadow-elegant"
          >
            Felfedezem
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
          </a>
          <a
            href="#andrea"
            className="inline-flex items-center px-7 py-3.5 rounded-full border border-ink/20 text-ink hover:border-terracotta hover:text-terracotta transition-colors"
          >
            Megismerem Andreát
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-ink-soft tracking-widest uppercase"
      >
        <span className="block animate-bounce">↓</span>
      </motion.div>
    </section>
  );
}
