import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Brain, Compass } from "lucide-react";
import { FadeUp } from "./FadeUp";

const threats = [
  "figyelemrablással",
  "információs túlterheléssel",
  "manipulációval",
  "döntési fáradtsággal",
  "stressz alatti hibás ítéletekkel",
  "digitális dopamincsapdákkal",
];

const tens = [
  { label: "10 perc", desc: "Mit fogok érezni a döntésről?" },
  { label: "10 hónap", desc: "Mit fogok gondolni róla?" },
  { label: "10 év múlva", desc: "Mit fog jelenteni az életemben?" },
];

function TenTenTen() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % tens.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-44 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="font-display text-5xl md:text-6xl text-coral-deep">
            {tens[i].label}
          </div>
          <div className="text-sm text-ink-soft mt-3">{tens[i].desc}</div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-0 inset-x-0 flex justify-center gap-2">
        {tens.map((_, k) => (
          <span
            key={k}
            className={`h-1 rounded-full transition-all ${k === i ? "w-8 bg-coral" : "w-1.5 bg-coral/20"}`}
          />
        ))}
      </div>
    </div>
  );
}

function SalienceVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-44" aria-hidden>
      <defs>
        <radialGradient id="sal" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#D8542A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D8542A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(6)].map((_, i) => (
        <circle
          key={i}
          cx={100}
          cy={80}
          r={15 + i * 12}
          fill="none"
          stroke="#D8542A"
          strokeOpacity={0.15 + i * 0.05}
          strokeWidth={0.6}
        />
      ))}
      <circle cx={100} cy={80} r={50} fill="url(#sal)" />
      <circle cx={100} cy={80} r={4} fill="#B8461F" />
      {/* dart lines */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        // Rounded to 2 decimals: Math.cos/sin can return a float that
        // differs in its last digits between the Node SSR/prerender pass
        // and the browser's JS engine, which React flags as a hydration
        // mismatch even though the visual difference is sub-pixel.
        const round = (n: number) => Math.round(n * 100) / 100;
        return (
          <line
            key={i}
            x1={round(100 + Math.cos(rad) * 18)}
            y1={round(80 + Math.sin(rad) * 18)}
            x2={round(100 + Math.cos(rad) * 70)}
            y2={round(80 + Math.sin(rad) * 70)}
            stroke="#161615"
            strokeWidth={0.5}
            strokeDasharray="2 3"
            opacity={0.5}
          />
        );
      })}
    </svg>
  );
}

