// Meta (Facebook) pixel, csak a látogató hozzájárulása után töltődik be
// (CookieConsent sáv). A Kincsestérkép hirdetési fiók pixelje: ugyanerre küldi
// a Make a szerveroldali Purchase eseményt (CAPI) a workshop-fizetések után.
export const META_PIXEL_ID = "643590472476061";
export const CONSENT_KEY = "ct_consent";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function readConsent(): "granted" | "denied" | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // privát mód vagy tiltott tárhely: ilyenkor csak erre a látogatásra érvényes
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
  // Az oldalak effektjei a CookieConsent-é előtt futnak, ezért itt is betöltjük, ha van hozzájárulás.
  if (!window.fbq && readConsent() === "granted") loadMetaPixel();
  if (!window.fbq) return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}
