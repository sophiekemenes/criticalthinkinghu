import { useState } from "react";
import { Link } from "@tanstack/react-router";

const claim = "Az AI gyorsabbá teszi a munkánkat.";

const options = [
  {
    id: "fact",
    label: "Tény",
    reply:
      "Lehet igaz bizonyos körülmények között, de így túl általános. Milyen feladatban, kinek, milyen mérőszám szerint? A „gyorsabb” még nem feltétlenül jelent „jobb” eredményt.",
  },
  {
    id: "interpretation",
    label: "Értelmezés",
    reply:
      "Jó kiindulópont. Ez egy általános értelmező állítás, amelynek igazsága függ a feladattól, a felhasználótól és attól, hogyan mérjük a gyorsaságot.",
  },
  {
    id: "hypothesis",
    label: "Hipotézis, amit ellenőrizni kell",
    reply:
      "Pontosan ezt érdemes megvizsgálni. Milyen feladatra, milyen AI-eszközre, milyen összehasonlításra és milyen bizonyítékra támaszkodunk?",
  },
];

export function ClaimCheck() {
  const [choice, setChoice] = useState<string | null>(null);
  const picked = options.find((o) => o.id === choice);

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-4">
        Egy állítás, amit érdemes megkérdőjelezni
      </p>
      <p className="font-display text-xl md:text-2xl leading-snug mb-6">„{claim}”</p>
      <p className="text-ink-soft mb-3">Szerinted mi ez?</p>
      <div role="group" aria-label="Az állítás besorolása" className="flex flex-wrap gap-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={choice === o.id}
            onClick={() => setChoice(o.id)}
            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
              choice === o.id
                ? "bg-ink text-cream border-ink"
                : "border-ink/25 text-ink hover:border-coral hover:text-coral"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-6 min-h-[5.5rem]">
        {picked && <p className="leading-relaxed">{picked.reply}</p>}
      </div>
      <p className="mt-auto pt-2 text-sm text-ink-soft">
        Ez nem teszt, és nem pontoz. Csak azt mutatja meg, milyen gyorsan kezelünk tényként egy
        mondatot, amely még pontosítást igényel.
      </p>
      <Link
        to="/cikkek/$slug"
        params={{ slug: "a-torzitas-terkep" }}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-coral transition-colors"
      >
        Az értelmezésről bővebben: A torzítás-térkép <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
