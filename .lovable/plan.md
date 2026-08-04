# Technikai guide a website-hoz (Claude/AI menedzsmenthez)

Cél: egy rövid, pontos dokumentum a repóban, amit egy AI asszisztens (vagy új fejlesztő) elolvasva azonnal érti, hogyan épül fel és hol fut ez az oldal.

## Mi készül

Egy új fájl: `PROJECT-GUIDE.md` a projekt gyökerében, magyarul, a következő szakaszokkal:

1. **Mi ez az oldal** — egyoldalas (one-page) landing page a criticalthinking.hu-hoz, moduláris szekciókkal.
2. **Tech stack** — React 19 + TypeScript, TanStack Start / TanStack Router (fájl-alapú routing), Tailwind CSS v4, Framer Motion animációk, shadcn/ui + Radix komponensek, Vite 7 build.
3. **Hol van a tartalom** — `src/routes/index.tsx` sorolja fel a szekciókat; minden modul külön komponens a `src/components/site/` alatt (Hero, Intro, HumanVsAI, MentalFirewalls, Jogsi, AudienceSelector, FactsCarousel, Andrea, ContactFooter, SiteHeader, FadeUp). Szövegmódosítás = az adott komponens szerkesztése. Design tokenek (színek, betűk) a `src/styles.css`-ben. SEO/meta a route `head()`-jében.
4. **Hosting — a legfontosabb szakasz.** Két, egymástól független út létezik ma a projektben:
   - **Lovable hosting** (a Publish gombbal): `https://criticalthinkinghu.lovable.app`. Itt SSR/Cloudflare Worker fut, tehát később szerveroldali funkciók (kapcsolati form, adatbázis, email) is működhetnek. Frontend változás csak Publish után élesedik.
   - **GitHub Pages** (jelenleg beállítva): a `CNAME` fájl szerint `www.criticalthinking.hu`. A `.github/workflows/domyindexhtml.yml` minden `main`-re push-nál lefuttatja a `npm run build:ghpages` scriptet, ami a `vite.config.ghpages.ts` + `index.spa.html` + `src/spa-entry.tsx` hármassal egy tisztán kliensoldali SPA-t épít a `dist-ghpages/` mappába, majd `index.html` + `404.html` (SPA fallback) + `.nojekyll` + `CNAME` kimenettel deploy-ol.
   - **Melyik az élő?** A dokumentum leírja, hogyan lehet ezt egyértelműen eldönteni: DNS-ellenőrzés a `criticalthinking.hu` / `www.criticalthinking.hu` domainre, a GitHub repó Settings → Pages állapota, és a Lovable Project settings → Domains. Ha a DNS a GitHub Pages IP-jeire mutat, a GH Pages az élő; ha a `185.158.133.1`-re, akkor a Lovable.
   - **Korlátok, amikre figyelni kell:** GitHub Pages-en nincs szerver, tehát nincs API, nincs form-küldés, nincs adatbázis és nincs SSR — csak statikus fájlok. Ezért került ki korábban a kapcsolati form.
5. **Parancsok** — `npm run dev` (helyi fejlesztés, :8080), `npm run build` (Lovable/SSR build), `npm run build:ghpages` (statikus GH Pages build), `npm run lint`, `npm run format`.
6. **Két munkafolyamat, egy repó** — hogyan viszonyul egymáshoz a Lovable-ben történő szerkesztés és a GitHub push; hogy a GH Pages deploy a `main` branch push-ára indul.
7. **Amit ne módosítson senki** — `src/routeTree.gen.ts` (generált), `dist-ghpages/` (build kimenet), `vite.config.ts` plugin-listája.
8. **Következő lépések / döntési pontok** — ha kell működő kapcsolati form vagy backend, a Lovable hosting az út; ha marad a statikus GH Pages, akkor külső form-szolgáltatás vagy sima email-link kell.

## Technikai megjegyzések

- A guide csak dokumentáció: semmilyen kód, build vagy hosting beállítás nem változik.
- A hosting-szakasz a repóban valóban meglévő fájlokra hivatkozik (`CNAME`, `.github/workflows/domyindexhtml.yml`, `vite.config.ghpages.ts`, `index.spa.html`, `src/spa-entry.tsx`), nem feltételezésekre.
- A "melyik hosting az élő" kérdést a guide ellenőrző lépésekkel oldja meg, nem állítás formájában — a DNS állapotát innen nem tudom kiolvasni.
