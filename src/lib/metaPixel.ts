// Meta (Facebook) pixel, csak CookieYes-hozzájárulás után töltődik be
// (Hirdetési / "advertisement" kategória, l. CookieConsent). A Kincsestérkép
// hirdetési fiók pixelje: ugyanerre küldi a Make a szerveroldali Purchase
// eseményt (CAPI) a workshop-fizetések után.
export const META_PIXEL_ID = "643590472476061";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

type CkyConsent = { categories?: Record<string, boolean> };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    getCkyConsent?: () => CkyConsent;
  }
}

// Hozzájárult-e a látogató a hirdetési sütikhez a CookieYes-ben.
export function hasAdConsent(): boolean {
  try {
    return window.getCkyConsent?.().categories?.advertisement === true;
  } catch {
    return false;
  }
}

// A Meta hivatalos base code-jának megfelelője, script-tag injektálással.
export function loadMetaPixel() {
  if (typeof window === "undefined" || window.fbq) return;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

// Esemény küldése, ha a pixel be van töltve (hozzájárulás nélkül nem csinál semmit).
export function trackPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // Az oldalak effektjei a CookieConsent-é előtt futhatnak, ezért itt is betöltjük, ha van hozzájárulás.
  if (!window.fbq && hasAdConsent()) loadMetaPixel();
  if (!window.fbq) return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}
