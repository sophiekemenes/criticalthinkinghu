import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { loadMetaPixel, readConsent, trackPixel, writeConsent } from "@/lib/metaPixel";

// Saját, egyszerű süti-hozzájárulás a Meta pixelhez (a CookieYes ingyenes
// csomagja csak egy webhelyet enged, az a kincsesterkep.hu). Szerveren és az
// első kliens-renderben semmit nem rajzol (open = false), így nem okoz
// hidratációs eltérést: a döntést csak mount után olvassuk ki.
export function CookieConsent() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const firstNav = useRef(true);

  useEffect(() => {
    const consent = readConsent();
    if (consent === "granted") loadMetaPixel();
    else if (consent === null) setOpen(true);

    // Kliensoldali navigációnál új PageView (az első betöltésnél a loadMetaPixel küldi).
    return router.subscribe("onResolved", () => {
      if (firstNav.current) {
        firstNav.current = false;
        return;
      }
      trackPixel("PageView");
    });
  }, [router]);

  if (!open) return null;

  function decide(value: "granted" | "denied") {
    writeConsent(value);
    if (value === "granted") loadMetaPixel();
    setOpen(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div
        role="dialog"
        aria-label="Süti-hozzájárulás"
        className="mx-auto max-w-3xl rounded-xl border border-border bg-card text-foreground shadow-lg px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <p className="text-sm leading-relaxed text-ink-soft flex-1">
          Sütit csak a hozzájárulásoddal használunk: a Meta (Facebook) mérőkódja segít látni, hogy a hirdetéseink
          eljutnak-e a megfelelő emberekhez. Az oldal enélkül is teljesen működik.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="px-4 py-2 rounded-full text-sm border border-border hover:border-ink transition-colors"
          >
            Nem kérem
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="px-4 py-2 rounded-full text-sm font-medium bg-ink text-cream hover:bg-coral-deep transition-colors"
          >
            Rendben
          </button>
        </div>
      </div>
    </div>
  );
}
