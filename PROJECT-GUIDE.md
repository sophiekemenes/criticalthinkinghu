# CriticalThinking.hu — Technikai guide

Rövid, gyakorlati összefoglaló arról, hogyan épül fel és hol fut ez az oldal. Célközönség: AI asszisztens (pl. Claude) vagy új fejlesztő, aki átveszi a site menedzselését.

---

## 1. Mi ez az oldal

A criticalthinking.hu magja egy hosszú, egyoldalas landing page (one-pager), modulokra (szekciókra) bontva — a navigáció a szekciókhoz görget. **2026. augusztus óta** emellett van egy önálló **cikk-route is** (`/cikkek/...`, lásd 3. és 8. pont) — ez a jövőbeli publikálási ritmus (heti/kétheti esszé a 3 Mentális Tűzfal egy-egy aspektusáról) alapja. Nincs bejelentkezés, nincs adatbázis.

Nyelv: a teljes felhasználói tartalom **magyar**. A szövegeket nem szabad angolra fordítani.

Pozicionálás (2026. augusztusi döntés): az oldal **nem** "3 egyenrangú célcsoport" hub-ként kommunikál (vállalat / professional / szülő-tanár), hanem egyetlen gondolkodó/szerző pozícióból, a **3 Mentális Tűzfal** keretrendszer köré épülve — ez a ténylegesen kidolgozott, élő szakmai anyag. A vállalati ág és a JOGSI wishlist-státuszú, ezért csak egy kompakt "Amin dolgozom / Hamarosan" szekcióban jelennek meg (`ComingSoon.tsx`), hogy ne versenyezzenek figyelemért a fő üzenettel.

---

## 2. Tech stack

| Terület | Amit használunk |
| --- | --- |
| UI | React 19 + TypeScript |
| Routing / keretrendszer | TanStack Start + TanStack Router (fájl-alapú routing a `src/routes/` alatt) |
| Stílus | Tailwind CSS v4 (config nélkül, tokenek a `src/styles.css`-ben) |
| Komponensek | shadcn/ui + Radix UI (`src/components/ui/`) |
| Animáció | Framer Motion |
| Toast | sonner |
| Build | Vite 7 |

Fontos: a routert **nem** cseréljük (nincs react-router-dom). Tailwind v4-ben nincs `tailwind.config.js` — minden a `src/styles.css`-ben van.

---

## 3. Hol van a tartalom (mit hol kell szerkeszteni)

- `src/routes/index.tsx` — a főoldal: itt van felsorolva, milyen szekciók milyen sorrendben jelennek meg (`SiteHeader → Hero → Intro → MentalFirewalls → Andrea → ComingSoon → FactsCarousel → ContactFooter`). Itt van a route `head()`-je is (title, meta description, og/twitter tagek).
- `src/routes/__root.tsx` — a HTML burok: közös `<head>`, betűtípus-linkek, globális providerek, `<Outlet />`.
- `src/routes/cikkek/` — önálló cikkoldalak (jelenleg: `self-check-ai.tsx` → `/cikkek/self-check-ai`). Új cikk hozzáadásához:
  1. új fájl `src/routes/cikkek/<slug>.tsx`, saját `head()` title/description-nel (lásd `self-check-ai.tsx` mintaként — `SiteHeader`+`ContactFooter` kerettel).
  2. `npm run dev` vagy `npm run build` egyszer lefuttatva, hogy a `routeTree.gen.ts` felvegye az új route-ot.
  3. **`scripts/prerender-ghpages.mjs`-ben a `ROUTES` tömbhöz hozzáadni** `{ path: "/cikkek/<slug>", outFile: "cikkek/<slug>/index.html" }` — enélkül a GitHub Pages build nem generál hozzá valódi (crawlelhető) statikus HTML-t, csak a 404.html SPA fallback szolgálja ki.
- `src/components/site/` — minden főoldal-modul egy külön komponens:

| Fájl | Modul |
| --- | --- |
| `SiteHeader.tsx` | fejléc / navigáció |
| `Hero.tsx` | nyitó szekció — brand promise ("Tiszta gondolkodás. Saját döntés.") |
| `Intro.tsx` | bevezető / híd a 3 Tűzfalhoz |
| `MentalFirewalls.tsx` | A 3 Mentális Tűzfal — a fő IP, self-check tartalommal |
| `Andrea.tsx` | Rólam / Andrea szekció |
| `ComingSoon.tsx` | "Amin dolgozom / Hamarosan" — vállalati ág + JOGSI kompakt teaser |
| `FactsCarousel.tsx` | „Tudtad?" tény-körhinta |
| `ContactFooter.tsx` | lábléc + kapcsolat |
| `FadeUp.tsx` | segéd-animációs wrapper (nem tartalom) |

