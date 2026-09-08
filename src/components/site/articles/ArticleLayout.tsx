import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ContactFooter } from "@/components/site/ContactFooter";
import { FadeUp } from "@/components/site/FadeUp";

interface ArticleLayoutProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dateLabel: string;
  children: ReactNode;
}

// Shared chrome for "sima" (markdown-driven) cikkek — a self-check-ai kártyás
// layoutja szándékosan nem ezt használja, saját komponensben él (lásd
// SelfCheckArticle.tsx), mert nem prózai, hanem strukturált tartalom.
export function ArticleLayout({ eyebrow, title, subtitle, dateLabel, children }: ArticleLayoutProps) {
  return (
    <main className="bg-background text-foreground antialiased">
      <SiteHeader />

      <article className="pt-36 pb-24 md:pb-32 px-6">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <Link
              to="/cikkek"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-coral transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Vissza a cikkekhez
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">
              {eyebrow ?? "Cikk"} · {dateLabel}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-4 text-balance">
              {title}
            </h1>
          </FadeUp>
          {subtitle && (
            <FadeUp delay={0.15}>
              <p className="text-lg text-ink-soft leading-relaxed mb-12 max-w-2xl">{subtitle}</p>
            </FadeUp>
          )}

          <FadeUp delay={0.2}>
            <div
              className="article-prose max-w-none text-[17px] leading-[1.75] text-ink-soft space-y-6
                [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:pt-4 [&_h2]:leading-tight
                [&_h3]:font-display [&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:font-normal [&_h3]:leading-snug [&_h3]:text-coral-deep [&_h3]:border-l-4 [&_h3]:border-coral/30 [&_h3]:pl-6 [&_h3]:my-10
                [&_h4]:font-display [&_h4]:text-xl [&_h4]:text-foreground [&_h4]:border-l-4 [&_h4]:border-coral/30 [&_h4]:pl-6 [&_h4]:my-8
                [&_strong]:text-foreground [&_strong]:font-semibold
                [&_hr]:border-border/60 [&_hr]:my-10
                [&_a]:text-coral-deep [&_a]:underline [&_a]:underline-offset-4
                [&_em]:text-ink-soft/90
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
                [&_li]:leading-relaxed
                [&_figure]:my-10 [&_figure]:space-y-3
                [&_figcaption]:text-sm [&_figcaption]:text-center [&_figcaption]:text-ink-soft/70 [&_figcaption]:italic
                [&_img]:rounded-2xl [&_img]:w-full [&_img]:border [&_img]:border-border/60"
            >
              {children}
            </div>
          </FadeUp>
        </div>
      </article>

      <ContactFooter />
    </main>
  );
}