function BiasesVisual() {
  const biases = ["Confirmation", "Anchoring", "Halo", "Recency", "Sunk Cost", "Bandwagon"];
  return (
    <div className="h-44 flex items-center justify-center px-2">
      <div className="flex flex-wrap gap-2 justify-center">
        {biases.map((b, i) => (
          <span
            key={b}
            className={`text-xs px-3 py-1.5 rounded-full border border-coral/30 ${
              i % 2 ? "bg-coral-soft text-ink" : "bg-transparent text-ink-soft"
            }`}
            style={{
              transform: `rotate(${(i % 2 ? 1 : -1) * (i * 1.5)}deg)`,
            }}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

const firewalls = [
  {
    n: "01",
    icon: Eye,
    title: "Percepciós tűzfal",
    sub: "Figyelem védelme",
    desc: "A Salience Network — az agy figyelmi kapcsolója — tudatos újrahangolása, hogy mi dönthessük el, mi érdemli meg a fókuszunkat.",
    situation: "A válasz túl gyorsan jön, mielőtt eldöntenéd, mit is vártál.",
    signs: [
      "skimmelés az első mondat után",
      "egyre rövidebb promptok, egyre kevesebb saját gondolkodás",
      "„elveszett idő” AI-jal anélkül, hogy emlékeznél az eredeti kérdésre",
    ],
    tip: "A prompt elküldése előtt írd le egy mondatban, mit vársz válaszként — ha a válasz után nem tudod összevetni, nem olvastad el, csak fogyasztottad.",
    visual: <SalienceVisual />,
  },
  {
    n: "02",
    icon: Brain,
    title: "Értelmezési tűzfal",
    sub: "Logikai védelem",
    desc: "A megismerés rejtett torzításainak (kognitív biasok) felismerése és semlegesítése a döntéshozatal előtt.",
    situation: "A magabiztos hangnem miatt fogadsz el egy állítást, nem az ellenőrzés miatt.",
    signs: [
      "gyorsabban elfogadod, ha megerősíti, amit már gondoltál",
      "nem kérdezed meg „honnan tudod?”",
      "átfogalmazott kérdésre kapott eltérő válasz zavarba hoz, de nem gyanakvóvá tesz",
    ],
    tip: "Kontroll-kérdés minden fontos válasznál — „ha ezt egy gyakornoktól kapnám ugyanilyen magabiztosan, ellenőrizném?” Ha igen, most is ellenőrizd.",
    visual: <BiasesVisual />,
  },
  {
    n: "03",
    icon: Compass,
    title: "Döntési tűzfal",
    sub: "Tudatos választás",
    desc: "A 10/10/10 módszer — három időhorizont, hogy az impulzus helyett az érték irányítson.",
    situation: "Az AI három opciót ad, és automatikusan a legkönnyebben elfogadhatót választod.",
    signs: [
      "nem tudod megindokolni a választást az AI válaszán kívül",
      "kevésbé mersz eltérni az AI-tól, mint egy embertől",
      "már nem „mit gondolok”, hanem „mit mondott az AI” a kérdés",
    ],
    tip: "A 10/10/10 alkalmazása magára a javaslatra — mit gondolok róla 10 perc / 10 óra / 10 nap múlva. Ha egyik időtávon sincs saját hozzáadott nézőpont, az jóváhagyás volt, nem döntés.",
    visual: <TenTenTen />,
  },
];

export function MentalFirewalls() {
  return (
    <section id="firewalls" className="py-24 md:py-36 px-6 bg-ink text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-coral/10 blur-3xl" />
      <div className="mx-auto max-w-7xl relative">
        <div className="max-w-3xl mb-20">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral mb-5">
              The 3 Mental Firewalls™
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance mb-8">
              A 3 Mentális Tűzfal <span className="accent-mark">Framework</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg text-cream/70 leading-relaxed">
              Modern kognitív önvédelmi keretrendszer az idegtudományok, a viselkedéspszichológia,
              valamint a digitális- és kibervédelem metszéspontjában.
            </p>
          </FadeUp>
        </div>

        {/* Threats grid */}
        <FadeUp>
          <div className="rounded-2xl border border-cream/10 p-8 md:p-10 mb-20 bg-cream/[0.02]">
            <p className="text-cream/60 mb-6 text-sm">A mai ember nem fizikai ragadozókkal küzd, hanem:</p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {threats.map((t, i) => (
                <li key={t} className="flex items-baseline gap-3 font-display text-lg">
                  <span className="text-coral text-xs">0{i + 1}</span>
                  <span className="text-cream/90">{t}</span>
                </li>
              ))}
            </ul>
            <p className="text-cream/60 text-sm mt-8 leading-relaxed max-w-2xl">
              Az agyunk korszakokban kifejlődött részei még a múltban ragadtak — a sebesség,
              amiben élünk, tudatos evolúciót kívánna, hisz „időnk alig van rá”.
            </p>
          </div>
        </FadeUp>

        {/* Timeline */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16 relative">
          {/* connector line */}
          <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />

          {firewalls.map((f, i) => {
            const Icon = f.icon;
            return (
              <FadeUp key={f.n} delay={i * 0.15}>
                <div className="relative h-full rounded-2xl bg-cream/[0.04] border border-cream/10 p-7 hover:border-coral/40 transition-colors backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-sunset flex items-center justify-center shadow-lg ring-4 ring-ink relative z-10">
                      <Icon className="h-5 w-5 text-cream" strokeWidth={1.5} />
                    </div>
                    <span className="font-display text-3xl text-coral/40">{f.n}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-1">{f.title}</h3>
                  <p className="text-coral-soft text-sm mb-4">{f.sub}</p>
                  <p className="text-cream/70 text-[15px] leading-relaxed mb-6">{f.desc}</p>

                  <div className="rounded-xl bg-ink/40 border border-cream/5 overflow-hidden mb-6">
                    {f.visual}
                  </div>

                  {/* Self-check — lásd az induló cikket: /cikkek/self-check-ai */}
                  <div className="rounded-xl border border-coral/20 bg-cream/[0.03] p-5 space-y-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-coral mb-1.5">
                        Helyzet
                      </p>
                      <p className="text-cream/80 text-sm leading-relaxed">{f.situation}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-coral mb-1.5">
                        Óvó jelek
                      </p>
                      <ul className="space-y-1">
                        {f.signs.map((s) => (
                          <li key={s} className="text-cream/70 text-sm leading-relaxed flex gap-2">
                            <span className="text-coral/60" aria-hidden>
                              ·
                            </span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-coral mb-1.5">
                        Gyakorlati tipp
                      </p>
                      <p className="text-cream/80 text-sm leading-relaxed">{f.tip}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp>
          <div className="text-center">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-sunset text-cream font-medium hover:opacity-90 transition-opacity shadow-elegant"
            >
              Részletek
              <span aria-hidden>→</span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
