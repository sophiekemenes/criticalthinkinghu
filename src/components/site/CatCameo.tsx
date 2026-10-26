import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Egyetlen, rövid vizuális geg: görgetés közben egyszer átfut egy macska.
// Nem takar tartalmat (pointer-events nélkül), csökkentett mozgásnál meg sem jelenik.
export function CatCameo() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce || shown) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 2.2) {
        setShown(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce, shown]);

  if (reduce || !shown || done) return null;

  return (
    <div aria-hidden>
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-40 h-16 overflow-hidden">
        <motion.div
          initial={{ x: -120 }}
          animate={{ x: "110vw" }}
          transition={{ duration: 6, ease: "linear" }}
          onAnimationComplete={() => setDone(true)}
          className="absolute bottom-0 text-ink"
        >
          <motion.svg
            width="96"
            height="56"
            viewBox="0 0 96 56"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.35, repeat: Infinity }}
            fill="currentColor"
          >
            <path
              d="M16 30 C4 28 2 14 8 8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="40" cy="30" rx="26" ry="11" />
            <circle cx="70" cy="22" r="9" />
            <polygon points="63,16 65,6 71,14" />
            <polygon points="69,14 75,6 78,17" />
            <circle cx="73" cy="21" r="1.6" fill="var(--color-cream)" />
            <path
              d="M22 38 L14 52 M32 40 L28 54 M50 40 L58 54 M58 38 L72 50"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </motion.svg>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 5, times: [0, 0.15, 0.8, 1], delay: 0.8 }}
        className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-44 z-40 px-3 py-1 rounded-full bg-card/90 border border-border/60 font-display text-xs text-ink-soft whitespace-nowrap"
      >
        A figyelmed most is dolgozik. Nem biztos, hogy neked.
      </motion.p>
    </div>
  );
}
