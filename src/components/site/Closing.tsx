import { Link } from "@tanstack/react-router";
import { FadeUp } from "./FadeUp";

const cardClass =
  "h-full rounded-xl border border-cream/25 bg-cream/5 p-7 flex flex-col transition-colors hover:border-coral";
const labelClass = "text-xs uppercase tracking-[0.2em] text-coral mb-3";
const bodyClass = "text-cream/75 leading-relaxed";
const linkClass = "mt-auto text-sm font-medium text-coral hover:underline";

// Szegmentált CTA: a főoldal alján, közvetlenül a Beszéljünk (ContactFooter) fölött, sötét sávban.
export function Closing() {
  return (
    <section id="kapcsolatfelvetel" className="pt-16 md:pt-20 px-6 bg-ink text-cream">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6">
          <FadeUp>
            <div className={cardClass}>
              <p className={labelClass}>Olvasóknak</p>
              <p className="font-display text-xl leading-snug mb-3">Van még egy gondolatod?</p>
              <p className={`${bodyClass} mb-6`}>
                Olvass tovább, és nézd meg, milyen kérdéseket érdemes újragondolni.
              </p>
              <Link to="/cikkek" className={linkClass}>
                Böngészd a cikkeket <span aria-hidden>→</span>
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className={cardClass}>
              <p className={labelClass}>Rendezvényszervezőknek</p>
              <p className="font-display text-xl leading-snug mb-3">
                Van egy közönséged. Nekem van néhány kényelmetlenül érdekes kérdésem.
              </p>
              <p className={bodyClass}>Beszéljünk előadásról, témáról és közönségről.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className={cardClass}>
              <p className={labelClass}>Szakmai partnereknek</p>
              <p className="font-display text-xl leading-snug mb-3">
                Az emberi tényezőről nem csak beszélgetni lehet. Dolgozni is lehet vele.
              </p>
              <p className={bodyClass}>Közös gondolkodás, workshop vagy szakmai együttműködés.</p>
            </div>
          </FadeUp>
        </div>
      </div>
      <div className="mx-auto max-w-6xl mt-12 md:mt-14 border-b border-cream/15" aria-hidden />
    </section>
  );
}
