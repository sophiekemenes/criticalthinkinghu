import { Link } from "@tanstack/react-router";
import { FadeUp } from "./FadeUp";

const mail = (subject: string) =>
  `mailto:info@criticalthinking.hu?subject=${encodeURIComponent(subject)}`;

export function Closing() {
  return (
    <section id="kapcsolatfelvetel" className="py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6">
          <FadeUp>
            <div className="h-full rounded-xl border border-border/60 bg-card p-7 flex flex-col">
              <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">Olvasóknak</p>
              <p className="font-display text-xl leading-snug mb-3">Van még egy gondolatod?</p>
              <p className="text-ink-soft leading-relaxed mb-6">
                Olvass tovább, és nézd meg, milyen kérdéseket érdemes újragondolni.
              </p>
              <Link
                to="/cikkek"
                className="mt-auto text-sm font-medium text-coral-deep hover:underline"
              >
                Böngészd a cikkeket <span aria-hidden>→</span>
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="h-full rounded-xl border border-border/60 bg-card p-7 flex flex-col">
              <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">
                Rendezvényszervezőknek
              </p>
              <p className="font-display text-xl leading-snug mb-3">
                Van egy közönséged. Nekem van néhány kényelmetlenül érdekes kérdésem.
              </p>
              <p className="text-ink-soft leading-relaxed mb-6">
                Beszéljünk előadásról, témáról és közönségről.
              </p>
              <a
                href={mail("Előadást szeretnék")}
                className="mt-auto text-sm font-medium text-coral-deep hover:underline"
              >
                Előadást szeretnék <span aria-hidden>→</span>
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="h-full rounded-xl border border-border/60 bg-card p-7 flex flex-col">
              <p className="text-xs uppercase tracking-[0.2em] text-coral-deep mb-3">
                Szakmai partnereknek
              </p>
              <p className="font-display text-xl leading-snug mb-3">
                Az emberi tényezőről nem csak beszélgetni lehet. Dolgozni is lehet vele.
              </p>
              <p className="text-ink-soft leading-relaxed mb-6">
                Közös gondolkodás, workshop vagy szakmai együttműködés.
              </p>
              <a
                href={mail("Szakmai együttműködés")}
                className="mt-auto text-sm font-medium text-coral-deep hover:underline"
              >
                Kapcsolatfelvétel <span aria-hidden>→</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