- `src/assets/brand/` — a hivatalos logó SVG-k (`criticalthinking-logo-full-color.svg`, `-black.svg`, `-white-reverse.svg`). `docs/brand/` — a teljes vizuális arculati összefoglaló (PDF), referenciaként.
- `src/styles.css` — design tokenek: színek (**Ink black `#161615` / Stone gray `#8A897F` / Bone white `#F1EFE8` / Signal coral `#D8542A`** — egyetlen akcentszín, lásd `docs/brand`), betűtípusok (**Familjen Grotesk** cím/alcím + Inter body), radius, dark mode változók. **Szín soha ne legyen beégetve** a komponensekbe (`text-white`, `bg-[#...]`) — mindig a szemantikus tokent kell használni. Kiemelés-minta: `.accent-mark` (szín + aláhúzás egy szón/kifejezésen) — **ne** italic, az arculat kifejezetten ezt kéri.

---

## 4. Hosting — a legfontosabb rész

Jelenleg **két, egymástól független** deploy-út létezik ebben a projektben. Fontos tudni, melyik szolgálja ki a domaint, mert a lehetőségeik különböznek.

> **2026. augusztusi döntés:** a Lovable hosting út le van zárva — nem használjuk,
> nincs rá előfizetés. A **GitHub Pages az egyetlen hivatalos élő verzió**.
> Ha kell működő kapcsolati form, ingyenes külső szolgáltatást (pl. Formspree)
> kötünk be a statikus oldalba — nem váltunk Lovable hostingra.

### A) Lovable hosting

- URL: `https://criticalthinkinghu.lovable.app`
- A Lovable felület jobb felső **Publish** gombja deployol ide.
- SSR / Cloudflare Worker fut a háttérben → **van szerveroldal**: később működhet igazi kapcsolati form, email küldés, adatbázis, API.
- Frontend változás csak a Publish megnyomása után élesedik.
- Custom domain itt is köthető: Project settings → Domains (A rekord: `185.158.133.1`).

### B) GitHub Pages (ez az élő, hivatalos verzió)

- A `CNAME` fájl tartalma: `www.criticalthinking.hu`
- A `.github/workflows/domyindexhtml.yml` workflow **minden `main` branch-re történő push-nál** lefut, és:
  1. futtatja: `npm run build:ghpages`, ami három lépésből áll:
     - `vite build --config vite.config.ghpages.ts` — a `src/spa-entry.tsx` kliens-entryvel megépíti a JS/CSS bundle-t (`dist-ghpages/`)
     - `vite build --config vite.config.ghpages.ssr.ts` — Node-célú SSR build a `src/entry-prerender.tsx`-ből (`dist-ghpages-ssr/`, build-time only)
     - `node scripts/prerender-ghpages.mjs` — a fenti SSR bundle-lel **route-onként valódi, renderelt HTML-t ír** (`renderToString`), és a build-elt `<script>` taget belefűzve minden route-hoz saját `index.html`-t ír (pl. `dist-ghpages/cikkek/self-check-ai/index.html`) — **ez nem pusztán statikus SPA**, a keresőrobotok is valós tartalmat kapnak JS futtatása nélkül.
     - A kliens (`src/spa-entry.tsx`) ezután `hydrateRoot(document, ...)`-tal hidratál erre a markupra (nem egy `#root` divre — a `__root.tsx` shellComponent-je a teljes `<html>` dokumentumot rendereli). Böngészőben a router alapból valódi `createBrowserHistory`-t használ — **ne** írjuk felül `createMemoryHistory`-val, mert az elnémítja az URL-sáv/vissza-gomb szinkront kattintásos navigációnál.
  2. készít `404.html`-t (SPA fallback minden *nem*-prerenderelt deep linkhez), `.nojekyll`-t, és átmásolja a `CNAME`-et
  3. deployol a GitHub Pages-re

### Amit a GitHub Pages NEM tud

