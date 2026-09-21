import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { EnHeader } from "@/components/site/EnHeader";
import { EnFooter } from "@/components/site/EnFooter";
import { FadeUp } from "@/components/site/FadeUp";

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      { title: "English version — coming soon — criticalthinking.hu" },
      {
        name: "description",
        content: "The English version of criticalthinking.hu is coming soon. In the meantime, read the translated articles.",
      },
    ],
  }),
  component: EnComingSoon,
});

function EnComingSoon() {
  return (
    <main className="bg-background text-foreground antialiased">
      <EnHeader />

      <section className="pt-36 pb-24 md:pb-32 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">English</p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6 text-balance">
              Coming <span className="accent-mark">soon.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg text-ink-soft leading-relaxed mb-10">
              The full English version of criticalthinking.hu — the 3 Mental Firewalls,
              in English — is still being built. In the meantime, the articles already
              published are translated and ready to read.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <Link
              to="/en/articles"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-sunset text-cream font-medium hover:opacity-90 transition-opacity shadow-elegant"
            >
              See the articles
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </FadeUp>
        </div>
      </section>

      <EnFooter />
    </main>
  );
}
