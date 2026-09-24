import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import { hasAdConsent, loadMetaPixel, trackPixel } from "@/lib/metaPixel";

// CookieYes süti-banner + a Meta pixel hozzájárulás-függő betöltése.
// A criticalthinking.hu webhely azonosítója a CookieYes fiókból
// (Beállítások → Telepítési kód). Üresen hagyva nem töltődik be semmi.
const COOKIEYES_SITE_ID = "";

// Mount után injektáljuk (nem a <head>-be SSR-ből), így nem befolyásolja a
// hidratációt. A pixel csak a "Hirdetési" (advertisement) kategória
// elfogadása után indul.
export function CookieConsent() {
  const router = useRouter();
  const firstNav = useRef(true);

  useEffect(() => {
    if (!COOKIEYES_SITE_ID) return;

    const onBannerLoad = () => {
      if (hasAdConsent()) loadMetaPixel();
    };
    const onConsentUpdate = (e: Event) => {
      const accepted = (e as CustomEvent<{ accepted?: string[] }>).detail?.accepted ?? [];
      if (accepted.includes("advertisement")) loadMetaPixel();
    };
    document.addEventListener("cookieyes_banner_load", onBannerLoad);
    document.addEventListener("cookieyes_consent_update", onConsentUpdate);

    if (!document.getElementById("cookieyes")) {
      const s = document.createElement("script");
      s.id = "cookieyes";
      s.src = `https://cdn-cookieyes.com/client_data/${COOKIEYES_SITE_ID}/script.js`;
      document.head.appendChild(s);
    }

    // Kliensoldali navigációnál új PageView (az első betöltésnél a loadMetaPixel küldi).
    const unsubscribe = router.subscribe("onResolved", () => {
      if (firstNav.current) {
        firstNav.current = false;
        return;
      }
      trackPixel("PageView");
    });

    return () => {
      document.removeEventListener("cookieyes_banner_load", onBannerLoad);
      document.removeEventListener("cookieyes_consent_update", onConsentUpdate);
      unsubscribe();
    };
  }, [router]);

  return null;
}