Nincs szerver, csak statikus fájlok — build-time prerender van, nem runtime SSR. Tehát: **nincs API, nincs form-küldés, nincs email, nincs adatbázis.** Ezért került ki korábban a működő kapcsolati form a láblécből (a `mailto:` alapú megoldás böngészőnként megbízhatatlan volt).

---

## 5. Parancsok

```bash
npm run dev             # helyi fejlesztés (localhost:8080)
npm run build           # Lovable / SSR build (jelenleg nem használt hosting)
npm run build:ghpages   # GH Pages build: kliens bundle + SSR prerender (dist-ghpages/)
npm run preview:ghpages # a build:ghpages kimenetének kiszolgálása helyben (localhost:4173)
npm run lint
npm run format
```

---

## 6. Két munkafolyamat, egy repó

- **Lovable-ben szerkesztve:** a változás a preview-ban azonnal látszik, és a repóba is bekerül. Élesítés: Publish gomb (Lovable hosting), illetve a `main`-re kerülő commit triggereli a GH Pages workflow-t.
- **GitHubon szerkesztve (kód közvetlenül):** push a `main`-re → GH Pages újraépül. A Lovable oldal ettől nem lesz automatikusan új — ott külön Publish kell.
- Következmény: ha mindkét út aktív, két különböző URL-en két különböző verzió futhat. Érdemes hosszabb távon **egyet választani**.

---

## 7. Amihez ne nyúljunk

- `src/routeTree.gen.ts` — generált fájl, kézzel szerkeszteni tilos.
- `dist-ghpages/` és `dist-ghpages-ssr/` — build kimenetek, `.gitignore`-olva, felülíródnek.
- `vite.config.ts` plugin-listája — a `@lovable.dev/vite-tanstack-config` már tartalmazza a React, Tailwind, TanStack Start és Cloudflare pluginokat; ezek kézi hozzáadása duplikációval elrontja a buildet.
- `src/styles.css`: távoli `@import url(...)` nem használható (a Tailwind v4 buildere fájlrendszerből oldja fel az importokat). Web font mindig `<link>`-kel, a `src/routes/__root.tsx` `links` tömbjében.
- `index.spa.html` `<head>`-je vestigiális — a `scripts/prerender-ghpages.mjs` teljesen eldobja és a `__root.tsx` `head()`-jéből épített SSR-kimenettel helyettesíti minden route-nál. Csak a benne lévő `<script>` tag forrását (build entry point) használja a script.
- `src/spa-entry.tsx`-ben **ne** vezess be `createMemoryHistory`-t vagy más history-felülírást — lásd 4. pont, ez már okozott egy néma (build hiba nélküli, de éles hibát okozó) regressziót.

---

## 8. Következő lépések / döntési pontok

1. **Kapcsolatfelvétel.** Jelenleg nincs form; a láblécben szöveg + `mailto:` van. Ha kell működő form, külső szolgáltatás (pl. Formspree) vagy sima email-link kell — a GH Pages döntés miatt nem Lovable hosting felé megyünk (lásd 4. pont).
2. **SEO / crawlelhetőség.** ✅ Megoldva (2026. augusztus): a GH Pages build route-onként valós, prerenderelt HTML-t ad ki (lásd 4.B pont). Új route hozzáadásakor **ne felejtsd el a `scripts/prerender-ghpages.mjs` `ROUTES` tömbjét bővíteni** (lásd 3. pont) — enélkül az adott route csak a 404.html fallback-en keresztül, üres kezdő HTML-lel érhető el.
3. **Publikálási ritmus.** Az első cikk (`/cikkek/self-check-ai`) megvan — a következő lépés a heti/kétheti esszé-ritmus kialakítása a 3 Mentális Tűzfal egy-egy aspektusáról (ez adja a könyv nyersanyagát is). Minden új cikkhez: új route fájl + `ROUTES` bővítés (lásd 3. pont).
4. **Hosting egységesítése.** A Lovable hosting jelenleg lezárva (lásd 4. pont blockquote). Ha később mégis kellene valódi backend (form-küldés, adatbázis, AI funkció runtime-ban), azt újra kellene gondolni — a GH Pages build-time prerender nem helyettesít egy futó szervert.
5. **Nincs szociális bizonyíték.** Ügyféllogó, esettanulmány, mérőszám, testimonial egyelőre hiányzik az oldalról (audit-megjegyzés, 2026.08).
