import { Link } from "@tanstack/react-router";
import { FadeUp } from "./FadeUp";
import { ClaimCheck } from "./ClaimCheck";
import { getAllArticles } from "@/content/articles";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}. ${["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"][m - 1]} ${d}.`;
}

export function Thoughts() {
  const [featured, ...rest] = getAllArticles();
  const others = rest.slice(0, 4);

  return (
    <section id="gondolatok" className="py-20 md:py-28 px-6 bg-card/50 border-y border-border/50">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.25em] text-coral-deep mb-5">Gondolatok</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-12 max-w-3xl text-balance">
            Az AI-ról, az emberi elméről és arról, hogyan próbálunk továbbra is mi dönteni.
          </h2>
        </FadeUp>

        <FadeUp>
          <Link
            to="/cikkek/$slug"
            params={{ slug: featured.slug }}
            className="group block rounded-xl border border-border/60 bg-card p-8 md:p-10 mb-6 transition-colors hover:border-coral/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">
              Legújabb · {formatDate(featured.date)}
            </p>
            <h3 className="font-display text-2xl md:text-4xl leading-tight mb-4 max-w-3xl group-hover:text-coral-deep transition-colors">
              {featured.title}
            </h3>
            <p className="text-ink-soft text-lg leading-relaxed max-w-3xl mb-6">
              {featured.description}
            </p>
            <span className="text-sm font-medium text-coral-deep">
              Olvasd el <span aria-hidden>→</span>
            </span>
          </Link>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {others.map((a, i) => (
            <FadeUp key={a.slug} delay={0.05 * i}>
              <Link
                to="/cikkek/$slug"
                params={{ slug: a.slug }}
                className="group block h-full rounded-xl border border-border/60 bg-card p-7 transition-colors hover:border-coral/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-3">
                  {formatDate(a.date)}
                </p>
                <h3 className="font-display text-xl leading-snug mb-3 group-hover:text-coral-deep transition-colors">
                  {a.title}
                </h3>
                <p className="text-ink-soft text-[15px] leading-relaxed line-clamp-3">
                  {a.description}
                </p>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <Link
            to="/cikkek"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-coral transition-colors"
          >
            Minden gondolat egy helyen <span aria-hidden>→</span>
          </Link>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-16">
            <ClaimCheck />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
