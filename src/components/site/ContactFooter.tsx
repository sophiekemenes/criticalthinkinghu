import { Crown, Mail } from "lucide-react";
import { FadeUp } from "./FadeUp";
import andreaStage from "@/assets/andrea-stage.png";

const RECIPIENT = "hello@criticalthinking.hu";

export function ContactFooter() {
  return (
    <footer id="kapcsolat" className="bg-ink text-cream pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-14 pb-20 items-center">
          {/* Left side */}
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="flex items-center gap-2 mb-6">
                <Crown className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-[0.25em] text-gold">Beszéljünk</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-6 text-balance">
                Vegyük fel a{" "}
                <span className="italic text-gold-soft">kapcsolatot.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-cream/70 leading-relaxed mb-10">
                Vállalati képzés, AI adoption vagy NIS2 stratégia? Írj néhány sort a
                kihívásról — 2 munkanapon belül válaszolok.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <a
                href={`mailto:${RECIPIENT}`}
                className="inline-flex items-center gap-3 text-cream hover:text-gold transition-colors group"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-serif italic text-lg group-hover:underline underline-offset-4">
                  {RECIPIENT}
                </span>
              </a>
            </FadeUp>
          </div>

          {/* Photo */}
          <FadeUp delay={0.2} className="lg:col-span-7">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-sunset rounded-3xl opacity-20 blur-3xl" />
              <img
                src={andreaStage}
                alt="Kemenes Andrea Sophie előadás közben — iCT Global Enterprise 2026"
                className="relative w-full h-auto rounded-3xl border border-cream/10 shadow-elegant object-cover"
                loading="lazy"
              />
            </div>
          </FadeUp>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/50">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="font-serif text-cream/80">
              Critical<span className="italic text-gold">Thinking</span>.hu
            </span>
          </div>
          <p>© {new Date().getFullYear()} Kemenes Andrea Sophie · Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
}
