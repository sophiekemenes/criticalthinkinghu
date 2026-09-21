import { Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, Brain, Compass } from "lucide-react";
import { EnHeader } from "@/components/site/EnHeader";
import { EnFooter } from "@/components/site/EnFooter";
import { FadeUp } from "@/components/site/FadeUp";

// English translation of SelfCheckArticle.tsx — kept as a separate
// component (not a lang prop on the same one) because the source is a
// hand-written, structured card layout, not markdown; a prop-driven
// translation would mean threading every string through props anyway.
// Keep this in sync by hand whenever SelfCheckArticle.tsx changes.
const sections = [
  {
    n: "01",
    icon: Eye,
    title: "Perceptual Firewall",
    sub: "Attention",
    situation: "The answer comes too fast, before you've even decided what you expected.",
    signs: [
      "skimming after the first sentence",
      "shorter and shorter prompts, less and less of your own thinking",
      "“lost time” with AI without remembering the original question",
    ],
    tip: "Before you send the prompt, write down in one sentence what you expect as an answer — if you can't compare it against the answer afterward, you didn't read it, you just consumed it.",
  },
  {
    n: "02",
    icon: Brain,
    title: "Interpretation Firewall",
    sub: "Biases",
    situation: "You accept a claim because of the confident tone, not because you verified it.",
    signs: [
      "you accept something faster if it confirms what you already thought",
      "you don't ask “how do you know that?”",
      "a different answer to a rephrased question confuses you, but doesn't make you suspicious",
    ],
    tip: "Ask a control question on every important answer — “if I got this from an intern with the same confidence, would I check it?” If yes, check it now too.",
  },
  {
    n: "03",
    icon: Compass,
    title: "Decision Firewall",
    sub: "Conscious choice",
    situation: "AI gives you three options, and you automatically pick the easiest one to accept.",
    signs: [
      "you can't justify the choice beyond the AI's answer",
      "you're less willing to disagree with AI than with a person",
      "the question is no longer “what do I think,” but “what did the AI say”",
    ],
    tip: "Apply the 10/10/10 rule to the suggestion itself — what will I think of it in 10 minutes / 10 hours / 10 days. If there's no added perspective of your own at any of those horizons, it was an approval, not a decision.",
  },
];

export function SelfCheckArticleEn() {
  return (
    <main className="bg-background text-foreground antialiased">
      <EnHeader />

      <article className="pt-36 pb-24 md:pb-32 px-6">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <Link
              to="/en/articles"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-coral transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back to articles
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">
              3 Mental Firewalls — Self-check
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8 text-balance">
              3 signs{" "}
              <span className="accent-mark">AI is thinking for you.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-lg text-ink-soft leading-relaxed mb-16 max-w-2xl">
              Practical warning signs and tips — tied to all three Mental Firewalls —
              that you can notice in yourself while working with AI. Not so you
              stop using it, but so you stay conscious while you do.
            </p>
          </FadeUp>

          <div className="space-y-14">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.n} delay={0.1 + i * 0.1}>
                  <section className="rounded-2xl border border-border/60 bg-card p-7 md:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-11 w-11 rounded-full bg-gradient-sunset flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-cream" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-display text-xl leading-tight">
                          {s.n} — {s.title}
                        </p>
                        <p className="text-coral-deep text-sm">{s.sub}</p>
                      </div>
                    </div>

                    <div className="space-y-5 text-[15px] leading-relaxed">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-coral-deep mb-1.5">
                          Situation
                        </p>
                        <p className="text-ink-soft">{s.situation}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-coral-deep mb-1.5">
                          Warning signs
                        </p>
                        <ul className="space-y-1">
                          {s.signs.map((sign) => (
                            <li key={sign} className="text-ink-soft flex gap-2">
                              <span className="text-coral/60" aria-hidden>
                                ·
                              </span>
                              {sign}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-coral-deep mb-1.5">
                          Practical tip
                        </p>
                        <p className="text-ink font-medium">{s.tip}</p>
                      </div>
                    </div>
                  </section>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.5}>
            <div className="mt-16 pt-10 border-t border-border/60">
              <p className="text-ink-soft leading-relaxed mb-6">
                These three signs also form a self-check on their own: if you
                recognize even one of them in yourself regularly, it's worth
                rebuilding your own thinking back into the process — not against
                AI, but alongside it.
              </p>
              <a
                href={`mailto:info@criticalthinking.hu`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-cream font-medium hover:bg-coral-deep transition-colors"
              >
                Let's talk about it
                <span aria-hidden>→</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </article>

      <EnFooter />
    </main>
  );
}
